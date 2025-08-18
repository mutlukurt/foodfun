// ===== UTILITY FUNCTIONS =====

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target element or selector
 * @param {number} offset - Offset from top
 */
export function smoothScrollTo(target, offset = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  const targetPosition = element.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  
  if (prefersReducedMotion()) {
    window.scrollTo(0, targetPosition);
    return;
  }
  
  let startTime = null;
  const duration = 800;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean}
 */
export function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const thresholdHeight = windowHeight * threshold;
  
  return (
    rect.top <= windowHeight - thresholdHeight &&
    rect.bottom >= thresholdHeight
  );
}

/**
 * Get scroll progress percentage
 * @returns {number} - Scroll progress (0-100)
 */
export function getScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return (scrollTop / docHeight) * 100;
}

/**
 * Update scroll progress bar
 */
export function updateScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const progress = getScrollProgress();
    progressBar.style.width = `${progress}%`;
  }
}

/**
 * Create and show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, info)
 * @param {number} duration - Duration in milliseconds
 */
export function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, duration);
  
  // Remove on click
  toast.addEventListener('click', () => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  });
}

/**
 * Local storage utilities
 */
export const storage = {
  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*}
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Error writing to localStorage:', error);
    }
  },
  
  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Error removing from localStorage:', error);
    }
  }
};

/**
 * Add to cart functionality
 * @param {number} itemId - Menu item ID
 */
export function addToCart(itemId) {
  const cart = storage.get('ff-cart', []);
  if (!cart.includes(itemId)) {
    cart.push(itemId);
    storage.set('ff-cart', cart);
    showToast('Added to cart!', 'success');
  } else {
    showToast('Item already in cart!', 'info');
  }
}

/**
 * Check if user is subscribed to newsletter
 * @returns {boolean}
 */
export function isSubscribed() {
  return storage.get('ff-subscribed', false);
}

/**
 * Mark user as subscribed
 */
export function markSubscribed() {
  storage.set('ff-subscribed', true);
  showToast('Subscribed!', 'success');
}

/**
 * Format price with currency
 * @param {number} price - Price to format
 * @param {string} currency - Currency code
 * @returns {string} - Formatted price
 */
export function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price);
}

/**
 * Format calories
 * @param {number} calories - Calories to format
 * @returns {string} - Formatted calories
 */
export function formatCalories(calories) {
  return `${calories} kcal`;
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string} textContent - Text content
 * @returns {Element} - Created element
 */
export function createElement(tag, attributes = {}, textContent = '') {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  if (textContent) {
    element.textContent = textContent;
  }
  
  return element;
}

/**
 * Add event listener with cleanup
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @returns {Function} - Cleanup function
 */
export function addEventListenerWithCleanup(element, event, handler) {
  element.addEventListener(event, handler);
  return () => element.removeEventListener(event, handler);
}

/**
 * Intersection Observer for scroll animations
 * @param {Function} callback - Callback function
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver}
 */
export function createScrollObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target, entry);
      }
    });
  }, defaultOptions);
}
