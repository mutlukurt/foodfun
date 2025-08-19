import { markSubscribed, isSubscribed } from '../utils.js';

export class Newsletter {
  constructor() {
    this.init();
  }

  init() {
    this.createNewsletter();
    this.bindEvents();
    this.checkSubscriptionStatus();
  }

  createNewsletter() {
    const newsletterContainer = document.querySelector('#subscribe');
    
    const newsletterContent = document.createElement('div');
    newsletterContent.className = 'mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 shadow-lg';
    
    const heading = document.createElement('h3');
    heading.className = 'text-2xl md:text-3xl font-bold text-[var(--text)] text-center';
    heading.textContent = 'Stay Updated with FoodFun';
    
    const description = document.createElement('p');
    description.className = 'mt-3 text-center text-sm md:text-base text-[var(--muted)]';
    description.textContent = 'Subscribe to our newsletter for exclusive offers, new menu items, and special events.';
    
    const form = document.createElement('form');
    form.className = 'mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center';
    form.setAttribute('role', 'form');
    form.setAttribute('novalidate', '');
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.className = 'h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]';
    emailInput.placeholder = 'Enter your email address';
    emailInput.setAttribute('aria-label', 'Email address');
    emailInput.required = true;
    
    const subscribeBtn = document.createElement('button');
    subscribeBtn.type = 'submit';
    subscribeBtn.className = 'h-12 rounded-xl bg-[var(--accent)] px-5 font-semibold text-black hover:opacity-90 active:opacity-100 transition w-full sm:w-auto';
    subscribeBtn.textContent = 'Subscribe';
    
    form.appendChild(emailInput);
    form.appendChild(subscribeBtn);
    
    newsletterContent.appendChild(heading);
    newsletterContent.appendChild(description);
    newsletterContent.appendChild(form);
    
    newsletterContainer.appendChild(newsletterContent);
  }

  bindEvents() {
    const form = document.querySelector('form[role="form"]');
    const emailInput = form.querySelector('input[type="email"]');
    const subscribeBtn = form.querySelector('button[type="submit"]');
    
    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubscription(emailInput.value.trim());
    });
    
    // Real-time validation
    emailInput.addEventListener('input', () => {
      this.validateEmail(emailInput.value.trim());
    });
    
    emailInput.addEventListener('blur', () => {
      this.validateEmail(emailInput.value.trim());
    });
    
    // Enter key submission
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleSubscription(emailInput.value.trim());
      }
    });
  }

  validateEmail(email) {
    const emailInput = document.querySelector('input[type="email"]');
    const subscribeBtn = document.querySelector('button[type="submit"]');
    
    // Remove existing validation messages
    this.removeValidationMessages();
    
    if (!email) {
      this.showError('Please enter a valid email.');
      subscribeBtn.disabled = true;
      return false;
    }
    
    // Simple email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailPattern.test(email)) {
      subscribeBtn.disabled = false;
      return true;
    } else {
      this.showError('Please enter a valid email.');
      subscribeBtn.disabled = true;
      return false;
    }
  }

  handleSubscription(email) {
    if (!this.validateEmail(email)) {
      return;
    }
    
    // Check if already subscribed
    if (isSubscribed()) {
      this.showSuccess('You are already subscribed to our newsletter!');
      return;
    }
    
    // Simulate subscription process
    const subscribeBtn = document.querySelector('button[type="submit"]');
    const originalText = subscribeBtn.textContent;
    
    subscribeBtn.disabled = true;
    subscribeBtn.textContent = 'Subscribing...';
    
    // Simulate API call delay
    setTimeout(() => {
      // Mark as subscribed
      markSubscribed();
      
      // Update UI
      this.updateSubscriptionStatus();
      
      // Reset form
      const emailInput = document.querySelector('input[type="email"]');
      emailInput.value = '';
      
      // Reset button
      subscribeBtn.disabled = false;
      subscribeBtn.textContent = originalText;
      
      this.showSuccess('Thanks! You\'re subscribed.');
    }, 1000);
  }

  checkSubscriptionStatus() {
    if (isSubscribed()) {
      this.updateSubscriptionStatus();
    }
  }

  updateSubscriptionStatus() {
    const form = document.querySelector('form[role="form"]');
    const emailInput = form.querySelector('input[type="email"]');
    const subscribeBtn = form.querySelector('button[type="submit"]');
    
    if (isSubscribed()) {
      // Disable form and show subscribed message
      emailInput.disabled = true;
      emailInput.placeholder = 'Already subscribed!';
      emailInput.value = 'You are subscribed to our newsletter';
      
      subscribeBtn.disabled = true;
      subscribeBtn.textContent = 'Subscribed!';
      subscribeBtn.className = 'h-12 rounded-xl bg-[var(--muted)] px-5 font-semibold text-[var(--text)] opacity-50 cursor-not-allowed w-full sm:w-auto';
      
      // Add success message
      this.showSuccess('You are successfully subscribed to our newsletter!');
    }
  }

  showError(message) {
    this.removeValidationMessages();
    
    const errorElement = document.createElement('p');
    errorElement.className = 'mt-2 text-sm text-red-500';
    errorElement.id = 'subscribe-error';
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.textContent = message;
    
    const form = document.querySelector('form[role="form"]');
    form.appendChild(errorElement);
  }

  showSuccess(message) {
    this.removeValidationMessages();
    
    const successElement = document.createElement('p');
    successElement.className = 'mt-2 text-sm text-emerald-500';
    successElement.id = 'subscribe-success';
    successElement.setAttribute('aria-live', 'polite');
    successElement.textContent = message;
    
    const form = document.querySelector('form[role="form"]');
    form.appendChild(successElement);
  }

  removeValidationMessages() {
    const existingError = document.getElementById('subscribe-error');
    const existingSuccess = document.getElementById('subscribe-success');
    
    if (existingError) existingError.remove();
    if (existingSuccess) existingSuccess.remove();
  }
}
