export class Toast {
  constructor() {
    this.toastContainer = null;
    this.init();
  }

  init() {
    this.createToastContainer();
  }

  createToastContainer() {
    // The toast container is already in the HTML, just get a reference
    this.toastContainer = document.getElementById('toast-container');
    
    if (!this.toastContainer) {
      console.error('Toast container not found');
      return;
    }
  }

  show(message, type = 'info', duration = 3000) {
    if (!this.toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    // Create toast content
    const content = document.createElement('div');
    content.className = 'toast-content';
    content.textContent = message;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', 'Close notification');
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', () => {
      this.removeToast(toast);
    });
    
    // Assemble toast
    toast.appendChild(content);
    toast.appendChild(closeBtn);
    
    // Add to container
    this.toastContainer.appendChild(toast);
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast);
      }, duration);
    }
    
    // Add entrance animation
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });
    
    return toast;
  }

  removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    
    // Add exit animation
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    
    // Remove after animation
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  }

  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }

  clearAll() {
    if (!this.toastContainer) return;
    
    const toasts = this.toastContainer.querySelectorAll('.toast');
    toasts.forEach(toast => {
      this.removeToast(toast);
    });
  }
}
