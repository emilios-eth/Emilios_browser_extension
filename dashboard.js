// Dashboard script - runs in extension context

var SVG_ICONS = {
  delete02: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M19.5 5.5L18.613 15.412C18.381 17.929 18.265 19.187 17.535 19.971C17.369 20.148 17.183 20.306 16.982 20.441C16.124 21 14.862 21 12.338 21H11.662C9.138 21 7.876 21 7.018 20.441C6.817 20.306 6.631 20.148 6.465 19.971C5.735 19.187 5.619 17.929 5.387 15.412L4.5 5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 5.5H21M16.057 5.5L15.373 4.09C14.915 3.132 14.686 2.653 14.27 2.361C14.177 2.296 14.079 2.239 13.976 2.192C13.515 2 12.989 2 11.936 2C10.856 2 10.316 2 9.844 2.2C9.74 2.249 9.64 2.308 9.546 2.376C9.121 2.681 8.893 3.178 8.436 4.172L7.822 5.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.5 16.5V10.5M14.5 16.5V10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  filter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4 5.5C4 4.56 4 4.09 4.201 3.729C4.367 3.431 4.621 3.191 4.93 3.039C5.301 2.856 5.783 2.885 6.75 2.944L17.25 3.556C18.217 3.615 18.699 3.644 19.07 3.827C19.379 3.979 19.633 4.219 19.799 4.517C20 4.878 20 5.348 20 6.288V6.548C20 7.107 20 7.387 19.929 7.648C19.867 7.879 19.766 8.097 19.632 8.293C19.479 8.517 19.264 8.702 18.834 9.074L14.766 12.592C14.336 12.963 14.121 13.149 13.968 13.373C13.834 13.569 13.733 13.787 13.671 14.018C13.6 14.279 13.6 14.559 13.6 15.118V17.4C13.6 17.778 13.6 17.967 13.539 18.139C13.485 18.291 13.398 18.43 13.285 18.546C13.157 18.678 12.983 18.766 12.636 18.941L11.036 19.741C10.268 20.126 9.884 20.318 9.571 20.27C9.296 20.228 9.051 20.08 8.889 19.86C8.7 19.605 8.7 19.175 8.7 18.315V15.118C8.7 14.559 8.7 14.279 8.629 14.018C8.567 13.787 8.466 13.569 8.332 13.373C8.179 13.149 7.964 12.963 7.534 12.592L3.466 9.074C3.036 8.702 2.821 8.517 2.668 8.293C2.534 8.097 2.433 7.879 2.371 7.648C2.3 7.387 2.3 7.107 2.3 6.548V6.288C2.3 5.348 2.3 4.878 2.501 4.517" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  pencilEdit: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M16.425 4.605L17.415 3.615C18.235 2.795 19.565 2.795 20.385 3.615C21.205 4.435 21.205 5.765 20.385 6.585L19.395 7.575M16.425 4.605L9.766 11.264C9.258 11.772 8.898 12.408 8.724 13.104L8 16L10.896 15.276C11.592 15.102 12.228 14.742 12.736 14.234L19.395 7.575M16.425 4.605L19.395 7.575" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M19 13.5C19 16.787 19 18.431 18.092 19.538C17.926 19.74 17.74 19.926 17.538 20.092C16.431 21 14.787 21 11.5 21H11C7.229 21 5.343 21 4.172 19.828C3 18.657 3 16.771 3 13V12.5C3 9.213 3 7.569 3.908 6.462C4.074 6.26 4.26 6.074 4.462 5.908C5.569 5 7.213 5 10.5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  addCircle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M12 8V16M16 12H8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/></svg>',
  link04: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M13.5 17H17C19.761 17 22 14.761 22 12C22 9.239 19.761 7 17 7H13.5M10.5 7H7C4.239 7 2 9.239 2 12C2 14.761 4.239 17 7 17H10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9 12H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  recycle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M9 3.723C4.992 4.632 2 8.217 2 12.5C2 13.011 2.043 13.512 2.124 14M9 3.723L6 2.5M9 3.723L8 6.5M19.065 16.5C19.663 15.295 20 13.937 20 12.5C20 8.041 16.757 4.339 12.5 3.624M19.065 16.5L22 14.5M19.065 16.5L17.5 13.5M3.516 17.5C5.13 19.912 7.88 21.5 11 21.5C13.305 21.5 15.408 20.633 17 19.208M3.516 17.5H7M3.516 17.5V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  bot: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4 15.5C2.895 15.5 2 14.605 2 13.5C2 12.395 2.895 11.5 4 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M20 15.5C21.105 15.5 22 14.605 22 13.5C22 12.395 21.105 11.5 20 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7 7V4M17 7V4" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><circle cx="7" cy="3" r="1" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><circle cx="17" cy="3" r="1" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M13.5 7H10.5C7.672 7 6.257 7 5.379 7.909C4.5 8.818 4.5 10.281 4.5 13.207C4.5 16.133 4.5 17.596 5.379 18.505C6.257 19.414 7.672 19.414 10.5 19.414H11.525C12.317 19.414 12.596 19.577 13.142 20.171C13.745 20.828 14.679 21.705 15.524 21.909C16.725 22.199 16.86 21.798 16.592 20.653C16.516 20.327 16.325 19.806 16.526 19.502C16.639 19.332 16.826 19.29 17.201 19.206C17.792 19.074 18.28 18.858 18.621 18.505C19.5 17.596 19.5 16.133 19.5 13.207C19.5 10.281 19.5 8.818 18.621 7.909C17.743 7 16.328 7 13.5 7Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.5 15C10.07 15.607 10.978 16 12 16C13.022 16 13.93 15.607 14.5 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.009 11H9M15.009 11H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>',
  dashboard: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M10.5 8.75V6.75C10.5 5.106 10.5 4.284 10.046 3.731C9.963 3.63 9.87 3.537 9.769 3.454C9.216 3 8.394 3 6.75 3C5.106 3 4.284 3 3.731 3.454C3.63 3.537 3.537 3.63 3.454 3.731C3 4.284 3 5.106 3 6.75V8.75C3 10.394 3 11.216 3.454 11.769C3.537 11.87 3.63 11.963 3.731 12.046C4.284 12.5 5.106 12.5 6.75 12.5C8.394 12.5 9.216 12.5 9.769 12.046C9.87 11.963 9.963 11.87 10.046 11.769C10.5 11.216 10.5 10.394 10.5 8.75Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.75 15.5H5.75C5.052 15.5 4.703 15.5 4.419 15.586C3.78 15.78 3.28 16.28 3.086 16.919C3 17.203 3 17.552 3 18.25C3 18.948 3 19.297 3.086 19.581C3.28 20.22 3.78 20.72 4.419 20.914C4.703 21 5.052 21 5.75 21H7.75C8.448 21 8.797 21 9.081 20.914C9.72 20.72 10.22 20.22 10.414 19.581C10.5 19.297 10.5 18.948 10.5 18.25C10.5 17.552 10.5 17.203 10.414 16.919C10.22 16.28 9.72 15.78 9.081 15.586C8.797 15.5 8.448 15.5 7.75 15.5Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M21 17.25V15.25C21 13.606 21 12.784 20.546 12.231C20.463 12.13 20.37 12.037 20.269 11.954C19.716 11.5 18.894 11.5 17.25 11.5C15.606 11.5 14.784 11.5 14.231 11.954C14.13 12.037 14.037 12.13 13.954 12.231C13.5 12.784 13.5 13.606 13.5 15.25V17.25C13.5 18.894 13.5 19.716 13.954 20.269C14.037 20.37 14.13 20.463 14.231 20.546C14.784 21 15.606 21 17.25 21C18.894 21 19.716 21 20.269 20.546C20.37 20.463 20.463 20.37 20.546 20.269C21 19.716 21 18.894 21 17.25Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M18.25 3H16.25C15.552 3 15.203 3 14.919 3.086C14.28 3.28 13.78 3.78 13.586 4.419C13.5 4.703 13.5 5.052 13.5 5.75C13.5 6.448 13.5 6.797 13.586 7.081C13.78 7.72 14.28 8.22 14.919 8.414C15.203 8.5 15.552 8.5 16.25 8.5H18.25C18.948 8.5 19.297 8.5 19.581 8.414C20.22 8.22 20.72 7.72 20.914 7.081C21 6.797 21 6.448 21 5.75C21 5.052 21 4.703 20.914 4.419C20.72 3.78 20.22 3.28 19.581 3.086C19.297 3 18.948 3 18.25 3Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  evil: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M8 3.936L2 2L3.686 7.225C3.803 7.588 3.861 7.77 3.856 7.942C3.851 8.115 3.77 8.325 3.607 8.745C3.215 9.754 3 10.852 3 12C3 16.971 7.029 21 12 21C16.971 21 21 16.971 21 12C21 10.852 20.785 9.754 20.393 8.745C20.23 8.325 20.149 8.115 20.144 7.942C20.139 7.77 20.197 7.588 20.315 7.225L22 2L16 3.936M8 3.936C9.205 3.337 10.563 3 12 3C13.437 3 14.795 3.337 16 3.936M8 3.936C7.408 4.23 6.852 4.588 6.343 5M16 3.936C16.592 4.23 17.148 4.588 17.657 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9 16C9.836 16.628 10.874 17 12 17C13.126 17 14.164 16.628 15 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.009 11H9M15.009 11H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>',
  prisoner: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M18 7C16.329 6.372 14.251 6 12 6C9.749 6 7.671 6.372 6 7" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M7 7V8.725C7 10.518 7.921 12.18 9.428 13.103L9.942 13.418C11.209 14.194 12.791 14.194 14.058 13.418L14.573 13.103C16.079 12.18 17 10.518 17 8.725V7" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M7 8V5.956C7 4.611 7.921 3.365 9.428 2.673L9.942 2.437C11.209 1.855 12.791 1.855 14.058 2.437L14.573 2.673C16.079 3.365 17 4.611 17 5.956V8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M15 13L16 16M16 16L14.631 17.195C13.377 18.291 12.75 18.838 12 18.838C11.25 18.838 10.623 18.291 9.369 17.195L8 16M16 16L17.734 16.578C18.732 16.911 19.231 17.077 19.674 17.334C20.108 17.586 20.501 17.901 20.841 18.27C21.188 18.647 22 20 22 22M9 13L8 16M8 16L6.266 16.578C5.268 16.911 4.769 17.077 4.326 17.334C3.892 17.586 3.499 17.901 3.159 18.27C2.812 18.647 2 20 2 22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  tractor: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><circle cx="6.5" cy="16.5" r="4.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><circle cx="19" cy="18" r="3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M2 10.5C3.253 9.558 4.812 9 6.5 9C10.642 9 14 12.358 14 16.5C14 16.596 13.998 16.692 13.995 16.787C13.972 17.391 13.961 17.694 14.108 17.847C14.256 18 14.528 18 15.073 18H16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M13 9L16.106 9.582C18.447 10.021 19.617 10.241 20.309 11.074C21 11.907 21 13.105 21 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M20 12H19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M13 12.5V9.587C13 9.198 12.943 8.811 12.831 8.438L11.5 3M4 9V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 3H13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M18 9.5V8C18 6.895 18.895 6 20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7 9V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  receipt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4 18.646V8.054C4 5.2 4 3.773 4.879 2.887C5.757 2 7.172 2 10 2H14C16.828 2 18.243 2 19.121 2.887C20 3.773 20 5.2 20 8.054V18.646C20 20.158 20 20.913 19.538 21.211C18.783 21.697 17.616 20.677 17.029 20.307C16.544 20.001 16.302 19.849 16.033 19.84C15.742 19.83 15.495 19.977 14.971 20.307L13.06 21.512C12.545 21.837 12.287 22 12 22C11.713 22 11.455 21.837 10.94 21.512L9.029 20.307C8.544 20.001 8.302 19.849 8.033 19.84C7.742 19.83 7.495 19.977 6.971 20.307C6.384 20.677 5.217 21.697 4.462 21.211C4 20.913 4 20.158 4 18.646Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M11 11H8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14 7L8 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  canvas: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4 8C4 5.17157 4 3.75736 5.00421 2.87868C6.00841 2 7.62465 2 10.8571 2H13.1429C16.3753 2 17.9916 2 18.9958 2.87868C20 3.75736 20 5.17157 20 8V17H4V8Z" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 17H21" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M10.6987 5.56588C11.9289 5.38957 13.9674 5.4601 12.2803 7.15266C10.1715 9.26836 7.00837 14.0289 10.6987 12.4421C14.3891 10.8554 15.9709 11.9132 14.3893 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 17V21" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M5 22L8 17" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M19 22L16 17" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>',
  informationDiamond: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M21.5 12.6863V11.3137C21.5 9.67871 21.5 8.8612 21.1955 8.12612C20.891 7.39104 20.313 6.81297 19.1569 5.65685L18.3431 4.84315C17.187 3.68702 16.609 3.10896 15.8739 2.80448C15.1388 2.5 14.3213 2.5 12.6863 2.5H11.3137C9.67871 2.5 8.8612 2.5 8.12612 2.80448C7.39104 3.10896 6.81297 3.68702 5.65685 4.84315L4.84315 5.65685C3.68702 6.81298 3.10896 7.39104 2.80448 8.12612C2.5 8.8612 2.5 9.67871 2.5 11.3137V12.6863C2.5 14.3213 2.5 15.1388 2.80448 15.8739C3.10896 16.609 3.68702 17.187 4.84315 18.3431L5.65685 19.1569C6.81297 20.313 7.39104 20.891 8.12612 21.1955C8.8612 21.5 9.67871 21.5 11.3137 21.5H12.6863C14.3213 21.5 15.1388 21.5 15.8739 21.1955C16.609 20.891 17.187 20.313 18.3431 19.1569L19.1569 18.3431C20.313 17.187 20.891 16.609 21.1955 15.8739C21.5 15.1388 21.5 14.3213 21.5 12.6863Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 16L12 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M12 8.01172V8.00172" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
  fire: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  brain02: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M4.22222 21.9948V18.4451C4.22222 17.1737 3.88927 16.5128 3.23482 15.4078C2.4503 14.0833 2 12.5375 2 10.8866C2 5.97866 5.97969 2 10.8889 2C15.7981 2 19.7778 5.97866 19.7778 10.8866C19.7778 11.4663 19.7778 11.7562 19.802 11.9187C19.8598 12.3072 20.0411 12.6414 20.2194 12.9873L22 16.4407L20.6006 17.1402C20.195 17.3429 19.9923 17.4443 19.851 17.6314C19.7097 17.8184 19.67 18.0296 19.5904 18.4519L19.5826 18.4931C19.4004 19.4606 19.1993 20.5286 18.6329 21.2024C18.4329 21.4403 18.1853 21.6336 17.9059 21.7699C17.4447 21.9948 16.8777 21.9948 15.7437 21.9948C15.219 21.9948 14.6928 22.0069 14.1682 21.9942C12.9247 21.9639 12 20.9184 12 19.7044" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.388 10.5315C13.9617 10.5315 13.5729 10.3702 13.2784 10.1048M14.388 10.5315C14.388 11.6774 13.7241 12.7658 12.4461 12.7658C11.1681 12.7658 10.5043 13.8541 10.5043 15M14.388 10.5315C16.5373 10.5315 16.5373 7.18017 14.388 7.18017C14.1927 7.18017 14.0053 7.21403 13.8312 7.27624C13.9362 4.77819 10.3349 4.1 9.51923 6.44018M10.5043 8.29729C10.5043 7.52323 10.1133 6.8411 9.51923 6.44018M9.51923 6.44018C7.66742 5.19034 5.19883 7.4331 6.37324 9.43277C4.40226 9.72827 4.61299 12.7658 6.6205 12.7658C7.18344 12.7658 7.68111 12.4844 7.98234 12.0538" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  chefHat: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M18 13C20.2091 13 22 11.2091 22 9C22 6.79086 20.2091 5 18 5C17.1767 5 16.4115 5.24874 15.7754 5.67518M6 13C3.79086 13 2 11.2091 2 9C2 6.79086 3.79086 5 6 5C6.82332 5 7.58854 5.24874 8.22461 5.67518M15.7754 5.67518C15.2287 4.11714 13.7448 3 12 3C10.2552 3 8.77132 4.11714 8.22461 5.67518M15.7754 5.67518C15.9209 6.08981 16 6.53566 16 7C16 7.3453 15.9562 7.68038 15.874 8M9.46487 7C9.15785 6.46925 8.73238 6.0156 8.22461 5.67518" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M6 17.5C7.59905 16.8776 9.69952 16.5 12 16.5C14.3005 16.5 16.401 16.8776 18 17.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M5 21C6.86556 20.3776 9.3161 20 12 20C14.6839 20 17.1344 20.3776 19 21" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M18 12V20M6 12V20" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>',
  aiBook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M12.3077 12L10.847 7.47891C10.7552 7.19466 10.4734 7 10.1538 7C9.83425 7 9.55249 7.19466 9.46066 7.47891L8 12M15 7V12M8.53846 10.5H11.7692" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  advertisiment: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M5.506 16.992L8.031 10.029C8.491 9.062 9.193 8.263 9.998 10.18C10.741 11.95 11.849 15.19 12.503 16.995M6.653 14.002H11.322" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3.464 5.318C2 6.636 2 8.757 2 13C2 17.243 2 19.364 3.464 20.682C4.929 22 7.286 22 12 22C16.714 22 19.071 22 20.536 20.682C22 19.364 22 17.243 22 13C22 8.757 22 6.636 20.536 5.318C19.071 4 16.714 4 12 4C7.286 4 4.929 4 3.464 5.318Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M18.484 9.987V12.982M18.484 12.982V16.925M18.484 12.982H16.466C16.226 12.982 15.989 13.026 15.765 13.113C14.071 13.77 14.071 16.212 15.765 16.87C15.989 16.957 16.226 17.001 16.466 17.001H18.484" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  student: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M19 5L12 2L5 5L8.5 6.5V8.5C8.5 8.5 9.66667 8 12 8C14.3333 8 15.5 8.5 15.5 8.5V6.5L19 5ZM19 5V9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M15.5 8.5V9.5C15.5 11.433 13.933 13 12 13C10.067 13 8.5 11.433 8.5 9.5V8.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.78256 16.7033C6.68218 17.3878 3.79706 18.7854 5.55429 20.5342C6.41269 21.3885 7.36872 21.9995 8.57068 21.9995H15.4293C16.6313 21.9995 17.5873 21.3885 18.4457 20.5342C20.2029 18.7854 17.3178 17.3878 16.2174 16.7033C13.6371 15.0982 10.3629 15.0982 7.78256 16.7033Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  smile: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8.00897 9L8 9M16 9L15.991 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>',
  idea01: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M6.08938 14.9992C5.71097 14.1486 5.5 13.2023 5.5 12.2051C5.5 8.50154 8.41015 5.49921 12 5.49921C15.5899 5.49921 18.5 8.50154 18.5 12.2051C18.5 13.2023 18.289 14.1486 17.9106 14.9992" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M12 1.99921V2.99921" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M22 11.9992H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M3 11.9992H2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M19.0704 4.92792L18.3633 5.63503" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M5.6368 5.636L4.92969 4.92889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.517 19.3056C15.5274 18.9788 15.9326 18.054 16.0466 17.1238C16.0806 16.8459 15.852 16.6154 15.572 16.6154L8.47685 16.6156C8.18725 16.6156 7.95467 16.8614 7.98925 17.1489C8.1009 18.0773 8.3827 18.7555 9.45345 19.3056M14.517 19.3056C14.517 19.3056 9.62971 19.3056 9.45345 19.3056M14.517 19.3056C14.3955 21.2506 13.8338 22.0209 12.0068 21.9993C10.0526 22.0354 9.60303 21.0833 9.45345 19.3056" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>',
  commentAdd02: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none"><path d="M14 6H22M18 2L18 10" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M6.09881 19.5C4.7987 19.3721 3.82475 18.9816 3.17157 18.3284C2 17.1569 2 15.2712 2 11.5V11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H11.5M6.5 18C6.29454 19.0019 5.37769 21.1665 6.31569 21.8651C6.806 22.2218 7.58729 21.8408 9.14987 21.0789C10.2465 20.5441 11.3562 19.9309 12.5546 19.655C12.9931 19.5551 13.4395 19.5125 14 19.5C17.7712 19.5 19.6569 19.5 20.8284 18.3284C21.947 17.2098 21.9976 15.4403 21.9999 12" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg>'
};

var LABELS = [
  { id: 'pond', text: 'Engagement Farmer', color: '#f4212e', icon: SVG_ICONS.tractor },
  { id: 'bot', text: 'Bot', color: '#f4212e', icon: SVG_ICONS.bot },
  { id: 'billboard', text: 'Walking Billboard', color: '#f4212e', icon: SVG_ICONS.dashboard },
  { id: 'grifter', text: 'Grifter', color: '#f4212e', icon: SVG_ICONS.evil },
  { id: 'thief', text: 'Content Thief', color: '#f4212e', icon: SVG_ICONS.prisoner },
  { id: 'niche_authority', text: 'Niche Authority', color: '#00ba7c', icon: SVG_ICONS.student },
  { id: 'good_person', text: 'Good Person', color: '#00ba7c', icon: SVG_ICONS.smile },
  { id: 'insightful_acc', text: 'Insightful', color: '#00ba7c', icon: SVG_ICONS.idea01 },
  { id: 'opinion_leader', text: 'Opinion Leader', color: '#00ba7c', icon: SVG_ICONS.commentAdd02 }
  // RECEIPTS is automatic based on screenshot presence
];

var POST_LABELS = [
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

// Label descriptions for tooltips (referenced by LABELS[].text)

// State
var allData = [];
var sortOrder = 'desc';
var filters = { handle: '', countMin: null, countMax: null, labels: [], notes: '', postLabels: [] };
var undoStack = []; // Stack of previous states for undo

// Initialize
function init() {
  buildLabelFilterOptions();
  setupEventListeners();
  loadData();
}

// ===== NOTES PER DAY CHART =====
function buildChart(data) {
  var canvas = document.getElementById('notesChart');
  if (!canvas) return;
  var container = canvas.parentElement;
  var tooltip = document.getElementById('chartTooltip');

  // Count notes per day
  var dayCounts = {};
  data.forEach(function(row) {
    if (!row.noteDate) return;
    var d = new Date(row.noteDate);
    if (isNaN(d.getTime())) return;
    var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    dayCounts[key] = (dayCounts[key] || 0) + 1;
  });

  var sortedDays = Object.keys(dayCounts).sort();
  if (sortedDays.length === 0) {
    // No data — draw empty state
    var ctx = canvas.getContext('2d');
    canvas.width = container.offsetWidth * 2;
    canvas.height = container.offsetHeight * 2;
    ctx.scale(2, 2);
    var w = container.offsetWidth, h = container.offsetHeight;
    ctx.fillStyle = '#71767b';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No dated records yet', w / 2, h / 2);
    return;
  }

  // Fill in missing days between first and last
  var allDays = [];
  var start = new Date(sortedDays[0] + 'T00:00:00');
  var end = new Date(sortedDays[sortedDays.length - 1] + 'T00:00:00');
  for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    allDays.push({ date: key, count: dayCounts[key] || 0 });
  }

  // Limit to last 30 days if too many
  if (allDays.length > 30) {
    allDays = allDays.slice(allDays.length - 30);
  }

  var values = allDays.map(function(d) { return d.count; });
  var maxVal = Math.max.apply(null, values) || 1;

  // High-DPI canvas
  var dpr = window.devicePixelRatio || 1;
  var w = container.offsetWidth;
  var h = container.offsetHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  var padLeft = 30, padRight = 10, padTop = 10, padBottom = 30;
  var chartW = w - padLeft - padRight;
  var chartH = h - padTop - padBottom;
  var stepX = allDays.length > 1 ? chartW / (allDays.length - 1) : chartW;

  // Clear
  ctx.clearRect(0, 0, w, h);

  // Y-axis gridlines
  ctx.strokeStyle = 'rgba(56, 68, 77, 0.5)';
  ctx.lineWidth = 0.5;
  var ySteps = Math.min(maxVal, 4);
  for (var i = 0; i <= ySteps; i++) {
    var y = padTop + chartH - (i / ySteps) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - padRight, y);
    ctx.stroke();
    // Y labels
    ctx.fillStyle = '#71767b';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(i / ySteps * maxVal), padLeft - 5, y + 3);
  }

  // X-axis labels (show ~5-7 labels max)
  ctx.fillStyle = '#71767b';
  ctx.font = '9px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  var labelInterval = Math.max(1, Math.floor(allDays.length / 6));
  for (var i = 0; i < allDays.length; i += labelInterval) {
    var x = padLeft + i * stepX;
    var parts = allDays[i].date.split('-');
    ctx.fillText(parts[2] + '/' + parts[1], x, h - padBottom + 15);
  }
  // Always show last label
  if ((allDays.length - 1) % labelInterval !== 0) {
    var x = padLeft + (allDays.length - 1) * stepX;
    var parts = allDays[allDays.length - 1].date.split('-');
    ctx.fillText(parts[2] + '/' + parts[1], x, h - padBottom + 15);
  }

  // Draw filled area
  ctx.beginPath();
  ctx.moveTo(padLeft, padTop + chartH);
  for (var i = 0; i < allDays.length; i++) {
    var x = padLeft + i * stepX;
    var y = padTop + chartH - (allDays[i].count / maxVal) * chartH;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(padLeft + (allDays.length - 1) * stepX, padTop + chartH);
  ctx.closePath();
  var grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
  grad.addColorStop(0, 'rgba(29, 155, 240, 0.25)');
  grad.addColorStop(1, 'rgba(29, 155, 240, 0.02)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw line
  ctx.beginPath();
  ctx.strokeStyle = '#1d9bf0';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  for (var i = 0; i < allDays.length; i++) {
    var x = padLeft + i * stepX;
    var y = padTop + chartH - (allDays[i].count / maxVal) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Draw dots
  var dotPositions = [];
  for (var i = 0; i < allDays.length; i++) {
    var x = padLeft + i * stepX;
    var y = padTop + chartH - (allDays[i].count / maxVal) * chartH;
    dotPositions.push({ x: x, y: y, date: allDays[i].date, count: allDays[i].count });
    if (allDays[i].count > 0) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#1d9bf0';
      ctx.fill();
      ctx.strokeStyle = '#15202b';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // Interactive tooltip on hover
  canvas.onmousemove = function(e) {
    var rect = canvas.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var closest = null, minDist = Infinity;
    for (var i = 0; i < dotPositions.length; i++) {
      var dist = Math.abs(dotPositions[i].x - mx);
      if (dist < minDist) { minDist = dist; closest = dotPositions[i]; }
    }
    if (closest && minDist < 30) {
      var parts = closest.date.split('-');
      tooltip.innerHTML = '<strong>' + parts[2] + '/' + parts[1] + '/' + parts[0] + '</strong><br>' + closest.count + ' record' + (closest.count !== 1 ? 's' : '');
      tooltip.style.display = 'block';
      tooltip.style.left = closest.x + 'px';
      tooltip.style.top = (closest.y - 2) + 'px';
    } else {
      tooltip.style.display = 'none';
    }
  };
  canvas.onmouseleave = function() { tooltip.style.display = 'none'; };
}

function buildLabelFilterOptions() {
  var html = '';
  LABELS.forEach(function(l) {
    html += '<label><input type="checkbox" value="' + l.id + '"> <span class="legend-badge" style="background:' + l.color + '">' + l.icon + ' ' + l.text + '</span></label>';
  });
  document.getElementById('labelFilterOptions').innerHTML = html;

  // Build post-level label filter options
  var postHtml = '';
  POST_LABELS.forEach(function(l) {
    postHtml += '<label><input type="checkbox" value="' + l.id + '"> <span class="legend-badge" style="background:' + l.color + '">' + l.icon + ' ' + l.text + '</span></label>';
  });
  document.getElementById('postLabelFilterOptions').innerHTML = postHtml;
}

function setupEventListeners() {
  // Refresh
  document.getElementById('refreshBtn').onclick = loadData;

  // Undo button
  document.getElementById('undoBtn').onclick = undoLastAction;

  // Reset all filters
  document.getElementById('resetFiltersBtn').onclick = resetAllFilters;

  // Handle search (instant)
  document.getElementById('handleSearch').addEventListener('input', function() {
    filters.handle = this.value.toLowerCase().replace('@', '');
    applyFilters();
  });

  // Filter popups - toggle on click
  document.getElementById('filterCount').onclick = function(e) {
    e.stopPropagation();
    togglePopup('filterCountPopup');
  };
  document.getElementById('filterLabels').onclick = function(e) {
    e.stopPropagation();
    togglePopup('filterLabelsPopup');
  };
  document.getElementById('filterNotes').onclick = function(e) {
    e.stopPropagation();
    togglePopup('filterNotesPopup');
  };

  // Filter Apply/Reset buttons - PROPER EVENT BINDING
  document.getElementById('applyCountBtn').onclick = applyCountFilter;
  document.getElementById('resetCountBtn').onclick = resetCountFilter;
  document.getElementById('applyLabelsBtn').onclick = applyLabelFilter;
  document.getElementById('resetLabelsBtn').onclick = resetLabelFilter;
  document.getElementById('applyNotesBtn').onclick = applyNotesFilter;
  document.getElementById('resetNotesBtn').onclick = resetNotesFilter;

  // Sort by date
  document.getElementById('sortDate').onclick = toggleSort;

  // Modal close
  document.getElementById('modalClose').onclick = closeModal;
  document.getElementById('imageModal').onclick = function(e) {
    if (e.target === this) closeModal();
  };

  // Close popups when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.filter-popup') && !e.target.classList.contains('filter-icon')) {
      closeAllPopups();
    }
    if (!e.target.closest('.label-picker') && !e.target.closest('.label') && !e.target.closest('.post-tag-add') && !e.target.closest('.post-tag')) {
      closeLabelPicker();
      closePostLabelPicker();
    }
  });

  // Export/Import buttons
  document.getElementById('exportBtn').onclick = exportBackup;
  document.getElementById('importBtn').onclick = function() {
    document.getElementById('importFile').click();
  };
  document.getElementById('importFile').onchange = importBackup;

  // Auto backup toggle button
  var autoBackupBtn = document.getElementById('autoBackupBtn');
  chrome.storage.sync.get(['autoBackup'], function(result) {
    var enabled = result.autoBackup !== false;
    autoBackupBtn.classList.toggle('fab-active', enabled);
    autoBackupBtn.dataset.tooltip = enabled ? 'Auto backup: ON' : 'Auto backup: OFF';
  });
  autoBackupBtn.onclick = function() {
    chrome.storage.sync.get(['autoBackup'], function(result) {
      var enabled = result.autoBackup !== false;
      var newVal = !enabled;
      chrome.storage.sync.set({ autoBackup: newVal }, function() {
        autoBackupBtn.classList.toggle('fab-active', newVal);
        autoBackupBtn.dataset.tooltip = newVal ? 'Auto backup: ON' : 'Auto backup: OFF';
      });
    });
  };
}

// Export all notes to JSON file
function exportBackup() {
  chrome.storage.local.get(['userNotes'], function(result) {
    var notes = result.userNotes || {};
    var dataStr = JSON.stringify(notes, null, 2);
    var blob = new Blob([dataStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = 'rcrd-backup-' + date + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showStatus('Backup exported!');
  });
}

// Import notes from JSON file
function importBackup(e) {
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(event) {
    try {
      var importedNotes = JSON.parse(event.target.result);

      // Validate structure
      if (typeof importedNotes !== 'object') {
        showStatus('Invalid backup file');
        return;
      }

      // Ask user how to handle import
      var choice = confirm('How do you want to import?\n\nOK = Merge with existing records\nCancel = Replace all records (WARNING: deletes current records)');

      if (choice) {
        // Merge: combine imported with existing
        chrome.storage.local.get(['userNotes'], function(result) {
          var existing = result.userNotes || {};

          // Merge each user
          for (var handle in importedNotes) {
            if (existing[handle]) {
              // Merge entries
              var existingEntries = existing[handle].entries || [];
              var importedEntries = importedNotes[handle].entries || [];

              // Add imported entries that don't exist
              importedEntries.forEach(function(entry) {
                var exists = existingEntries.some(function(e) {
                  return e.text === entry.text && e.date === entry.date;
                });
                if (!exists) {
                  existingEntries.push(entry);
                }
              });

              existing[handle].entries = existingEntries;

              // Merge labels
              var existingLabels = existing[handle].labels || [];
              var importedLabels = importedNotes[handle].labels || [];
              importedLabels.forEach(function(label) {
                if (existingLabels.indexOf(label) === -1) {
                  existingLabels.push(label);
                }
              });
              existing[handle].labels = existingLabels;
            } else {
              // New user, add entirely
              existing[handle] = importedNotes[handle];
            }
          }

          chrome.storage.local.set({ userNotes: existing }, function() {
            showStatus('Backup merged!');
            loadData();
          });
        });
      } else {
        // Replace: overwrite everything
        saveStateForUndo(function() {
          chrome.storage.local.set({ userNotes: importedNotes }, function() {
            showStatus('Backup restored!');
            loadData();
          });
        });
      }
    } catch (err) {
      showStatus('Error reading file: ' + err.message);
    }
  };
  reader.readAsText(file);

  // Reset file input so same file can be selected again
  e.target.value = '';
}

function togglePopup(id) {
  var el = document.getElementById(id);
  var wasShown = el.classList.contains('show');
  closeAllPopups();
  if (!wasShown) {
    el.classList.add('show');
  }
}

function closeAllPopups() {
  document.querySelectorAll('.filter-popup').forEach(function(p) { p.classList.remove('show'); });
}

function toggleSort() {
  sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
  document.getElementById('sortDate').textContent = sortOrder === 'desc' ? '▼' : '▲';
  renderTable();
}

// Filter functions
function applyCountFilter() {
  var min = document.getElementById('countMin').value;
  var max = document.getElementById('countMax').value;
  filters.countMin = min ? parseInt(min) : null;
  filters.countMax = max ? parseInt(max) : null;
  document.getElementById('filterCount').classList.toggle('active', filters.countMin !== null || filters.countMax !== null);
  closeAllPopups();
  applyFilters();
}

function resetCountFilter() {
  document.getElementById('countMin').value = '';
  document.getElementById('countMax').value = '';
  filters.countMin = null;
  filters.countMax = null;
  document.getElementById('filterCount').classList.remove('active');
  closeAllPopups();
  applyFilters();
}

function applyLabelFilter() {
  filters.labels = [];
  document.querySelectorAll('#labelFilterOptions input:checked').forEach(function(cb) {
    filters.labels.push(cb.value);
  });
  document.getElementById('filterLabels').classList.toggle('active', filters.labels.length > 0);
  closeAllPopups();
  applyFilters();
}

function resetLabelFilter() {
  document.querySelectorAll('#labelFilterOptions input').forEach(function(cb) { cb.checked = false; });
  filters.labels = [];
  document.getElementById('filterLabels').classList.remove('active');
  closeAllPopups();
  applyFilters();
}

function applyNotesFilter() {
  filters.notes = document.getElementById('notesFilter').value.toLowerCase();
  // Also read post-label filter checkboxes
  filters.postLabels = [];
  document.querySelectorAll('#postLabelFilterOptions input:checked').forEach(function(cb) {
    filters.postLabels.push(cb.value);
  });
  var isActive = filters.notes.length > 0 || filters.postLabels.length > 0;
  document.getElementById('filterNotes').classList.toggle('active', isActive);
  closeAllPopups();
  applyFilters();
}

function resetNotesFilter() {
  document.getElementById('notesFilter').value = '';
  filters.notes = '';
  filters.postLabels = [];
  document.querySelectorAll('#postLabelFilterOptions input').forEach(function(cb) { cb.checked = false; });
  document.getElementById('filterNotes').classList.remove('active');
  closeAllPopups();
  applyFilters();
}

function resetAllFilters() {
  document.getElementById('handleSearch').value = '';
  document.getElementById('countMin').value = '';
  document.getElementById('countMax').value = '';
  document.getElementById('notesFilter').value = '';
  document.querySelectorAll('#labelFilterOptions input').forEach(function(cb) { cb.checked = false; });
  document.querySelectorAll('#postLabelFilterOptions input').forEach(function(cb) { cb.checked = false; });
  filters = { handle: '', countMin: null, countMax: null, labels: [], notes: '', postLabels: [] };
  document.querySelectorAll('.filter-icon').forEach(function(i) { i.classList.remove('active'); });
  applyFilters();
  showStatus('Filters reset');
}

function applyFilters() {
  renderTable();
}

// Data functions
function loadData() {
  chrome.storage.local.get(['userNotes'], function(result) {
    var storedNotes = result.userNotes || {};
    allData = [];
    var totalUsers = 0;
    var totalNotes = 0;

    for (var handle in storedNotes) {
      totalUsers++;
      var data = storedNotes[handle];
      var entries = [], labels = [], legacyScreenshots = [];

      var displayName = null;
      var avatarUrl = null;
      if (Array.isArray(data)) {
        entries = data;
      } else if (typeof data === 'string') {
        entries = [{ text: data, date: null }];
      } else if (data && typeof data === 'object') {
        entries = data.entries || (data.text ? [data] : []);
        labels = data.labels || [];
        legacyScreenshots = data.screenshots || [];
        displayName = data.displayName || null;
        avatarUrl = data.avatarUrl || null;
      }

      totalNotes += entries.length;

      // Check if user has any screenshots (for auto RECEIPTS label)
      var userHasScreenshots = legacyScreenshots.length > 0;

      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var url = extractUrl(e.text);
        var cleanText = removeUrl(e.text);
        var screenshot = e.screenshot || (legacyScreenshots[i] ? (legacyScreenshots[i].data || legacyScreenshots[i]) : null);

        if (screenshot) userHasScreenshots = true;

        allData.push({
          handle: handle,
          displayName: displayName,
          avatarUrl: avatarUrl,
          labels: labels,
          noteText: cleanText,
          originalText: e.text,
          noteDate: e.date,
          postUrl: url,
          screenshot: screenshot,
          noteCount: entries.length,
          entryIndex: i,
          legacyScreenshots: (i === 0) ? legacyScreenshots : [],
          hasScreenshots: userHasScreenshots,
          postLabels: e.postLabels || []
        });
      }

      if (entries.length === 0 && (labels.length > 0 || legacyScreenshots.length > 0)) {
        allData.push({
          handle: handle,
          displayName: displayName,
          avatarUrl: avatarUrl,
          labels: labels,
          noteText: '-',
          noteDate: null,
          postUrl: null,
          screenshot: legacyScreenshots[0] ? (legacyScreenshots[0].data || legacyScreenshots[0]) : null,
          noteCount: 0,
          entryIndex: -1,
          legacyScreenshots: legacyScreenshots,
          hasScreenshots: legacyScreenshots.length > 0,
          postLabels: []
        });
      }
    }

    document.getElementById('userCount').textContent = totalUsers;
    document.getElementById('noteCount').textContent = totalNotes;
    buildChart(allData);
    renderTable();
    showStatus('Loaded');
  });
}

function renderTable() {
  var filtered = filterData(allData);
  var sorted = sortData(filtered);
  var grouped = groupByUser(sorted);

  var tb = document.getElementById('tb');
  var html = '';

  grouped.forEach(function(row, idx) {
    // Build labels HTML - show manual labels + auto RECEIPTS if has screenshots
    var labelsHtml = '';
    if (row.isFirstForUser) {
      labelsHtml = '<div class="labels-wrap">';
      // Manual labels
      row.labels.forEach(function(lid) {
        if (lid === 'receipts') return;
        var l = LABELS.find(function(x) { return x.id === lid; });
        if (l) {
          labelsHtml += '<span class="label" style="background:' + l.color + '" data-handle="' + row.handle + '" data-label="' + l.id + '">' + l.icon + ' ' + l.text + '</span>';
        }
      });
      // Add label button
      labelsHtml += '<span class="label label-add" data-handle="' + row.handle + '" title="Add/remove labels">' + SVG_ICONS.addCircle + '</span>';
      labelsHtml += '</div>';
    }

    // Note text with inline edit button (pencil icon)
    var noteHtml = escapeHtml(row.noteText) || '-';
    var editBtnHtml = '';
    if (row.entryIndex >= 0) {
      editBtnHtml = '<button class="edit-btn" data-handle="' + row.handle + '" data-index="' + row.entryIndex + '" title="Edit">' + SVG_ICONS.pencilEdit + '</button>';
    }

    // Post-level tags display
    var postTagsHtml = '';
    if (row.postLabels && row.postLabels.length > 0) {
      postTagsHtml = '<div class="post-tags-wrap">';
      row.postLabels.forEach(function(plId) {
        var pl = POST_LABELS.find(function(x) { return x.id === plId; });
        if (pl) {
          postTagsHtml += '<span class="post-tag" style="background:' + pl.color + '" data-handle="' + row.handle + '" data-index="' + row.entryIndex + '" data-post-label="' + pl.id + '" title="' + pl.text + '">' + pl.icon + ' ' + pl.text + '</span>';
        }
      });
      postTagsHtml += '<span class="post-tag-add" data-handle="' + row.handle + '" data-index="' + row.entryIndex + '" title="Add/remove post tags">' + SVG_ICONS.addCircle + '</span>';
      postTagsHtml += '</div>';
    } else if (row.entryIndex >= 0) {
      postTagsHtml = '<div class="post-tags-wrap"><span class="post-tag-add" data-handle="' + row.handle + '" data-index="' + row.entryIndex + '" title="Add/remove post tags">' + SVG_ICONS.addCircle + '</span></div>';
    }

    var refHtml = row.postUrl ? '<a href="' + row.postUrl + '" target="_blank" class="ref-link" title="View post">' + SVG_ICONS.link04 + '</a>' : '-';

    var receiptHtml = '-';
    if (row.screenshot) {
      receiptHtml = '<span class="receipt-icon" data-screenshot="' + idx + '" title="View receipt">' + SVG_ICONS.receipt + '</span>';
    } else if (row.isFirstForUser && row.legacyScreenshots && row.legacyScreenshots.length > 0) {
      receiptHtml = '<span class="receipt-icon" data-screenshot="' + idx + '" title="View receipts (' + row.legacyScreenshots.length + ')">' + SVG_ICONS.receipt + '</span>';
    }

    var dateHtml = formatDate(row.noteDate);
    var countHtml = row.isFirstForUser ? '<span class="count-text">' + row.noteCount + '</span>' : '';
    var handleHtml = '';
    if (row.isFirstForUser) {
      var displayName = row.displayName || row.handle;
      handleHtml = '<a href="https://x.com/' + row.handle + '" target="_blank" class="handle-link">' +
        '<span class="user-name">' + escapeHtml(displayName) + '</span>' +
        '<span class="user-handle">@' + row.handle + '</span>' +
        '</a>';
    }

    // Delete button only in last column
    var deleteHtml = '';
    if (row.entryIndex >= 0) {
      deleteHtml = '<button class="delete-btn" data-handle="' + row.handle + '" data-index="' + row.entryIndex + '" title="Delete">' + SVG_ICONS.delete02 + '</button>';
    } else if (row.isFirstForUser) {
      deleteHtml = '<button class="delete-btn" data-handle="' + row.handle + '" data-action="deleteUser" title="Delete user">' + SVG_ICONS.delete02 + '</button>';
    }

    var rowClass = row.isFirstForUser ? 'user-first' : '';
    html += '<tr class="' + rowClass + '" data-row-idx="' + idx + '">' +
      '<td class="col-count">' + countHtml + '</td>' +
      '<td class="col-handle">' + handleHtml + '</td>' +
      '<td class="col-labels">' + labelsHtml + '</td>' +
      '<td class="col-notes"><div class="note-cell"><span class="note-text" data-original-text="' + escapeHtml(row.originalText || row.noteText) + '">' + noteHtml + '</span>' + editBtnHtml + '</div>' + postTagsHtml + '</td>' +
      '<td class="col-ref">' + refHtml + '</td>' +
      '<td class="col-receipts">' + receiptHtml + '</td>' +
      '<td class="col-date">' + dateHtml + '</td>' +
      '<td class="col-delete">' + deleteHtml + '</td>' +
      '</tr>';
  });

  tb.innerHTML = html || '<tr><td colspan="8" class="no-data">No records yet</td></tr>';

  // Store grouped data for reference
  window.groupedData = grouped;

  // Bind events
  bindTableEvents();
}

function bindTableEvents() {
  // Receipt icons (click to view)
  document.querySelectorAll('.receipt-icon').forEach(function(el) {
    el.onclick = function() {
      var idx = parseInt(this.dataset.screenshot);
      var row = window.groupedData[idx];
      if (row) {
        var src = row.screenshot;
        if (!src && row.legacyScreenshots && row.legacyScreenshots.length > 0) {
          src = row.legacyScreenshots[0].data || row.legacyScreenshots[0];
        }
        if (src) showModal(src);
      }
    };
  });

  // Edit buttons (in notes column) — inline editing
  document.querySelectorAll('.edit-btn').forEach(function(btn) {
    btn.onclick = function() {
      var handle = this.dataset.handle;
      var index = parseInt(this.dataset.index);
      startInlineEdit(this, handle, index);
    };
  });

  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(function(btn) {
    btn.onclick = function() {
      var handle = this.dataset.handle;
      var action = this.dataset.action;
      if (action === 'deleteUser') {
        deleteUser(handle);
      } else {
        var index = parseInt(this.dataset.index);
        deleteEntry(handle, index);
      }
    };
  });

  // Label clicks - NO CONFIRMATION for removal
  document.querySelectorAll('.label').forEach(function(el) {
    el.onclick = function(e) {
      e.stopPropagation();
      var handle = this.dataset.handle;
      if (this.classList.contains('label-add')) {
        showLabelPicker(handle, this);
      } else if (this.dataset.label) {
        // Remove label directly - NO confirmation
        toggleUserLabel(handle, this.dataset.label);
      }
      // Auto RECEIPTS labels have no data-label, so clicking them does nothing
    };
  });

  // Post-tag add buttons (open picker)
  document.querySelectorAll('.post-tag-add').forEach(function(el) {
    el.onclick = function(e) {
      e.stopPropagation();
      var handle = this.dataset.handle;
      var index = parseInt(this.dataset.index);
      showPostLabelPicker(handle, index, this);
    };
  });

  // Post-tag clicks (remove directly)
  document.querySelectorAll('.post-tag').forEach(function(el) {
    el.onclick = function(e) {
      e.stopPropagation();
      var handle = this.dataset.handle;
      var index = parseInt(this.dataset.index);
      var postLabel = this.dataset.postLabel;
      toggleEntryPostLabel(handle, index, postLabel);
    };
  });
}

function filterData(data) {
  return data.filter(function(row) {
    if (filters.handle && row.handle.toLowerCase().indexOf(filters.handle) === -1) return false;
    if (filters.countMin !== null && row.noteCount < filters.countMin) return false;
    if (filters.countMax !== null && row.noteCount > filters.countMax) return false;
    if (filters.labels.length > 0) {
      var hasLabel = filters.labels.some(function(l) {
        return row.labels.indexOf(l) >= 0;
      });
      if (!hasLabel) return false;
    }
    if (filters.notes && row.noteText.toLowerCase().indexOf(filters.notes) === -1) return false;
    if (filters.postLabels.length > 0) {
      var hasPostLabel = filters.postLabels.some(function(pl) {
        return row.postLabels && row.postLabels.indexOf(pl) >= 0;
      });
      if (!hasPostLabel) return false;
    }
    return true;
  });
}

function sortData(data) {
  return data.slice().sort(function(a, b) {
    var dateA = a.noteDate ? new Date(a.noteDate).getTime() : 0;
    var dateB = b.noteDate ? new Date(b.noteDate).getTime() : 0;
    return sortOrder === 'desc' ? (dateB - dateA) : (dateA - dateB);
  });
}

function groupByUser(data) {
  var grouped = [];
  var userGroups = {};
  var processedUsers = {};

  data.forEach(function(row) {
    if (!userGroups[row.handle]) userGroups[row.handle] = [];
    userGroups[row.handle].push(row);
  });

  data.forEach(function(row) {
    if (!processedUsers[row.handle]) {
      processedUsers[row.handle] = true;
      var userRows = userGroups[row.handle];
      userRows.forEach(function(r, i) {
        r.isFirstForUser = (i === 0);
        grouped.push(r);
      });
    }
  });

  return grouped;
}

// Undo functionality
function saveStateForUndo(callback) {
  chrome.storage.local.get(['userNotes'], function(result) {
    var currentState = JSON.stringify(result.userNotes || {});
    undoStack.push(currentState);
    // Keep only last 10 states
    if (undoStack.length > 10) undoStack.shift();
    updateUndoButton();
    if (callback) callback();
  });
}

function undoLastAction() {
  if (undoStack.length === 0) {
    showStatus('Nothing to undo');
    return;
  }
  var previousState = undoStack.pop();
  var notes = JSON.parse(previousState);
  chrome.storage.local.set({ userNotes: notes }, function() {
    showStatus('Undone');
    updateUndoButton();
    loadData();
  });
}

function updateUndoButton() {
  var btn = document.getElementById('undoBtn');
  if (undoStack.length > 0) {
    btn.disabled = false;
    btn.title = undoStack.length + ' action(s) to undo';
  } else {
    btn.disabled = true;
    btn.title = 'Nothing to undo';
  }
}

// Inline edit — modern in-cell editing
function startInlineEdit(editBtn, handle, entryIndex) {
  // Don't start a new edit if one is already active
  if (document.querySelector('.inline-edit-active')) return;

  var noteCell = editBtn.closest('.note-cell');
  var noteTextEl = noteCell.querySelector('.note-text');
  // Use the original entry text (preserving URLs) instead of the displayed (stripped) text
  var currentText = noteTextEl.dataset.originalText || noteTextEl.textContent.trim();

  // Hide the note text and edit button
  noteTextEl.style.display = 'none';
  editBtn.style.display = 'none';

  // Create inline edit container
  var editContainer = document.createElement('div');
  editContainer.className = 'inline-edit-active';

  var input = document.createElement('input');
  input.type = 'text';
  input.className = 'inline-edit-input';
  input.value = currentText === '-' ? '' : currentText;
  input.placeholder = 'Edit record...';

  var btnRow = document.createElement('div');
  btnRow.className = 'inline-edit-actions';

  var saveBtn = document.createElement('button');
  saveBtn.className = 'inline-edit-save';
  saveBtn.textContent = 'Save';

  var cancelBtn = document.createElement('button');
  cancelBtn.className = 'inline-edit-cancel';
  cancelBtn.textContent = 'Cancel';

  btnRow.appendChild(saveBtn);
  btnRow.appendChild(cancelBtn);
  editContainer.appendChild(input);
  editContainer.appendChild(btnRow);
  noteCell.appendChild(editContainer);

  // Focus and select all text
  input.focus();
  input.select();

  var outsideClickHandler = null;

  function removeOutsideListener() {
    if (outsideClickHandler) {
      document.removeEventListener('click', outsideClickHandler);
      outsideClickHandler = null;
    }
  }

  function cancelEdit() {
    removeOutsideListener();
    editContainer.remove();
    noteTextEl.style.display = '';
    editBtn.style.display = '';
  }

  function saveEdit() {
    var newText = input.value.trim();
    if (newText === currentText || (newText === '' && currentText === '-')) {
      cancelEdit();
      return;
    }

    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      var userData = notes[handle];
      if (!userData || !userData.entries || !userData.entries[entryIndex]) {
        cancelEdit();
        return;
      }

      saveStateForUndo(function() {
        if (newText === '') {
          // Empty text — delete the entry
          userData.entries.splice(entryIndex, 1);
          if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0)) {
            delete notes[handle];
          } else {
            notes[handle] = userData;
          }
          chrome.storage.local.set({ userNotes: notes }, function() {
            showStatus('Deleted');
            loadData();
          });
        } else {
          userData.entries[entryIndex].text = newText;
          // Preserve original date, track edit time separately
          userData.entries[entryIndex].lastModified = new Date().toISOString();
          notes[handle] = userData;
          chrome.storage.local.set({ userNotes: notes }, function() {
            showStatus('Updated');
            loadData();
          });
        }
      });
    });
  }

  saveBtn.onclick = saveEdit;
  cancelBtn.onclick = cancelEdit;

  // Save on Enter, cancel on Escape
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  });

  // Cancel if clicking outside
  setTimeout(function() {
    outsideClickHandler = function(e) {
      if (!editContainer.contains(e.target)) {
        cancelEdit();
      }
    };
    document.addEventListener('click', outsideClickHandler);
  }, 0);
}

function deleteEntry(handle, entryIndex) {
  if (!confirm('Delete this record?')) return;

  // Save state for undo before deleting
  saveStateForUndo(function() {
    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      var userData = notes[handle];
      if (!userData || !userData.entries) return;

      userData.entries.splice(entryIndex, 1);
      if (userData.entries.length === 0 && (!userData.labels || userData.labels.length === 0)) {
        delete notes[handle];
      } else {
        notes[handle] = userData;
      }

      chrome.storage.local.set({ userNotes: notes }, function() {
        showStatus('Deleted');
        loadData();
      });
    });
  });
}

function deleteUser(handle) {
  if (!confirm('Delete ALL data for @' + handle + '?')) return;

  // Save state for undo before deleting user
  saveStateForUndo(function() {
    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      delete notes[handle];
      chrome.storage.local.set({ userNotes: notes }, function() {
        showStatus('User deleted');
        loadData();
      });
    });
  });
}

// Label picker
function showLabelPicker(handle, anchorEl) {
  var picker = document.getElementById('labelPicker');
  var rect = anchorEl.getBoundingClientRect();

  chrome.storage.local.get(['userNotes'], function(result) {
    var notes = result.userNotes || {};
    var userData = notes[handle] || { entries: [], labels: [] };
    var currentLabels = userData.labels || [];

    var html = '';
    LABELS.forEach(function(l) {
      var isActive = currentLabels.indexOf(l.id) >= 0;
      html += '<div class="label-picker-item' + (isActive ? ' active' : '') + '" data-handle="' + handle + '" data-label="' + l.id + '">' +
        '<span class="check">' + (isActive ? '✓' : '') + '</span>' +
        '<span class="legend-badge" style="background:' + l.color + '">' + l.icon + ' ' + l.text + '</span>' +
        '</div>';
    });

    picker.innerHTML = html;
    picker.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    picker.style.left = rect.left + 'px';
    picker.classList.add('show');

    picker.querySelectorAll('.label-picker-item').forEach(function(item) {
      item.onclick = function() {
        toggleUserLabel(this.dataset.handle, this.dataset.label);
        closeLabelPicker();
      };
    });
  });
}

function closeLabelPicker() {
  document.getElementById('labelPicker').classList.remove('show');
}

function toggleUserLabel(handle, labelId) {
  // Save state for undo before changing labels
  saveStateForUndo(function() {
    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      var userData = notes[handle] || { entries: [], labels: [] };
      if (!userData.labels) userData.labels = [];

      var idx = userData.labels.indexOf(labelId);
      if (idx >= 0) {
        userData.labels.splice(idx, 1);
      } else {
        userData.labels.push(labelId);
      }

      notes[handle] = userData;
      chrome.storage.local.set({ userNotes: notes }, function() {
        showStatus('Label updated');
        loadData();
      });
    });
  });
}

// Post-level label picker for dashboard entries
function showPostLabelPicker(handle, entryIndex, anchorEl) {
  var picker = document.getElementById('postLabelPicker');
  if (!picker) {
    picker = document.createElement('div');
    picker.className = 'label-picker';
    picker.id = 'postLabelPicker';
    document.body.appendChild(picker);
  }
  var rect = anchorEl.getBoundingClientRect();

  chrome.storage.local.get(['userNotes'], function(result) {
    var notes = result.userNotes || {};
    var userData = notes[handle] || { entries: [], labels: [] };
    var entry = userData.entries && userData.entries[entryIndex] ? userData.entries[entryIndex] : null;
    var currentPostLabels = entry && entry.postLabels ? entry.postLabels : [];

    var html = '<div class="picker-title">Post tags</div>';
    POST_LABELS.forEach(function(l) {
      var isActive = currentPostLabels.indexOf(l.id) >= 0;
      html += '<div class="label-picker-item' + (isActive ? ' active' : '') + '" data-handle="' + handle + '" data-index="' + entryIndex + '" data-post-label="' + l.id + '">' +
        '<span class="check">' + (isActive ? '✓' : '') + '</span>' +
        '<span class="legend-badge" style="background:' + l.color + '">' + l.icon + ' ' + l.text + '</span>' +
        '</div>';
    });

    picker.innerHTML = html;
    picker.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    picker.style.left = rect.left + 'px';
    picker.classList.add('show');

    picker.querySelectorAll('.label-picker-item').forEach(function(item) {
      item.onclick = function() {
        toggleEntryPostLabel(this.dataset.handle, parseInt(this.dataset.index), this.dataset.postLabel);
        closePostLabelPicker();
      };
    });
  });
}

function closePostLabelPicker() {
  var picker = document.getElementById('postLabelPicker');
  if (picker) picker.classList.remove('show');
}

function toggleEntryPostLabel(handle, entryIndex, postLabelId) {
  saveStateForUndo(function() {
    chrome.storage.local.get(['userNotes'], function(result) {
      var notes = result.userNotes || {};
      var userData = notes[handle] || { entries: [], labels: [] };
      if (!userData.entries || !userData.entries[entryIndex]) return;

      var entry = userData.entries[entryIndex];
      if (!entry.postLabels) entry.postLabels = [];

      var idx = entry.postLabels.indexOf(postLabelId);
      if (idx >= 0) {
        entry.postLabels.splice(idx, 1);
      } else {
        entry.postLabels.push(postLabelId);
      }

      notes[handle] = userData;
      chrome.storage.local.set({ userNotes: notes }, function() {
        showStatus('Post tag updated');
        loadData();
      });
    });
  });
}

// Modal
function showModal(src) {
  document.getElementById('modalImage').src = src;
  document.getElementById('imageModal').classList.add('show');
}

function closeModal() {
  document.getElementById('imageModal').classList.remove('show');
}

// Helpers
function extractUrl(text) {
  var m = (text || '').match(/https?:\/\/[^\s]+/);
  return m ? m[0] : null;
}

function removeUrl(text) {
  return (text || '').replace(/https?:\/\/[^\s]+/g, '').replace(/\s*-\s*$/, '').trim();
}

function formatDate(d) {
  if (!d) return '-';
  var dt = new Date(d);
  var absolute = dt.getDate().toString().padStart(2, '0') + '/' + (dt.getMonth() + 1).toString().padStart(2, '0') + '/' + dt.getFullYear();
  // Add relative time
  var now = new Date();
  var diffMs = now - dt;
  var diffMins = Math.floor(diffMs / 60000);
  var diffHrs = Math.floor(diffMs / 3600000);
  var diffDays = Math.floor(diffMs / 86400000);
  var relative = '';
  if (diffMins < 1) relative = 'now';
  else if (diffMins < 60) relative = diffMins + 'm ago';
  else if (diffHrs < 24) relative = diffHrs + 'h ago';
  else if (diffDays < 30) relative = diffDays + 'd ago';
  else relative = absolute;
  return '<span title="' + absolute + '">' + relative + '</span>';
}

function escapeHtml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showStatus(msg) {
  var el = document.getElementById('status');
  el.textContent = msg;
  setTimeout(function() { el.textContent = ''; }, 2000);
}

// Auto-refresh on storage changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'local' && changes.userNotes) {
    loadData();
  }
});

// Initialize
init();
