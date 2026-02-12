// X Vanity Metrics Hider - Content Script

// ===== INLINE SVG ICONS (authentic Hugeicons stroke-rounded paths) =====
const SVG_ICONS = {
  pencilEdit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  advertisiment: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M5.506 16.992L8.031 10.029C8.491 9.062 9.193 8.263 9.998 10.18C10.741 11.95 11.849 15.19 12.503 16.995M6.653 14.002H11.322" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3.464 5.318C2 6.636 2 8.757 2 13C2 17.243 2 19.364 3.464 20.682C4.929 22 7.286 22 12 22C16.714 22 19.071 22 20.536 20.682C22 19.364 22 17.243 22 13C22 8.757 22 6.636 20.536 5.318C19.071 4 16.714 4 12 4C7.286 4 4.929 4 3.464 5.318Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M18.484 9.987V12.982M18.484 12.982V16.925M18.484 12.982H16.466C16.226 12.982 15.989 13.026 15.765 13.113C14.071 13.77 14.071 16.212 15.765 16.87C15.989 16.957 16.226 17.001 16.466 17.001H18.484" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  recycle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M9 3.723C4.992 4.632 2 8.217 2 12.5C2 13.011 2.043 13.512 2.124 14M9 3.723L6 2.5M9 3.723L8 6.5M19.065 16.5C19.663 15.295 20 13.937 20 12.5C20 8.041 16.757 4.339 12.5 3.624M19.065 16.5L22 14.5M19.065 16.5L17.5 13.5M3.516 17.5C5.13 19.912 7.88 21.5 11 21.5C13.305 21.5 15.408 20.633 17 19.208M3.516 17.5H7M3.516 17.5V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  bot: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4 15.5C2.895 15.5 2 14.605 2 13.5C2 12.395 2.895 11.5 4 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M20 15.5C21.105 15.5 22 14.605 22 13.5C22 12.395 21.105 11.5 20 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7 7V4M17 7V4" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><circle cx="7" cy="3" r="1" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><circle cx="17" cy="3" r="1" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M13.5 7H10.5C7.672 7 6.257 7 5.379 7.909C4.5 8.818 4.5 10.281 4.5 13.207C4.5 16.133 4.5 17.596 5.379 18.505C6.257 19.414 7.672 19.414 10.5 19.414H11.525C12.317 19.414 12.596 19.577 13.142 20.171C13.745 20.828 14.679 21.705 15.524 21.909C16.725 22.199 16.86 21.798 16.592 20.653C16.516 20.327 16.325 19.806 16.526 19.502C16.639 19.332 16.826 19.29 17.201 19.206C17.792 19.074 18.28 18.858 18.621 18.505C19.5 17.596 19.5 16.133 19.5 13.207C19.5 10.281 19.5 8.818 18.621 7.909C17.743 7 16.328 7 13.5 7Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.5 15C10.07 15.607 10.978 16 12 16C13.022 16 13.93 15.607 14.5 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.009 11H9M15.009 11H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>',
  dashboard: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M10.5 8.75V6.75C10.5 5.106 10.5 4.284 10.046 3.731C9.963 3.63 9.87 3.537 9.769 3.454C9.216 3 8.394 3 6.75 3C5.106 3 4.284 3 3.731 3.454C3.63 3.537 3.537 3.63 3.454 3.731C3 4.284 3 5.106 3 6.75V8.75C3 10.394 3 11.216 3.454 11.769C3.537 11.87 3.63 11.963 3.731 12.046C4.284 12.5 5.106 12.5 6.75 12.5C8.394 12.5 9.216 12.5 9.769 12.046C9.87 11.963 9.963 11.87 10.046 11.769C10.5 11.216 10.5 10.394 10.5 8.75Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 15.5H5.75C5.052 15.5 4.703 15.5 4.419 15.586C3.78 15.78 3.28 16.28 3.086 16.919C3 17.203 3 17.552 3 18.25C3 18.948 3 19.297 3.086 19.581C3.28 20.22 3.78 20.72 4.419 20.914C4.703 21 5.052 21 5.75 21H7.75C8.448 21 8.797 21 9.081 20.914C9.72 20.72 10.22 20.22 10.414 19.581C10.5 19.297 10.5 18.948 10.5 18.25C10.5 17.552 10.5 17.203 10.414 16.919C10.22 16.28 9.72 15.78 9.081 15.586C8.797 15.5 8.448 15.5 7.75 15.5Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M21 17.25V15.25C21 13.606 21 12.784 20.546 12.231C20.463 12.13 20.37 12.037 20.269 11.954C19.716 11.5 18.894 11.5 17.25 11.5C15.606 11.5 14.784 11.5 14.231 11.954C14.13 12.037 14.037 12.13 13.954 12.231C13.5 12.784 13.5 13.606 13.5 15.25V17.25C13.5 18.894 13.5 19.716 13.954 20.269C14.037 20.37 14.13 20.463 14.231 20.546C14.784 21 15.606 21 17.25 21C18.894 21 19.716 21 20.269 20.546C20.37 20.463 20.463 20.37 20.546 20.269C21 19.716 21 18.894 21 17.25Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M18.25 3H16.25C15.552 3 15.203 3 14.919 3.086C14.28 3.28 13.78 3.78 13.586 4.419C13.5 4.703 13.5 5.052 13.5 5.75C13.5 6.448 13.5 6.797 13.586 7.081C13.78 7.72 14.28 8.22 14.919 8.414C15.203 8.5 15.552 8.5 16.25 8.5H18.25C18.948 8.5 19.297 8.5 19.581 8.414C20.22 8.22 20.72 7.72 20.914 7.081C21 6.797 21 6.448 21 5.75C21 5.052 21 4.703 20.914 4.419C20.72 3.78 20.22 3.28 19.581 3.086C19.297 3 18.948 3 18.25 3Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  evil: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M8 3.936L2 2L3.686 7.225C3.803 7.588 3.861 7.77 3.856 7.942C3.851 8.115 3.77 8.325 3.607 8.745C3.215 9.754 3 10.852 3 12C3 16.971 7.029 21 12 21C16.971 21 21 16.971 21 12C21 10.852 20.785 9.754 20.393 8.745C20.23 8.325 20.149 8.115 20.144 7.942C20.139 7.77 20.197 7.588 20.315 7.225L22 2L16 3.936M8 3.936C9.205 3.337 10.563 3 12 3C13.437 3 14.795 3.337 16 3.936M8 3.936C7.408 4.23 6.852 4.588 6.343 5M16 3.936C16.592 4.23 17.148 4.588 17.657 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9 16C9.836 16.628 10.874 17 12 17C13.126 17 14.164 16.628 15 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.009 11H9M15.009 11H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>',
  prisoner: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M18 7C16.329 6.372 14.251 6 12 6C9.749 6 7.671 6.372 6 7" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M7 7V8.725C7 10.518 7.921 12.18 9.428 13.103L9.942 13.418C11.209 14.194 12.791 14.194 14.058 13.418L14.573 13.103C16.079 12.18 17 10.518 17 8.725V7" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M7 8V5.956C7 4.611 7.921 3.365 9.428 2.673L9.942 2.437C11.209 1.855 12.791 1.855 14.058 2.437L14.573 2.673C16.079 3.365 17 4.611 17 5.956V8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M15 13L16 16M16 16L14.631 17.195C13.377 18.291 12.75 18.838 12 18.838C11.25 18.838 10.623 18.291 9.369 17.195L8 16M16 16L17.734 16.578C18.732 16.911 19.231 17.077 19.674 17.334C20.108 17.586 20.501 17.901 20.841 18.27C21.188 18.647 22 20 22 22M9 13L8 16M8 16L6.266 16.578C5.268 16.911 4.769 17.077 4.326 17.334C3.892 17.586 3.499 17.901 3.159 18.27C2.812 18.647 2 20 2 22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  tractor: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><circle cx="6.5" cy="16.5" r="4.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><circle cx="19" cy="18" r="3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M2 10.5C3.253 9.558 4.812 9 6.5 9C10.642 9 14 12.358 14 16.5C14 16.596 13.998 16.692 13.995 16.787C13.972 17.391 13.961 17.694 14.108 17.847C14.256 18 14.528 18 15.073 18H16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M13 9L16.106 9.582C18.447 10.021 19.617 10.241 20.309 11.074C21 11.907 21 13.105 21 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M20 12H19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M13 12.5V9.587C13 9.198 12.943 8.811 12.831 8.438L11.5 3M4 9V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 3H13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M18 9.5V8C18 6.895 18.895 6 20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7 9V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  camera: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M12.697 3.5H11.303C10.588 3.5 10.231 3.5 9.911 3.612C9.715 3.68 9.531 3.779 9.366 3.904C9.095 4.108 8.897 4.405 8.5 5C8.297 5.305 7.998 5.753 7.879 5.879C7.583 6.189 7.196 6.397 6.773 6.47C6.603 6.5 6.42 6.5 6.054 6.5C5.074 6.5 4.584 6.5 4.183 6.613C3.181 6.897 2.397 7.681 2.114 8.683C2 9.084 2 9.574 2 10.554V14.5C2 17.328 2 18.743 2.879 19.621C3.758 20.5 5.172 20.5 8 20.5H16C18.828 20.5 20.243 20.5 21.121 19.621C22 18.743 22 17.328 22 14.5V10.554C22 9.574 22 9.084 21.887 8.683C21.603 7.681 20.82 6.897 19.817 6.613C19.417 6.5 18.927 6.5 17.946 6.5C17.581 6.5 17.398 6.5 17.227 6.47C16.805 6.397 16.417 6.189 16.122 5.879C16.002 5.753 15.703 5.305 15.5 5C15.104 4.405 14.906 4.108 14.635 3.904C14.469 3.779 14.285 3.68 14.09 3.612C13.769 3.5 13.412 3.5 12.697 3.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M16 13C16 15.209 14.209 17 12 17C9.791 17 8 15.209 8 13C8 10.791 9.791 9 12 9C14.209 9 16 10.791 16 13Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  receipt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4 18.646V8.054C4 5.2 4 3.773 4.879 2.887C5.757 2 7.172 2 10 2H14C16.828 2 18.243 2 19.121 2.887C20 3.773 20 5.2 20 8.054V18.646C20 20.158 20 20.913 19.538 21.211C18.783 21.697 17.616 20.677 17.029 20.307C16.544 20.001 16.302 19.849 16.033 19.84C15.742 19.83 15.495 19.977 14.971 20.307L13.06 21.512C12.545 21.837 12.287 22 12 22C11.713 22 11.455 21.837 10.94 21.512L9.029 20.307C8.544 20.001 8.302 19.849 8.033 19.84C7.742 19.83 7.495 19.977 6.971 20.307C6.384 20.677 5.217 21.697 4.462 21.211C4 20.913 4 20.158 4 18.646Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M11 11H8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14 7L8 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  copy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M9 15C9 12.172 9 10.757 9.879 9.879C10.757 9 12.172 9 15 9H16C18.828 9 20.243 9 21.121 9.879C22 10.757 22 12.172 22 15V16C22 18.828 22 20.243 21.121 21.121C20.243 22 18.828 22 16 22H15C12.172 22 10.757 22 9.879 21.121C9 20.243 9 18.828 9 16V15Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M16.5 9C16.498 6.613 16.44 5.351 15.794 4.391C15.584 4.086 15.338 3.806 15.061 3.559C14.088 2.687 12.653 2.5 10 2.5C7.106 2.5 5.659 2.5 4.68 3.282C4.43 3.476 4.207 3.699 4.013 3.949C3.231 4.928 3.231 6.375 3.231 9.269V14C3.231 16.647 3.418 18.082 4.29 19.054C4.537 19.332 4.817 19.578 5.122 19.788C6.082 20.434 7.344 20.492 9.731 20.494" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  delete02: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M19.5 5.5L18.613 15.412C18.381 17.929 18.265 19.187 17.535 19.971C17.369 20.148 17.183 20.306 16.982 20.441C16.124 21 14.862 21 12.338 21H11.662C9.138 21 7.876 21 7.018 20.441C6.817 20.306 6.631 20.148 6.465 19.971C5.735 19.187 5.619 17.929 5.387 15.412L4.5 5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 5.5H21M16.057 5.5L15.373 4.09C14.915 3.132 14.686 2.653 14.27 2.361C14.177 2.296 14.079 2.239 13.976 2.192C13.515 2 12.989 2 11.936 2C10.856 2 10.316 2 9.844 2.2C9.74 2.249 9.64 2.308 9.546 2.376C9.121 2.681 8.893 3.178 8.436 4.172L7.822 5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.5 16.5V10.5M14.5 16.5V10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  canvas: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4 8C4 5.17157 4 3.75736 5.00421 2.87868C6.00841 2 7.62465 2 10.8571 2H13.1429C16.3753 2 17.9916 2 18.9958 2.87868C20 3.75736 20 5.17157 20 8V17H4V8Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 17H21" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M10.6987 5.56588C11.9289 5.38957 13.9674 5.4601 12.2803 7.15266C10.1715 9.26836 7.00837 14.0289 10.6987 12.4421C14.3891 10.8554 15.9709 11.9132 14.3893 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 17V21" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M5 22L8 17" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M19 22L16 17" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>',
  informationDiamond: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M21.5 12.6863V11.3137C21.5 9.67871 21.5 8.8612 21.1955 8.12612C20.891 7.39104 20.313 6.81297 19.1569 5.65685L18.3431 4.84315C17.187 3.68702 16.609 3.10896 15.8739 2.80448C15.1388 2.5 14.3213 2.5 12.6863 2.5H11.3137C9.67871 2.5 8.8612 2.5 8.12612 2.80448C7.39104 3.10896 6.81297 3.68702 5.65685 4.84315L4.84315 5.65685C3.68702 6.81298 3.10896 7.39104 2.80448 8.12612C2.5 8.8612 2.5 9.67871 2.5 11.3137V12.6863C2.5 14.3213 2.5 15.1388 2.80448 15.8739C3.10896 16.609 3.68702 17.187 4.84315 18.3431L5.65685 19.1569C6.81297 20.313 7.39104 20.891 8.12612 21.1955C8.8612 21.5 9.67871 21.5 11.3137 21.5H12.6863C14.3213 21.5 15.1388 21.5 15.8739 21.1955C16.609 20.891 17.187 20.313 18.3431 19.1569L19.1569 18.3431C20.313 17.187 20.891 16.609 21.1955 15.8739C21.5 15.1388 21.5 14.3213 21.5 12.6863Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 16L12 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 8.01172V8.00172" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
  fire: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  brain02: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4.22222 21.9948V18.4451C4.22222 17.1737 3.88927 16.5128 3.23482 15.4078C2.4503 14.0833 2 12.5375 2 10.8866C2 5.97866 5.97969 2 10.8889 2C15.7981 2 19.7778 5.97866 19.7778 10.8866C19.7778 11.4663 19.7778 11.7562 19.802 11.9187C19.8598 12.3072 20.0411 12.6414 20.2194 12.9873L22 16.4407L20.6006 17.1402C20.195 17.3429 19.9923 17.4443 19.851 17.6314C19.7097 17.8184 19.67 18.0296 19.5904 18.4519L19.5826 18.4931C19.4004 19.4606 19.1993 20.5286 18.6329 21.2024C18.4329 21.4403 18.1853 21.6336 17.9059 21.7699C17.4447 21.9948 16.8777 21.9948 15.7437 21.9948C15.219 21.9948 14.6928 22.0069 14.1682 21.9942C12.9247 21.9639 12 20.9184 12 19.7044" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.388 10.5315C13.9617 10.5315 13.5729 10.3702 13.2784 10.1048M14.388 10.5315C14.388 11.6774 13.7241 12.7658 12.4461 12.7658C11.1681 12.7658 10.5043 13.8541 10.5043 15M14.388 10.5315C16.5373 10.5315 16.5373 7.18017 14.388 7.18017C14.1927 7.18017 14.0053 7.21403 13.8312 7.27624C13.9362 4.77819 10.3349 4.1 9.51923 6.44018M10.5043 8.29729C10.5043 7.52323 10.1133 6.8411 9.51923 6.44018M9.51923 6.44018C7.66742 5.19034 5.19883 7.4331 6.37324 9.43277C4.40226 9.72827 4.61299 12.7658 6.6205 12.7658C7.18344 12.7658 7.68111 12.4844 7.98234 12.0538" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  chefHat: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M18 13C20.2091 13 22 11.2091 22 9C22 6.79086 20.2091 5 18 5C17.1767 5 16.4115 5.24874 15.7754 5.67518M6 13C3.79086 13 2 11.2091 2 9C2 6.79086 3.79086 5 6 5C6.82332 5 7.58854 5.24874 8.22461 5.67518M15.7754 5.67518C15.2287 4.11714 13.7448 3 12 3C10.2552 3 8.77132 4.11714 8.22461 5.67518M15.7754 5.67518C15.9209 6.08981 16 6.53566 16 7C16 7.3453 15.9562 7.68038 15.874 8M9.46487 7C9.15785 6.46925 8.73238 6.0156 8.22461 5.67518" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M6 17.5C7.59905 16.8776 9.69952 16.5 12 16.5C14.3005 16.5 16.401 16.8776 18 17.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M5 21C6.86556 20.3776 9.3161 20 12 20C14.6839 20 17.1344 20.3776 19 21" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M18 12V20M6 12V20" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>',
  aiBook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M12.3077 12L10.847 7.47891C10.7552 7.19466 10.4734 7 10.1538 7C9.83425 7 9.55249 7.19466 9.46066 7.47891L8 12M15 7V12M8.53846 10.5H11.7692" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  student: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M19 5L12 2L5 5L8.5 6.5V8.5C8.5 8.5 9.66667 8 12 8C14.3333 8 15.5 8.5 15.5 8.5V6.5L19 5ZM19 5V9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M15.5 8.5V9.5C15.5 11.433 13.933 13 12 13C10.067 13 8.5 11.433 8.5 9.5V8.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.78256 16.7033C6.68218 17.3878 3.79706 18.7854 5.55429 20.5342C6.41269 21.3885 7.36872 21.9995 8.57068 21.9995H15.4293C16.6313 21.9995 17.5873 21.3885 18.4457 20.5342C20.2029 18.7854 17.3178 17.3878 16.2174 16.7033C13.6371 15.0982 10.3629 15.0982 7.78256 16.7033Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  smile: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8.00897 9L8 9M16 9L15.991 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>',
  idea01: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M6.08938 14.9992C5.71097 14.1486 5.5 13.2023 5.5 12.2051C5.5 8.50154 8.41015 5.49921 12 5.49921C15.5899 5.49921 18.5 8.50154 18.5 12.2051C18.5 13.2023 18.289 14.1486 17.9106 14.9992" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M12 1.99921V2.99921" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M22 11.9992H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 11.9992H2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M19.0704 4.92792L18.3633 5.63503" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M5.6368 5.636L4.92969 4.92889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.517 19.3056C15.5274 18.9788 15.9326 18.054 16.0466 17.1238C16.0806 16.8459 15.852 16.6154 15.572 16.6154L8.47685 16.6156C8.18725 16.6156 7.95467 16.8614 7.98925 17.1489C8.1009 18.0773 8.3827 18.7555 9.45345 19.3056M14.517 19.3056C14.517 19.3056 9.62971 19.3056 9.45345 19.3056M14.517 19.3056C14.3955 21.2506 13.8338 22.0209 12.0068 21.9993C10.0526 22.0354 9.60303 21.0833 9.45345 19.3056" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  commentAdd02: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M14 6H22M18 2L18 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M6.09881 19.5C4.7987 19.3721 3.82475 18.9816 3.17157 18.3284C2 17.1569 2 15.2712 2 11.5V11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H11.5M6.5 18C6.29454 19.0019 5.37769 21.1665 6.31569 21.8651C6.806 22.2218 7.58729 21.8408 9.14987 21.0789C10.2465 20.5441 11.3562 19.9309 12.5546 19.655C12.9931 19.5551 13.4395 19.5125 14 19.5C17.7712 19.5 19.6569 19.5 20.8284 18.3284C21.947 17.2098 21.9976 15.4403 21.9999 12" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>'
};

// ===== THEME DETECTION =====
function detectXTheme() {
  const bg = getComputedStyle(document.body).backgroundColor;
  const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) {
    const brightness = parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3]);
    document.body.setAttribute('data-emilios-theme', brightness > 600 ? 'light' : 'dark');
  }
}

// ===== NOTES SYSTEM =====
let userNotes = {};

// Available quick labels (account-level)
const QUICK_LABELS = [
  { id: 'pond', text: 'Engagement Farmer', color: '#f4212e', icon: SVG_ICONS.tractor },
  { id: 'bot', text: 'Bot', color: '#f4212e', icon: SVG_ICONS.bot },
  { id: 'billboard', text: 'Walking Billboard', color: '#f4212e', icon: SVG_ICONS.dashboard },
  { id: 'grifter', text: 'Grifter', color: '#f4212e', icon: SVG_ICONS.evil },
  { id: 'thief', text: 'Content Thief', color: '#f4212e', icon: SVG_ICONS.prisoner },
  { id: 'niche_authority', text: 'Niche Authority', color: '#00ba7c', icon: SVG_ICONS.student },
  { id: 'good_person', text: 'Good Person', color: '#00ba7c', icon: SVG_ICONS.smile },
  { id: 'insightful_acc', text: 'Insightful', color: '#00ba7c', icon: SVG_ICONS.idea01 },
  { id: 'opinion_leader', text: 'Opinion Leader', color: '#00ba7c', icon: SVG_ICONS.commentAdd02 }
];

// Post-level labels (content tags for individual posts)
const POST_LABELS = [
  { id: 'shill', text: 'Shill', color: '#f4212e', icon: SVG_ICONS.canvas },
  { id: 'engagement_farming', text: 'Engagement Farming', color: '#f4212e', icon: SVG_ICONS.tractor },
  { id: 'misinformation', text: 'Misinformation', color: '#f4212e', icon: SVG_ICONS.informationDiamond },
  { id: 'stolen_content', text: 'Stolen Content', color: '#f4212e', icon: SVG_ICONS.prisoner },
  { id: 'undisclosed_ad', text: 'Undisclosed Ad', color: '#f4212e', icon: SVG_ICONS.advertisiment },
  { id: 'scam', text: 'Scam', color: '#f4212e', icon: SVG_ICONS.evil },
  { id: 'ai_slop', text: 'AI Slop', color: '#f4212e', icon: SVG_ICONS.aiBook },
  { id: 'alpha', text: 'Alpha', color: '#00ba7c', icon: SVG_ICONS.fire },
  { id: 'insightful', text: 'Insightful', color: '#00ba7c', icon: SVG_ICONS.brain02 },
  { id: 'banger', text: 'Banger', color: '#00ba7c', icon: SVG_ICONS.chefHat }
];

// Currently selected post-level labels for new note
let selectedPostLabels = new Set();

// Load notes from storage
function loadNotes() {
  chrome.storage.local.get(['userNotes'], (result) => {
    userNotes = result.userNotes || {};
    applyNotesIndicators();
  });
}

// Save notes to storage
function saveNotes() {
  chrome.storage.local.set({ userNotes });
}

// Get notes for a user (returns object with entries, labels, and screenshots)
function getUserData(screenName) {
  const data = userNotes[screenName.toLowerCase()];
  if (!data) return null;

  // Handle old format - migrate to new structure
  if (Array.isArray(data)) {
    return { entries: data, labels: [], screenshots: [] };
  }
  if (typeof data === 'string') {
    return { entries: [{ text: data, date: null, handle: screenName }], labels: [], screenshots: [] };
  }
  if (data.text && !data.entries) {
    return { entries: [data], labels: [], screenshots: [] };
  }

  return { entries: data.entries || [], labels: data.labels || [], screenshots: data.screenshots || [] };
}

// Get notes for a user (returns array of log entries)
function getNotes(screenName) {
  const userData = getUserData(screenName);
  if (!userData) return null;
  return userData.entries.length > 0 ? userData.entries : null;
}

// Get labels for a user
function getLabels(screenName) {
  const userData = getUserData(screenName);
  if (!userData) return [];
  return userData.labels || [];
}

// Check if user has any screenshots (legacy or entry-level)
function hasScreenshots(screenName) {
  const userData = getUserData(screenName);
  if (!userData) return false;
  // Check legacy screenshots
  if (userData.screenshots && userData.screenshots.length > 0) return true;
  // Check entry-level screenshots
  if (userData.entries) {
    for (const entry of userData.entries) {
      if (entry.screenshot) return true;
    }
  }
  return false;
}

// Set labels for a user
function setLabels(screenName, labels) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName) || { entries: [], labels: [], screenshots: [] };
  userData.labels = labels;
  userNotes[key] = userData;
  saveNotes();
  applyNotesIndicators();
}

// Toggle a label for a user (account-level)
function toggleLabel(screenName, labelId, skipPrompt = false) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName) || { entries: [], labels: [], screenshots: [] };

  const index = userData.labels.indexOf(labelId);
  if (index > -1) {
    // Removing — no prompt needed
    userData.labels.splice(index, 1);
    if (currentDisplayName && !userData.displayName) {
      userData.displayName = currentDisplayName;
    }
    userNotes[key] = userData;
    saveNotes();
    applyNotesIndicators();
  } else {
    // Adding — check if it's a manual add (not derived) and prompt
    if (!skipPrompt) {
      chrome.storage.sync.get(['skipLabelPrompt'], (result) => {
        if (result.skipLabelPrompt) {
          // User chose "Don't ask again" — apply directly
          applyLabelAdd(screenName, labelId);
        } else {
          showLabelConfirmPrompt(screenName, labelId);
        }
      });
    } else {
      applyLabelAdd(screenName, labelId);
    }
  }
}

// Actually add the label after confirmation
function applyLabelAdd(screenName, labelId) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName) || { entries: [], labels: [], screenshots: [] };
  if (!userData.labels.includes(labelId)) {
    userData.labels.push(labelId);
  }
  if (currentDisplayName && !userData.displayName) {
    userData.displayName = currentDisplayName;
  }
  userNotes[key] = userData;
  saveNotes();
  applyNotesIndicators();
  // Re-render modal if it's open to reflect the new label state
  if (currentNoteUser) {
    openNotesModal(currentNoteUser, currentPostUrl);
  }
}

// Show custom in-modal confirmation for manual label addition
function showLabelConfirmPrompt(screenName, labelId) {
  // Remove any existing prompt
  const existing = document.getElementById('x-honest-label-confirm');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'x-honest-label-confirm';
  overlay.innerHTML = `
    <div class="x-honest-label-confirm-backdrop"></div>
    <div class="x-honest-label-confirm-box">
      <p class="x-honest-label-confirm-text">Do you want to add this label manually?</p>
      <label class="x-honest-label-confirm-checkbox">
        <input type="checkbox" id="x-honest-dont-ask-again" />
        <span>Don't ask again</span>
      </label>
      <div class="x-honest-label-confirm-actions">
        <button class="x-honest-btn x-honest-btn-cancel" id="x-honest-label-confirm-no">Cancel</button>
        <button class="x-honest-btn x-honest-btn-add" id="x-honest-label-confirm-yes">Add</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => overlay.remove();

  overlay.querySelector('.x-honest-label-confirm-backdrop').addEventListener('click', close);
  overlay.querySelector('#x-honest-label-confirm-no').addEventListener('click', close);
  overlay.querySelector('#x-honest-label-confirm-yes').addEventListener('click', () => {
    const dontAsk = document.getElementById('x-honest-dont-ask-again').checked;
    if (dontAsk) {
      chrome.storage.sync.set({ skipLabelPrompt: true });
    }
    close();
    applyLabelAdd(screenName, labelId);
    openNotesModal(currentNoteUser, currentPostUrl);
  });
}

// Custom in-modal prompt for reporting an account with multiple undisclosed ads
function showReportAccountPrompt(screenName, adCount) {
  const existing = document.getElementById('x-honest-label-confirm');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'x-honest-label-confirm';
  overlay.innerHTML = `
    <div class="x-honest-label-confirm-backdrop"></div>
    <div class="x-honest-label-confirm-box">
      <p class="x-honest-label-confirm-text">@${screenName} has ${adCount} posts tagged as "Undisclosed Ad". Would you like to report this account?</p>
      <div class="x-honest-label-confirm-actions">
        <button class="x-honest-btn x-honest-btn-cancel" id="x-honest-label-confirm-no">No</button>
        <button class="x-honest-btn x-honest-btn-add" id="x-honest-label-confirm-yes">Report</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => overlay.remove();

  overlay.querySelector('.x-honest-label-confirm-backdrop').addEventListener('click', close);
  overlay.querySelector('#x-honest-label-confirm-no').addEventListener('click', close);
  overlay.querySelector('#x-honest-label-confirm-yes').addEventListener('click', () => {
    close();
    window.open('https://help.x.com/en/forms/safety-and-sensitive-content/ads', '_blank');
  });
}

// Toggle a post-level label on a specific entry
function togglePostLabel(screenName, entryIndex, postLabelId) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || entryIndex >= userData.entries.length) return;

  const entry = userData.entries[entryIndex];
  if (!entry.postLabels) entry.postLabels = [];

  const idx = entry.postLabels.indexOf(postLabelId);
  if (idx > -1) {
    entry.postLabels.splice(idx, 1);
  } else {
    entry.postLabels.push(postLabelId);
  }

  userNotes[key] = userData;
  saveNotes();

  // Re-run derivation after post-label change
  deriveAccountLabels(screenName);
  applyNotesIndicators();
}

// Auto-derive account-level labels from post-level label counts
function deriveAccountLabels(screenName) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries) return;

  // Count all post-level labels across entries
  const counts = {};
  userData.entries.forEach(entry => {
    if (entry.postLabels && Array.isArray(entry.postLabels)) {
      entry.postLabels.forEach(pl => {
        counts[pl] = (counts[pl] || 0) + 1;
      });
    }
  });

  // Compute fresh derived set from current counts (bidirectional — labels are removed when counts drop)
  const oldDerived = new Set(userData.derivedLabels || []);
  const newDerived = new Set();

  // Rule: 5+ Shill -> Walking Billboard
  if ((counts['shill'] || 0) >= 5) newDerived.add('billboard');

  // Rule: 3+ Engagement Farming -> Engagement Farmer
  if ((counts['engagement_farming'] || 0) >= 3) newDerived.add('pond');

  // Rule: 2+ Stolen Content -> Content Thief
  if ((counts['stolen_content'] || 0) >= 2) newDerived.add('thief');

  // Rule: 3+ Misinformation OR 2+ Scam -> Grifter
  if ((counts['misinformation'] || 0) >= 3 || (counts['scam'] || 0) >= 2) newDerived.add('grifter');

  // Rule: 2+ Undisclosed Ad -> prompt user to report account (one-time)
  if ((counts['undisclosed_ad'] || 0) >= 2 && !userData.reportPromptShown) {
    userData.reportPromptShown = true;
    const adCount = counts['undisclosed_ad'];
    const sn = screenName;
    setTimeout(() => {
      showReportAccountPrompt(sn, adCount);
    }, 100);
  }

  userData.derivedLabels = Array.from(newDerived);

  // Add newly derived labels to manual labels
  if (!userData.labels) userData.labels = [];
  newDerived.forEach(labelId => {
    if (userData.labels.indexOf(labelId) === -1) {
      userData.labels.push(labelId);
    }
  });

  // Remove labels that were previously derived but no longer qualify
  oldDerived.forEach(labelId => {
    if (!newDerived.has(labelId)) {
      const idx = userData.labels.indexOf(labelId);
      if (idx > -1) userData.labels.splice(idx, 1);
    }
  });

  userNotes[key] = userData;
  saveNotes();
}

// Attach screenshot to the last (most recent) note entry
function attachScreenshotToLastEntry(screenName, dataUrl) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || userData.entries.length === 0) {
    console.error('No entries to attach screenshot to');
    return;
  }

  // Attach to the last entry
  const lastIndex = userData.entries.length - 1;
  userData.entries[lastIndex].screenshot = dataUrl;

  userNotes[key] = userData;
  saveNotes();
}

// Delete a legacy screenshot (stored at user level)
function deleteScreenshot(screenName, index) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.screenshots || index >= userData.screenshots.length) return;

  userData.screenshots.splice(index, 1);
  userNotes[key] = userData;
  saveNotes();
}

// Delete a screenshot attached to an entry
function deleteEntryScreenshot(screenName, entryIndex) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || entryIndex >= userData.entries.length) return;

  delete userData.entries[entryIndex].screenshot;
  userNotes[key] = userData;
  saveNotes();
}

// Get latest note text for tooltip
function getLatestNoteText(screenName) {
  const notes = getNotes(screenName);
  if (!notes || notes.length === 0) return null;
  return notes[notes.length - 1].text;
}

// Format date as DD/MM/YYYY
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Format notes as log entries for display (returns HTML)
function formatNotesLog(notes) {
  if (!notes || notes.length === 0) return '';
  return notes.map((entry, index) => {
    const dateStr = entry.date ? formatDate(entry.date) : '??/??/????';
    const handle = entry.handle || '???';
    const escapedText = entry.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const hasScreenshot = entry.screenshot ? ' <span class="x-honest-has-screenshot" title="Has screenshot attached">' + SVG_ICONS.camera + '</span>' : '';

    // Build post-level tags display
    let postTagsHtml = '';
    const postLabels = entry.postLabels || [];
    if (postLabels.length > 0) {
      postTagsHtml = '<div class="x-honest-post-tags">' + postLabels.map(plId => {
        const pl = POST_LABELS.find(l => l.id === plId);
        if (!pl) return '';
        return `<span class="x-honest-post-tag active" data-entry-index="${index}" data-post-label-id="${plId}" style="--label-color: ${pl.color}" title="${pl.text}">${pl.icon} ${pl.text}</span>`;
      }).join('') + '</div>';
    }

    return `<div class="x-honest-note-entry" data-index="${index}">
      <div class="x-honest-note-body">
        <span class="x-honest-note-text">${escapedText}${hasScreenshot}</span>
        ${postTagsHtml}
        <span class="x-honest-note-footnote">for @${handle} on ${dateStr}</span>
      </div>
      <span class="x-honest-note-actions">
        <button class="x-honest-note-edit" title="Edit">${SVG_ICONS.pencilEdit}</button>
        <button class="x-honest-note-delete-entry" title="Delete">${SVG_ICONS.delete02}</button>
      </span>
    </div>`;
  }).join('');
}

// Edit a specific note entry
function editNoteEntry(screenName, index, newText) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || index >= userData.entries.length) return;

  if (newText.trim()) {
    userData.entries[index].text = newText.trim();
    userData.entries[index].lastModified = new Date().toISOString();
    userData.entries[index].handle = screenName;
    userNotes[key] = userData;
  } else {
    // Empty text means delete
    userData.entries.splice(index, 1);
    if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0) && (!userData.screenshots || userData.screenshots.length === 0)) {
      delete userNotes[key];
    } else {
      userNotes[key] = userData;
    }
  }
  saveNotes();
  applyNotesIndicators();
}

// Delete a specific note entry
function deleteNoteEntry(screenName, index) {
  const key = screenName.toLowerCase();
  let userData = getUserData(screenName);
  if (!userData || !userData.entries || index >= userData.entries.length) return;

  userData.entries.splice(index, 1);
  if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0) && (!userData.screenshots || userData.screenshots.length === 0)) {
    delete userNotes[key];
  } else {
    userNotes[key] = userData;
  }
  saveNotes();
  applyNotesIndicators();
}

// Add a new note entry (appends to log)
function addNote(screenName, noteText) {
  const key = screenName.toLowerCase();
  if (!noteText.trim()) return;

  let userData = getUserData(screenName) || { entries: [], labels: [] };
  const entry = {
    text: noteText.trim(),
    date: new Date().toISOString(),
    handle: screenName
  };

  // Attach selected post-level labels
  if (selectedPostLabels.size > 0) {
    entry.postLabels = Array.from(selectedPostLabels);
  }

  userData.entries.push(entry);

  // Store display name if available
  if (currentDisplayName) {
    userData.displayName = currentDisplayName;
  }

  userNotes[key] = userData;
  saveNotes();

  // Clear selected post labels after adding
  selectedPostLabels.clear();

  // Run auto-derivation engine
  deriveAccountLabels(screenName);

  applyNotesIndicators();
}

// Clear all notes for a user
function clearNotes(screenName) {
  const key = screenName.toLowerCase();
  delete userNotes[key];
  saveNotes();
  applyNotesIndicators();
}

// Export all notes as HTML with screenshots - LIVE updating version
function exportNotesCSV() {
  console.log('exportNotesCSV called');
  // Open the dashboard page as an extension page (has chrome.storage access)
  const dashboardUrl = chrome.runtime.getURL('dashboard.html');
  window.open(dashboardUrl, '_blank');
}
// Create notes modal
function createNotesModal() {
  let modal = document.getElementById('x-honest-notes-modal');

  if (modal) {
    // Modal already exists in DOM, reuse it
    return;
  }

  modal = document.createElement('div');
  modal.id = 'x-honest-notes-modal';
  modal.innerHTML = `
    <div class="x-honest-modal-backdrop"></div>
    <div class="x-honest-modal-content">
      <div class="x-honest-modal-header">
        <span class="x-honest-modal-title">Records for @<span id="x-honest-note-username"></span></span>
        <button class="x-honest-modal-close">&times;</button>
      </div>
      <div class="x-honest-labels-collapsible" id="x-honest-labels-collapsible">
        <button class="x-honest-labels-toggle" id="x-honest-labels-toggle">
          <span class="x-honest-labels-toggle-text">Account labels</span>
          <span class="x-honest-labels-chevron" id="x-honest-labels-chevron">&#9662;</span>
        </button>
        <div class="x-honest-labels-row" id="x-honest-labels-row" style="display: none;">
          <div class="x-honest-labels-buttons" id="x-honest-labels-buttons"></div>
        </div>
      </div>
      <div id="x-honest-notes-log" class="x-honest-notes-log"></div>
      <div id="x-honest-screenshots" class="x-honest-screenshots"></div>
      <div class="x-honest-note-input-row">
        <input type="text" id="x-honest-note-input" placeholder="Add a new record..." />
        <button id="x-honest-btn-add" class="x-honest-btn x-honest-btn-add">Add</button>
      </div>
      <div class="x-honest-labels-collapsible" id="x-honest-post-labels-collapsible">
        <button class="x-honest-labels-toggle" id="x-honest-post-labels-toggle">
          <span class="x-honest-labels-toggle-text">Post labels</span>
          <span class="x-honest-labels-chevron" id="x-honest-post-labels-chevron">&#9662;</span>
        </button>
        <div class="x-honest-post-labels-row" id="x-honest-post-labels-row" style="display: none;">
          <div class="x-honest-post-labels-buttons" id="x-honest-post-labels-buttons"></div>
        </div>
      </div>
      <div class="x-honest-note-url-row" id="x-honest-note-url-row" style="display: none;">
        <label class="x-honest-checkbox-label">
          <input type="checkbox" id="x-honest-include-url" />
          <span>Add URL</span>
        </label>
        <button id="x-honest-btn-screenshot" class="x-honest-btn x-honest-btn-screenshot" title="Paste image from clipboard">${SVG_ICONS.camera}</button>
        <input type="file" id="x-honest-file-input" accept="image/*" style="display:none" />
      </div>
      <div class="x-honest-modal-footer">
        <button class="x-honest-btn x-honest-btn-delete">Clear</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Event listeners
  modal.querySelector('.x-honest-modal-backdrop').addEventListener('click', closeNotesModal);
  modal.querySelector('.x-honest-modal-close').addEventListener('click', closeNotesModal);

  // Add button click handler
  const addBtn = modal.querySelector('#x-honest-btn-add');
  addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Add button clicked');
    addCurrentNote();
  });

  modal.querySelector('.x-honest-btn-delete').addEventListener('click', deleteCurrentNotes);

  // Collapsible account labels toggle
  modal.querySelector('#x-honest-labels-toggle').addEventListener('click', function() {
    const labelsRow = document.getElementById('x-honest-labels-row');
    const chevron = document.getElementById('x-honest-labels-chevron');
    if (labelsRow.style.display === 'none') {
      labelsRow.style.display = 'flex';
      chevron.innerHTML = '&#9652;';
    } else {
      labelsRow.style.display = 'none';
      chevron.innerHTML = '&#9662;';
    }
  });

  // Collapsible post labels toggle
  modal.querySelector('#x-honest-post-labels-toggle').addEventListener('click', function() {
    const postRow = document.getElementById('x-honest-post-labels-row');
    const chevron = document.getElementById('x-honest-post-labels-chevron');
    if (postRow.style.display === 'none') {
      postRow.style.display = 'flex';
      chevron.innerHTML = '&#9652;';
    } else {
      postRow.style.display = 'none';
      chevron.innerHTML = '&#9662;';
    }
  });

  // Screenshot button handler - paste from clipboard and attach to LAST note entry
  modal.querySelector('#x-honest-btn-screenshot').addEventListener('click', async function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!currentNoteUser) {
      alert('No user selected');
      return;
    }

    // Check if user has any notes to attach screenshot to
    const notes = getNotes(currentNoteUser);
    if (!notes || notes.length === 0) {
      alert('Add a note first, then attach a screenshot to it.');
      return;
    }

    const btn = this;
    const camIcon = SVG_ICONS.camera;
    btn.innerHTML = camIcon + ' Reading clipboard...';
    btn.disabled = true;

    try {
      const clipboardItems = await navigator.clipboard.read();
      let imageFound = false;

      for (const item of clipboardItems) {
        const imageType = item.types.find(type => type.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          const reader = new FileReader();
          reader.onload = function(evt) {
            const dataUrl = evt.target.result;
            // Attach screenshot to the LAST (most recent) note entry
            attachScreenshotToLastEntry(currentNoteUser, dataUrl);
            btn.innerHTML = camIcon + ' Saved!';
            setTimeout(() => {
              btn.innerHTML = camIcon;
              btn.disabled = false;
              openNotesModal(currentNoteUser, currentPostUrl);
            }, 1000);
          };
          reader.readAsDataURL(blob);
          imageFound = true;
          break;
        }
      }

      if (!imageFound) {
        alert('No image found in clipboard.\n\nTip: Use Win+Shift+S (Windows) or Cmd+Shift+4 (Mac) to capture a screenshot first, then click this button.');
        btn.innerHTML = camIcon;
        btn.disabled = false;
      }
    } catch (err) {
      console.error('Clipboard read error:', err);
      alert('Could not read clipboard. You can also right-click the button to upload an image file.\n\nError: ' + err.message);
      btn.innerHTML = camIcon;
      btn.disabled = false;
    }
  });

  // Right-click to upload file instead
  modal.querySelector('#x-honest-btn-screenshot').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const notes = getNotes(currentNoteUser);
    if (!notes || notes.length === 0) {
      alert('Add a note first, then attach a screenshot to it.');
      return;
    }
    modal.querySelector('#x-honest-file-input').click();
  });

  // File input handler
  modal.querySelector('#x-honest-file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file || !currentNoteUser) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const dataUrl = evt.target.result;
      attachScreenshotToLastEntry(currentNoteUser, dataUrl);
      openNotesModal(currentNoteUser, currentPostUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  // Enter key to add note
  modal.querySelector('#x-honest-note-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCurrentNote();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNotesModal();
  });
}

// ===== REPORT AD FUNCTIONALITY =====
function showReportAdConfirmation(screenName, postUrl) {
  let modal = document.getElementById('x-honest-report-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'x-honest-report-modal';
    document.body.appendChild(modal);
  }

  // Always reset to the initial confirmation view
  modal.innerHTML = `
    <div class="x-honest-modal-backdrop"></div>
    <div class="x-honest-modal-content x-honest-report-content">
      <div class="x-honest-modal-header">
        <span class="x-honest-modal-title">${SVG_ICONS.advertisiment} Report Undisclosed Ad</span>
        <button class="x-honest-modal-close">&times;</button>
      </div>
      <div class="x-honest-report-body">
        <p>Do you want to submit a report for an undisclosed advertisement?</p>
      </div>
      <div class="x-honest-modal-footer">
        <button class="x-honest-btn x-honest-btn-cancel" id="x-honest-report-no">No</button>
        <button class="x-honest-btn x-honest-btn-add" id="x-honest-report-yes">Yes</button>
      </div>
    </div>
  `;

  // Close handlers
  const closeModal = () => modal.classList.remove('visible');
  modal.querySelector('.x-honest-modal-close').addEventListener('click', closeModal);
  modal.querySelector('.x-honest-modal-backdrop').addEventListener('click', closeModal);
  modal.querySelector('#x-honest-report-no').addEventListener('click', closeModal);

  // Yes button handler
  modal.querySelector('#x-honest-report-yes').addEventListener('click', () => {
    const reportUrl = 'https://help.x.com/en/forms/safety-and-sensitive-content/ads';
    const usernameText = '@' + screenName;
    const urlText = postUrl || 'N/A';

    // 1) Open the report form in a NEW WINDOW (not tab)
    window.open(reportUrl, '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');

    // 2) Switch modal to step-by-step instructions
    modal.querySelector('.x-honest-report-body').innerHTML = `
      <div class="x-honest-report-steps">
        <div class="x-honest-report-step">
          <span class="x-honest-step-number">1</span>
          <span class="x-honest-step-text">Choose the appropriate type of product or content this ad is promoting from the list</span>
        </div>
        <div class="x-honest-report-step">
          <span class="x-honest-step-number">2</span>
          <span class="x-honest-step-text">Copy and paste the username</span>
          <button class="x-honest-copy-btn" data-copy="${usernameText.replace(/"/g, '&quot;')}" title="Copy username">
            ${usernameText} <span class="x-honest-copy-icon">${SVG_ICONS.copy.replace('width="1em" height="1em"', 'width="12" height="12"')} Copy</span>
          </button>
        </div>
        <div class="x-honest-report-step">
          <span class="x-honest-step-number">3</span>
          <span class="x-honest-step-text">Copy and paste the content URL</span>
          <button class="x-honest-copy-btn" data-copy="${urlText.replace(/"/g, '&quot;')}" title="Copy URL">
            <span class="x-honest-copy-url-text">${urlText}</span> <span class="x-honest-copy-icon">${SVG_ICONS.copy.replace('width="1em" height="1em"', 'width="12" height="12"')} Copy</span>
          </button>
        </div>
        <div class="x-honest-report-step">
          <span class="x-honest-step-number">4</span>
          <span class="x-honest-step-text">Submit the form</span>
        </div>
      </div>
    `;

    // Change footer to Done button
    modal.querySelector('.x-honest-modal-footer').innerHTML = `
      <button class="x-honest-btn x-honest-btn-add" id="x-honest-report-done">Done</button>
    `;

    // Done button closes modal
    modal.querySelector('#x-honest-report-done').addEventListener('click', closeModal);

    // Copy button handlers
    modal.querySelectorAll('.x-honest-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.dataset.copy;
        navigator.clipboard.writeText(textToCopy).then(() => {
          const iconSpan = btn.querySelector('.x-honest-copy-icon');
          const original = iconSpan.innerHTML;
          iconSpan.innerHTML = '✓ Copied!';
          iconSpan.classList.add('x-honest-copied');
          setTimeout(() => {
            iconSpan.innerHTML = original;
            iconSpan.classList.remove('x-honest-copied');
          }, 1500);
        }).catch(() => {
          // Fallback: select text
          const temp = document.createElement('textarea');
          temp.value = textToCopy;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
          const iconSpan = btn.querySelector('.x-honest-copy-icon');
          const original = iconSpan.innerHTML;
          iconSpan.innerHTML = '✓ Copied!';
          iconSpan.classList.add('x-honest-copied');
          setTimeout(() => {
            iconSpan.innerHTML = original;
            iconSpan.classList.remove('x-honest-copied');
          }, 1500);
        });
      });
    });
  });

  modal.classList.add('visible');
}

let currentNoteUser = null;
let currentPostUrl = null;
let currentDisplayName = null;

function openNotesModal(screenName, postUrl = null, displayName = null) {
  currentDisplayName = displayName;
  createNotesModal();
  currentNoteUser = screenName;
  currentPostUrl = postUrl;

  // Proactively store display name if we have one and user has existing data
  if (displayName) {
    const key = screenName.toLowerCase();
    const userData = userNotes[key];
    if (userData && typeof userData === 'object' && !Array.isArray(userData) && !userData.displayName) {
      userData.displayName = displayName;
      userNotes[key] = userData;
      saveNotes();
    }
  }
  const modal = document.getElementById('x-honest-notes-modal');
  document.getElementById('x-honest-note-username').textContent = screenName;

  console.log('Opening modal for:', screenName, 'with postUrl:', postUrl);

  // Show/hide URL checkbox row
  const urlRow = document.getElementById('x-honest-note-url-row');
  const urlCheckbox = document.getElementById('x-honest-include-url');

  if (urlRow && urlCheckbox) {
    if (postUrl) {
      urlRow.style.display = 'flex';
      urlCheckbox.checked = false;
    } else {
      urlRow.style.display = 'none';
      urlCheckbox.checked = false;
    }
  }

  // Display existing notes log
  const notes = getNotes(screenName);
  const logEl = document.getElementById('x-honest-notes-log');
  if (notes && notes.length > 0) {
    logEl.innerHTML = formatNotesLog(notes);
    logEl.style.display = 'block';

    // Add event listeners for edit/delete buttons
    logEl.querySelectorAll('.x-honest-note-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const entry = e.target.closest('.x-honest-note-entry');
        if (!entry) return;
        // Don't start a new edit if one is already active
        if (entry.querySelector('.x-honest-inline-edit')) return;
        const index = parseInt(entry.dataset.index);
        const currentNotes = getNotes(currentNoteUser);
        if (!currentNotes || !currentNotes[index]) return;
        const currentText = currentNotes[index].text;

        // Hide the note body and actions
        const noteBody = entry.querySelector('.x-honest-note-body');
        const noteActions = entry.querySelector('.x-honest-note-actions');
        noteBody.style.display = 'none';
        noteActions.style.display = 'none';

        // Create inline edit UI
        const editWrap = document.createElement('div');
        editWrap.className = 'x-honest-inline-edit';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'x-honest-inline-edit-input';
        input.value = currentText;
        input.placeholder = 'Edit record...';

        const btnRow = document.createElement('div');
        btnRow.className = 'x-honest-inline-edit-actions';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'x-honest-inline-edit-save';
        saveBtn.textContent = 'Save';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'x-honest-inline-edit-cancel';
        cancelBtn.textContent = 'Cancel';

        btnRow.appendChild(saveBtn);
        btnRow.appendChild(cancelBtn);
        editWrap.appendChild(input);
        editWrap.appendChild(btnRow);
        entry.appendChild(editWrap);

        input.focus();
        input.select();

        function cancelEdit() {
          editWrap.remove();
          noteBody.style.display = '';
          noteActions.style.display = '';
        }

        function saveEdit() {
          const newText = input.value.trim();
          if (newText === currentText || (newText === '' && !currentText)) {
            cancelEdit();
            return;
          }
          if (newText === '') {
            deleteNoteEntry(currentNoteUser, index);
          } else {
            editNoteEntry(currentNoteUser, index, newText);
          }
          openNotesModal(currentNoteUser, currentPostUrl);
        }

        saveBtn.addEventListener('click', saveEdit);
        cancelBtn.addEventListener('click', cancelEdit);
        input.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter') { ev.preventDefault(); saveEdit(); }
          else if (ev.key === 'Escape') { ev.preventDefault(); cancelEdit(); }
        });
      });
    });

    logEl.querySelectorAll('.x-honest-note-delete-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const entry = e.target.closest('.x-honest-note-entry');
        if (!entry) return;
        const index = parseInt(entry.dataset.index);
        deleteNoteEntry(currentNoteUser, index);
        openNotesModal(currentNoteUser, currentPostUrl);
      });
    });

    // Add click handlers for post-level tags on entries (toggle in-place)
    logEl.querySelectorAll('.x-honest-post-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        const entryIndex = parseInt(tag.dataset.entryIndex);
        const postLabelId = tag.dataset.postLabelId;
        togglePostLabel(currentNoteUser, entryIndex, postLabelId);
        openNotesModal(currentNoteUser, currentPostUrl);
      });
    });
  } else {
    logEl.innerHTML = '';
    logEl.style.display = 'none';
  }

  // Display screenshots - both legacy (user-level) and entry-level
  const userData = getUserData(screenName);
  const screenshotsEl = document.getElementById('x-honest-screenshots');

  // Collect all screenshots: legacy ones and entry-level ones
  let allScreenshots = [];

  // Legacy screenshots (stored at user level)
  if (userData && userData.screenshots && userData.screenshots.length > 0) {
    userData.screenshots.forEach((ss, idx) => {
      allScreenshots.push({
        data: ss.data,
        type: 'legacy',
        index: idx
      });
    });
  }

  // Entry-level screenshots
  if (userData && userData.entries) {
    userData.entries.forEach((entry, idx) => {
      if (entry.screenshot) {
        allScreenshots.push({
          data: entry.screenshot,
          type: 'entry',
          entryIndex: idx,
          noteText: entry.text.substring(0, 30) + (entry.text.length > 30 ? '...' : '')
        });
      }
    });
  }

  if (allScreenshots.length > 0) {
    screenshotsEl.innerHTML = `
      <div class="x-honest-screenshots-title">Screenshots (${allScreenshots.length}):</div>
      <div class="x-honest-screenshots-grid">
        ${allScreenshots.map((ss, idx) => `
          <div class="x-honest-screenshot-item" data-index="${ss.type === 'legacy' ? ss.index : -1}" data-entry-index="${ss.type === 'entry' ? ss.entryIndex : -1}" data-type="${ss.type}">
            <img src="${ss.data}" alt="Screenshot ${idx + 1}" class="x-honest-screenshot-thumb" title="${ss.type === 'entry' ? 'Attached to: ' + ss.noteText : 'Legacy screenshot'}" />
            <button class="x-honest-screenshot-delete" title="Delete">×</button>
          </div>
        `).join('')}
      </div>
    `;
    screenshotsEl.style.display = 'block';

    // Add delete handlers
    screenshotsEl.querySelectorAll('.x-honest-screenshot-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this screenshot?')) {
          const item = e.target.closest('.x-honest-screenshot-item');
          const type = item.dataset.type;

          if (type === 'legacy') {
            const idx = parseInt(item.dataset.index);
            deleteScreenshot(currentNoteUser, idx);
          } else if (type === 'entry') {
            const entryIdx = parseInt(item.dataset.entryIndex);
            deleteEntryScreenshot(currentNoteUser, entryIdx);
          }
          openNotesModal(currentNoteUser, currentPostUrl);
        }
      });
    });

    // Add click to enlarge
    screenshotsEl.querySelectorAll('.x-honest-screenshot-thumb').forEach(img => {
      img.addEventListener('click', () => {
        showScreenshotPreview(img.src);
      });
    });
  } else {
    screenshotsEl.innerHTML = '';
    screenshotsEl.style.display = 'none';
  }

  // Clear input
  document.getElementById('x-honest-note-input').value = '';

  // Populate quick labels (account-level)
  const labelsContainer = document.getElementById('x-honest-labels-buttons');
  const currentLabels = getLabels(screenName);
  labelsContainer.innerHTML = QUICK_LABELS.map(label => {
    const isActive = currentLabels.includes(label.id);
    return `<button class="x-honest-label-btn ${isActive ? 'active' : ''}"
                    data-label-id="${label.id}"
                    style="--label-color: ${label.color}">
              ${label.icon} ${label.text}
            </button>`;
  }).join('');

  // Set collapsible state based on context:
  // From a post -> account labels collapsed, post labels expanded
  // From a profile -> account labels expanded, post labels collapsed
  const labelsRow = document.getElementById('x-honest-labels-row');
  const chevron = document.getElementById('x-honest-labels-chevron');
  const postLabelsRow = document.getElementById('x-honest-post-labels-row');
  const postChevron = document.getElementById('x-honest-post-labels-chevron');
  const isFromPost = !!currentPostUrl;

  if (isFromPost) {
    // Opened from a post: collapse account labels, expand post labels
    labelsRow.style.display = 'none';
    chevron.innerHTML = '&#9662;';
    postLabelsRow.style.display = 'flex';
    postChevron.innerHTML = '&#9652;';
  } else {
    // Opened from a profile: expand account labels, collapse post labels
    labelsRow.style.display = 'flex';
    chevron.innerHTML = '&#9652;';
    postLabelsRow.style.display = 'none';
    postChevron.innerHTML = '&#9662;';
  }

  // Add click handlers for label buttons
  labelsContainer.querySelectorAll('.x-honest-label-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const labelId = btn.dataset.labelId;
      const isActive = btn.classList.contains('active');
      if (isActive) {
        // Removing — synchronous, re-render immediately
        toggleLabel(currentNoteUser, labelId);
        openNotesModal(currentNoteUser, currentPostUrl);
      } else {
        // Adding — may be async (confirm prompt), toggleLabel handles re-render
        toggleLabel(currentNoteUser, labelId);
      }
    });
  });

  // Populate post-level label picker (for new notes)
  selectedPostLabels.clear();
  const postLabelsContainer = document.getElementById('x-honest-post-labels-buttons');
  postLabelsContainer.innerHTML = POST_LABELS.map(label => {
    return `<button class="x-honest-post-label-btn"
                    data-post-label-id="${label.id}"
                    style="--label-color: ${label.color}">
              ${label.icon} ${label.text}
            </button>`;
  }).join('');

  // Add click handlers for post-level label buttons
  postLabelsContainer.querySelectorAll('.x-honest-post-label-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plId = btn.dataset.postLabelId;
      if (selectedPostLabels.has(plId)) {
        selectedPostLabels.delete(plId);
        btn.classList.remove('active');
      } else {
        selectedPostLabels.add(plId);
        btn.classList.add('active');
      }
    });
  });

  modal.classList.add('visible');
  document.getElementById('x-honest-note-input').focus();
}

function closeNotesModal() {
  const modal = document.getElementById('x-honest-notes-modal');
  if (modal) {
    modal.classList.remove('visible');
  }
  currentNoteUser = null;
  selectedPostLabels.clear();
}

// Show full-size screenshot preview
function showScreenshotPreview(src) {
  let preview = document.getElementById('x-honest-screenshot-preview');
  if (!preview) {
    preview = document.createElement('div');
    preview.id = 'x-honest-screenshot-preview';
    preview.innerHTML = `
      <div class="x-honest-preview-backdrop"></div>
      <div class="x-honest-preview-content">
        <img src="" alt="Screenshot preview" />
        <button class="x-honest-preview-close">×</button>
      </div>
    `;
    document.body.appendChild(preview);

    preview.querySelector('.x-honest-preview-backdrop').addEventListener('click', () => {
      preview.classList.remove('visible');
    });
    preview.querySelector('.x-honest-preview-close').addEventListener('click', () => {
      preview.classList.remove('visible');
    });
  }

  preview.querySelector('img').src = src;
  preview.classList.add('visible');
}

function addCurrentNote() {
  console.log('addCurrentNote called, currentNoteUser:', currentNoteUser);
  if (!currentNoteUser) {
    console.log('No currentNoteUser set!');
    return;
  }

  const inputEl = document.getElementById('x-honest-note-input');
  if (!inputEl) {
    console.log('Input element not found!');
    return;
  }

  let noteText = inputEl.value;
  console.log('Note text:', noteText);

  if (noteText.trim()) {
    // Check if URL should be included
    const urlCheckbox = document.getElementById('x-honest-include-url');
    if (urlCheckbox && urlCheckbox.checked && currentPostUrl) {
      noteText = noteText.trim() + ' - ' + currentPostUrl;
    }
    addNote(currentNoteUser, noteText);
    // Refresh the log display (keep the post URL context)
    openNotesModal(currentNoteUser, currentPostUrl);
  }
}

function deleteCurrentNotes() {
  if (currentNoteUser) {
    clearNotes(currentNoteUser);
  }
  closeNotesModal();
}

// Create label badges HTML — icon-only style matching pencil/ad buttons
function createLabelBadges(labels) {
  let html = '';
  if (labels && labels.length > 0) {
    html += labels.map(labelId => {
      const label = QUICK_LABELS.find(l => l.id === labelId);
      if (!label) return '';
      return `<span class="x-honest-label-badge" style="color: ${label.color}" title="${label.text}">${label.icon}<span class="x-honest-label-name">${label.text}</span></span>`;
    }).join('');
  }
  return html;
}

// Reserved X routes (not user screen names)
const RESERVED_ROUTES = ['home', 'explore', 'notifications', 'messages', 'i', 'settings', 'search', 'compose'];

// Extract screen name from a container element
function getScreenName(container) {
  const userLink = container.querySelector('a[href^="/"][role="link"]');
  if (userLink) {
    const href = userLink.getAttribute('href');
    const match = href.match(/^\/([^\/]+)/);
    if (match && !RESERVED_ROUTES.includes(match[1])) {
      return match[1];
    }
  }
  return null;
}

// Apply note indicators to usernames
function applyNotesIndicators() {
  // Timeline and sidebar
  document.querySelectorAll('[data-testid="User-Name"], [data-testid="UserCell"]').forEach(container => {
    const screenName = getScreenName(container);
    if (!screenName) return;

    // Proactively capture display name and avatar from DOM
    const key = screenName.toLowerCase();
    const userData = userNotes[key];
    if (userData && typeof userData === 'object' && !Array.isArray(userData)) {
      let needsSave = false;

      // Capture display name: use the link WITHOUT tabindex="-1" (that's the name, not the @handle)
      if (!userData.displayName) {
        const unEl = container.querySelector('[data-testid="User-Name"]') || container;
        const nameLink = unEl.querySelector('a[role="link"]:not([tabindex="-1"])');
        if (nameLink) {
          const dn = nameLink.textContent.trim();
          if (dn && dn !== screenName && dn !== '@' + screenName && !dn.startsWith('@')) {
            userData.displayName = dn;
            needsSave = true;
          }
        }
      }

      // Capture avatar URL from the article's avatar image
      if (!userData.avatarUrl) {
        const article = container.closest('article');
        if (article) {
          const avatarImg = article.querySelector('[data-testid="Tweet-User-Avatar"] img[src*="profile_images"]');
          if (avatarImg) {
            userData.avatarUrl = avatarImg.src;
            needsSave = true;
          }
        }
      }

      if (needsSave) {
        userNotes[key] = userData;
        saveNotes();
      }
    }

    const notes = getNotes(screenName);
    const labels = getLabels(screenName);
    const userHasScreenshots = hasScreenshots(screenName);
    const latestNote = getLatestNoteText(screenName);
    let existingIndicator = container.querySelector('.x-honest-note-btn');
    let existingLabels = container.querySelector('.x-honest-label-badges');

    if (!existingIndicator) {
      // Create wrapper for pencil + labels
      const wrapper = document.createElement('span');
      wrapper.className = 'x-honest-note-wrapper';

      // Create the pencil button
      const btn = document.createElement('span');
      btn.className = 'x-honest-note-btn';
      btn.innerHTML = SVG_ICONS.pencilEdit;
      btn.title = latestNote || 'Add note';
      btn.dataset.screenName = screenName;

      if (notes) {
        btn.classList.add('has-note');
      }

      // Create the report ad button
      const reportBtn = document.createElement('span');
      reportBtn.className = 'x-honest-report-btn';
      reportBtn.innerHTML = SVG_ICONS.advertisiment;
      reportBtn.title = 'Report Undisclosed Ad';
      reportBtn.dataset.screenName = screenName;

      // Create labels container
      const labelsSpan = document.createElement('span');
      labelsSpan.className = 'x-honest-label-badges';
      labelsSpan.innerHTML = createLabelBadges(labels);

      // Actions pill (edit + ad buttons)
      const actionsPill = document.createElement('span');
      actionsPill.className = 'x-honest-actions-pill';
      actionsPill.appendChild(btn);
      actionsPill.appendChild(reportBtn);

      wrapper.appendChild(actionsPill);
      wrapper.appendChild(labelsSpan);

      // Find where to insert - after the timestamp
      const userNameContainer = container.querySelector('[data-testid="User-Name"]') || container;
      // Look for the timestamp link (contains /status/)
      let timeLink = userNameContainer.querySelector('a[href*="/status/"]');

      // Also try to find post URL from parent article if not found in username container
      let postUrl = null;

      // Try various methods to find the post URL
      if (timeLink) {
        postUrl = 'https://x.com' + timeLink.getAttribute('href');
      }

      if (!postUrl) {
        // Try to find from parent article - look for time element's parent link
        const article = container.closest('article');
        if (article) {
          // Method 1: time element inside a link with /status/
          const timeEl = article.querySelector('time');
          if (timeEl) {
            const parentLink = timeEl.closest('a[href*="/status/"]');
            if (parentLink) {
              postUrl = 'https://x.com' + parentLink.getAttribute('href');
            }
          }
          // Method 2: any link with /status/ in the article
          if (!postUrl) {
            const statusLink = article.querySelector('a[href*="/status/"]');
            if (statusLink) {
              postUrl = 'https://x.com' + statusLink.getAttribute('href');
            }
          }
        }
      }

      // Store the post URL in the button's dataset
      if (postUrl) {
        btn.dataset.postUrl = postUrl;
        reportBtn.dataset.postUrl = postUrl;
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Extract display name: use link WITHOUT tabindex="-1" (the name link, not @handle)
        var dn = null;
        var unEl = container.querySelector('[data-testid="User-Name"]') || container;
        var nameLink = unEl.querySelector('a[role="link"]:not([tabindex="-1"])');
        if (nameLink) {
          dn = nameLink.textContent.trim();
          if (dn && (dn.startsWith('@') || dn === btn.dataset.screenName)) dn = null;
        }
        openNotesModal(btn.dataset.screenName, btn.dataset.postUrl || null, dn);
      });

      reportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showReportAdConfirmation(reportBtn.dataset.screenName, reportBtn.dataset.postUrl || null);
      });
      if (timeLink && timeLink.parentElement) {
        timeLink.parentElement.insertBefore(wrapper, timeLink.nextSibling);
      } else {
        // Fallback: append to the container's first div
        const firstDiv = userNameContainer.querySelector('div');
        if (firstDiv) {
          firstDiv.appendChild(wrapper);
        }
      }
    } else {
      // Update existing indicator
      existingIndicator.title = latestNote || 'Add note';
      existingIndicator.dataset.screenName = screenName;
      if (notes) {
        existingIndicator.classList.add('has-note');
      } else {
        existingIndicator.classList.remove('has-note');
      }

      // Update labels (including auto RECEIPTS based on screenshots)
      if (existingLabels) {
        existingLabels.innerHTML = createLabelBadges(labels);
      }
    }
  });

  // Profile page
  const profileUserName = document.querySelector('[data-testid="UserName"]');
  if (profileUserName) {
    const pathMatch = window.location.pathname.match(/^\/([^\/]+)/);
    if (pathMatch) {
      const screenName = pathMatch[1];
      if (!RESERVED_ROUTES.includes(screenName)) {
        const notes = getNotes(screenName);
        const labels = getLabels(screenName);
        const profileHasScreenshots = hasScreenshots(screenName);
        const latestNote = getLatestNoteText(screenName);
        let existingIndicator = profileUserName.querySelector('.x-honest-note-btn');
        let existingLabels = profileUserName.querySelector('.x-honest-label-badges');

        if (!existingIndicator) {
          // Create wrapper for pencil + labels
          const wrapper = document.createElement('span');
          wrapper.className = 'x-honest-note-wrapper x-honest-note-wrapper--profile';

          const btn = document.createElement('span');
          btn.className = 'x-honest-note-btn';
          btn.innerHTML = SVG_ICONS.pencilEdit;
          btn.title = latestNote || 'Add note';
          btn.dataset.screenName = screenName;

          if (notes) {
            btn.classList.add('has-note');
          }

          // Create the report ad button (not shown on profile pages, only on posts)
          // Profile pages don't have specific posts to report

          // Create labels container
          const labelsSpan = document.createElement('span');
          labelsSpan.className = 'x-honest-label-badges';
          labelsSpan.innerHTML = createLabelBadges(labels);

          // Actions pill (edit button — no ad on profile)
          const actionsPill = document.createElement('span');
          actionsPill.className = 'x-honest-actions-pill';
          actionsPill.appendChild(btn);

          wrapper.appendChild(actionsPill);
          wrapper.appendChild(labelsSpan);

          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openNotesModal(btn.dataset.screenName);
          });

          // Insert on the name row: "MANI ✓ [icons here]"
          // The name text lives inside: ... > div(innerFlex) > div[dir="ltr"] > spans
          // Appending to innerFlex (parent of dir="ltr") places icons right after the name+badge.
          const nameDirDiv = profileUserName.querySelector('div[dir="ltr"]');
          if (nameDirDiv && nameDirDiv.parentElement) {
            const innerFlex = nameDirDiv.parentElement;
            innerFlex.style.display = 'flex';
            innerFlex.style.alignItems = 'center';
            wrapper.style.flexShrink = '0';
            wrapper.style.marginLeft = '4px';
            innerFlex.appendChild(wrapper);
          } else {
            profileUserName.appendChild(wrapper);
          }
        } else {
          existingIndicator.title = latestNote || 'Add note';
          const existingWrapper = existingIndicator.closest('.x-honest-note-wrapper');
          if (existingWrapper) {
            existingWrapper.classList.add('x-honest-note-wrapper--profile');
          }
          if (notes) {
            existingIndicator.classList.add('has-note');
          } else {
            existingIndicator.classList.remove('has-note');
          }

          // Update labels (including auto RECEIPTS based on screenshots)
          if (existingLabels) {
            existingLabels.innerHTML = createLabelBadges(labels);
          }
        }
      }
    }
  }
}

// Context menu removed - using clickable pencil icon instead

// ===== END NOTES SYSTEM =====

// Apply states based on settings
function applyMetricsState(hide) {
  if (hide) {
    document.body.classList.add('hide-vanity-metrics');
  } else {
    document.body.classList.remove('hide-vanity-metrics');
  }
}







// Apply notes state
function applyNotesState(show) {
  if (show) {
    document.body.classList.add('show-personal-notes');
  } else {
    document.body.classList.remove('show-personal-notes');
  }
  // Always ensure indicators exist (wrapper holds pencil, ad btn, and labels)
  applyNotesIndicators();
}

function applyLabelsState(show) {
  if (show) {
    document.body.classList.add('show-user-labels');
  } else {
    document.body.classList.remove('show-user-labels');
  }
}

function applyReportAdState(show) {
  if (show) {
    document.body.classList.add('show-report-ad');
  } else {
    document.body.classList.remove('show-report-ad');
  }
}

// Initialize
function init() {
  // Detect X theme for adaptive icon colors
  detectXTheme();

  chrome.storage.sync.get(['hideMetrics', 'showNotes', 'showLabels', 'showReportAd'], function(result) {
    const hideMetrics = result.hideMetrics !== false;
    const showNotes = result.showNotes !== false;
    const showLabels = result.showLabels !== false;
    const showReportAd = result.showReportAd !== false;

    applyMetricsState(hideMetrics);
    applyNotesState(showNotes);
    applyLabelsState(showLabels);
    applyReportAdState(showReportAd);
  });

  // Initialize notes system
  loadNotes();
}

// Run init
if (document.body) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

// Listen for setting changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.hideMetrics) {
    applyMetricsState(changes.hideMetrics.newValue);
  }
  if (changes.showNotes) {
    applyNotesState(changes.showNotes.newValue);
  }
  if (changes.showLabels) {
    applyLabelsState(changes.showLabels.newValue);
  }
  if (changes.showReportAd) {
    applyReportAdState(changes.showReportAd.newValue);
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'exportCSV') {
    exportNotesCSV();
  }
});

// Watch for DOM changes
let debounceTimer = null;
const observer = new MutationObserver(function(mutations) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    // Re-detect theme in case user switched X theme
    detectXTheme();

    // Always apply indicators - the wrapper holds pencil, ad btn, and labels
    // Each element's visibility is controlled independently via CSS body classes
    applyNotesIndicators();
  }, 300);
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
