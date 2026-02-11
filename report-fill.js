// RCRD - Report Form Auto-Fill
// Runs on https://help.x.com/en/forms/safety-and-sensitive-content/ads
// Reads pending report data from chrome.storage and fills in the form fields

(function() {
  // Check for pending ad report data
  chrome.storage.local.get(['pendingAdReport'], function(result) {
    const report = result.pendingAdReport;
    if (!report || (!report.username && !report.postUrl)) return;

    // Clear the stored data so it doesn't re-fill on refresh
    chrome.storage.local.remove('pendingAdReport');

    // Wait for the form to fully load, then fill it
    fillFormWhenReady(report, 0);
  });

  function fillFormWhenReady(report, attempt) {
    if (attempt > 20) return; // Give up after ~10 seconds

    // Look for form fields by their label text
    const filled = tryFillForm(report);

    if (!filled) {
      // Retry after a short delay (form may still be loading)
      setTimeout(function() {
        fillFormWhenReady(report, attempt + 1);
      }, 500);
    }
  }

  function tryFillForm(report) {
    let filledAny = false;

    // Strategy 1: Find inputs/textareas near labels containing the target text
    const labels = document.querySelectorAll('label');
    labels.forEach(function(label) {
      const labelText = label.textContent.toLowerCase().trim();

      // "Username of the account you are reporting"
      if (labelText.includes('username') && labelText.includes('reporting')) {
        const input = findInputForLabel(label);
        if (input && report.username) {
          setFieldValue(input, '@' + report.username);
          filledAny = true;
        }
      }

      // "Please share the content that might be violating our rules"
      if (labelText.includes('share') && labelText.includes('content') && labelText.includes('violating')) {
        const input = findInputForLabel(label);
        if (input && report.postUrl) {
          setFieldValue(input, report.postUrl);
          filledAny = true;
        }
      }
    });

    // Strategy 2: Find by placeholder text if labels didn't work
    if (!filledAny) {
      const allInputs = document.querySelectorAll('input[type="text"], textarea');
      allInputs.forEach(function(input) {
        const placeholder = (input.placeholder || '').toLowerCase();
        const name = (input.name || '').toLowerCase();
        const id = (input.id || '').toLowerCase();

        if ((placeholder.includes('username') || name.includes('username') || id.includes('username')) && report.username) {
          setFieldValue(input, '@' + report.username);
          filledAny = true;
        }

        if ((placeholder.includes('content') || placeholder.includes('url') || name.includes('content') || name.includes('url')) && report.postUrl) {
          setFieldValue(input, report.postUrl);
          filledAny = true;
        }
      });
    }

    return filledAny;
  }

  function findInputForLabel(label) {
    // If label has a 'for' attribute, find the input by id
    if (label.htmlFor) {
      return document.getElementById(label.htmlFor);
    }

    // Check if there's an input/textarea inside the label
    const innerInput = label.querySelector('input, textarea');
    if (innerInput) return innerInput;

    // Check the next sibling elements
    let sibling = label.nextElementSibling;
    while (sibling) {
      if (sibling.tagName === 'INPUT' || sibling.tagName === 'TEXTAREA') {
        return sibling;
      }
      const nestedInput = sibling.querySelector('input, textarea');
      if (nestedInput) return nestedInput;
      sibling = sibling.nextElementSibling;
    }

    // Check parent's children after the label
    const parent = label.parentElement;
    if (parent) {
      const input = parent.querySelector('input, textarea');
      if (input) return input;
    }

    return null;
  }

  function setFieldValue(field, value) {
    // Set the value using native input setter to trigger React/framework state updates
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    );
    const nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype, 'value'
    );

    if (field.tagName === 'TEXTAREA' && nativeTextareaValueSetter) {
      nativeTextareaValueSetter.set.call(field, value);
    } else if (nativeInputValueSetter) {
      nativeInputValueSetter.set.call(field, value);
    } else {
      field.value = value;
    }

    // Dispatch events to notify frameworks
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }
})();
