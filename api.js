// X Internal API Helper
// Uses your existing session to fetch relationship data

class XApiClient {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.pendingRequests = new Map();
  }

  // Get CSRF token from cookies
  getCsrfToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'ct0') {
        return value;
      }
    }
    return null;
  }

  // Get authorization bearer token from local storage or page
  async getBearerToken() {
    // X stores the bearer token in the page's JavaScript
    // We'll use the standard public bearer token that X uses
    return 'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs=1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
  }

  // Make authenticated request to X API
  async makeRequest(url, options = {}) {
    const csrfToken = this.getCsrfToken();
    const bearerToken = await this.getBearerToken();

    if (!csrfToken) {
      throw new Error('Not logged in to X');
    }

    const headers = {
      'authorization': `Bearer ${bearerToken}`,
      'x-csrf-token': csrfToken,
      'x-twitter-active-user': 'yes',
      'x-twitter-auth-type': 'OAuth2Session',
      'content-type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  // Get user ID from screen name
  async getUserId(screenName) {
    const cacheKey = `userId:${screenName}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const variables = {
      screen_name: screenName,
      withSafetyModeUserFields: true
    };

    const features = {
      hidden_profile_subscriptions_enabled: true,
      hidden_profile_likes_enabled: true,
      highlights_tweets_tab_ui_enabled: true,
      creator_subscriptions_tweet_preview_api_enabled: true,
      responsive_web_graphql_exclude_directive_enabled: true,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      responsive_web_graphql_timeline_navigation_enabled: true,
      subscriptions_verification_info_verified_since_enabled: true,
      verified_phone_label_enabled: false
    };

    const url = `https://x.com/i/api/graphql/xc8f1g7BYqr6VTzTbvNlGw/UserByScreenName?variables=${encodeURIComponent(JSON.stringify(variables))}&features=${encodeURIComponent(JSON.stringify(features))}`;

    try {
      const data = await this.makeRequest(url);
      const userId = data?.data?.user?.result?.rest_id;
      if (userId) {
        this.setCache(cacheKey, userId);
      }
      return userId;
    } catch (e) {
      console.error('Failed to get user ID:', e);
      return null;
    }
  }

  // Get relationship between logged-in user and target user
  async getRelationship(screenName) {
    const cacheKey = `relationship:${screenName}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    // Prevent duplicate requests for same user
    if (this.pendingRequests.has(screenName)) {
      return this.pendingRequests.get(screenName);
    }

    const promise = this._fetchRelationship(screenName);
    this.pendingRequests.set(screenName, promise);

    try {
      const result = await promise;
      this.pendingRequests.delete(screenName);
      return result;
    } catch (e) {
      this.pendingRequests.delete(screenName);
      throw e;
    }
  }

  async _fetchRelationship(screenName) {
    const cacheKey = `relationship:${screenName}`;

    const variables = {
      screen_name: screenName,
      withSafetyModeUserFields: true
    };

    const features = {
      hidden_profile_subscriptions_enabled: true,
      hidden_profile_likes_enabled: true,
      highlights_tweets_tab_ui_enabled: true,
      creator_subscriptions_tweet_preview_api_enabled: true,
      responsive_web_graphql_exclude_directive_enabled: true,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      responsive_web_graphql_timeline_navigation_enabled: true,
      subscriptions_verification_info_verified_since_enabled: true,
      verified_phone_label_enabled: false
    };

    const url = `https://x.com/i/api/graphql/xc8f1g7BYqr6VTzTbvNlGw/UserByScreenName?variables=${encodeURIComponent(JSON.stringify(variables))}&features=${encodeURIComponent(JSON.stringify(features))}`;

    try {
      const data = await this.makeRequest(url);
      const user = data?.data?.user?.result;

      if (!user) {
        return null;
      }

      const legacy = user.legacy || {};
      const relationship = {
        screenName: screenName,
        userId: user.rest_id,
        name: legacy.name,
        followersCount: legacy.followers_count,
        followingCount: legacy.friends_count,
        isVerified: user.is_blue_verified || legacy.verified,
        // Key relationship info
        theyFollowYou: legacy.followed_by || false,
        youFollowThem: legacy.following || false,
        // Derived
        isMutual: (legacy.followed_by && legacy.following) || false
      };

      this.setCache(cacheKey, relationship);
      return relationship;
    } catch (e) {
      console.error('Failed to get relationship:', e);
      return null;
    }
  }

  // Batch get relationships for multiple users
  async getRelationshipsBatch(screenNames) {
    const results = new Map();
    const uncached = [];

    // Check cache first
    for (const name of screenNames) {
      const cached = this.getFromCache(`relationship:${name}`);
      if (cached) {
        results.set(name, cached);
      } else {
        uncached.push(name);
      }
    }

    // Fetch uncached in parallel (with rate limiting)
    const batchSize = 5;
    for (let i = 0; i < uncached.length; i += batchSize) {
      const batch = uncached.slice(i, i + batchSize);
      const promises = batch.map(name => this.getRelationship(name).catch(() => null));
      const batchResults = await Promise.all(promises);

      batch.forEach((name, idx) => {
        if (batchResults[idx]) {
          results.set(name, batchResults[idx]);
        }
      });

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < uncached.length) {
        await new Promise(r => setTimeout(r, 100));
      }
    }

    return results;
  }

  // Cache helpers
  getFromCache(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  setCache(key, value) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.cacheExpiry
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

// Export singleton instance
window.xApiClient = new XApiClient();
