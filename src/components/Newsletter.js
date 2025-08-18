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
    const newsletterContainer = document.querySelector('#newsletter');
    
    const newsletterContent = document.createElement('div');
    newsletterContent.className = 'newsletter-container';
    
    const heading = document.createElement('h2');
    heading.className = 'h2';
    heading.textContent = 'Stay Updated with FoodFun';
    
    const description = document.createElement('p');
    description.className = 'body';
    description.textContent = 'Subscribe to our newsletter for exclusive offers, new menu items, and special events. Be the first to know about our latest culinary creations!';
    
    const form = document.createElement('form');
    form.className = 'newsletter-form';
    form.setAttribute('novalidate', '');
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.className = 'newsletter-input';
    emailInput.placeholder = 'Enter your email address';
    emailInput.setAttribute('aria-label', 'Email address for newsletter subscription');
    emailInput.required = true;
    
    const subscribeBtn = document.createElement('button');
    subscribeBtn.type = 'submit';
    subscribeBtn.className = 'btn btn-primary newsletter-btn';
    subscribeBtn.textContent = 'Subscribe';
    
    form.appendChild(emailInput);
    form.appendChild(subscribeBtn);
    
    newsletterContent.appendChild(heading);
    newsletterContent.appendChild(description);
    newsletterContent.appendChild(form);
    
    newsletterContainer.appendChild(newsletterContent);
  }

  bindEvents() {
    const form = document.querySelector('.newsletter-form');
    const emailInput = form.querySelector('.newsletter-input');
    const subscribeBtn = form.querySelector('.newsletter-btn');
    
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
    const emailInput = document.querySelector('.newsletter-input');
    const subscribeBtn = document.querySelector('.newsletter-btn');
    
    // Remove existing validation classes
    emailInput.classList.remove('valid', 'invalid');
    
    if (!email) {
      emailInput.classList.add('invalid');
      subscribeBtn.disabled = true;
      return false;
    }
    
    // Simple email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailPattern.test(email)) {
      emailInput.classList.add('valid');
      subscribeBtn.disabled = false;
      return true;
    } else {
      emailInput.classList.add('invalid');
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
      this.showMessage('You are already subscribed to our newsletter!', 'info');
      return;
    }
    
    // Simulate subscription process
    const subscribeBtn = document.querySelector('.newsletter-btn');
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
      const emailInput = document.querySelector('.newsletter-input');
      emailInput.value = '';
      emailInput.classList.remove('valid', 'invalid');
      
      // Reset button
      subscribeBtn.disabled = false;
      subscribeBtn.textContent = originalText;
      
      this.showMessage('Thank you for subscribing! Welcome to the FoodFun family!', 'success');
    }, 1000);
  }

  checkSubscriptionStatus() {
    if (isSubscribed()) {
      this.updateSubscriptionStatus();
    }
  }

  updateSubscriptionStatus() {
    const form = document.querySelector('.newsletter-form');
    const emailInput = form.querySelector('.newsletter-input');
    const subscribeBtn = form.querySelector('.newsletter-btn');
    
    if (isSubscribed()) {
      // Disable form and show subscribed message
      emailInput.disabled = true;
      emailInput.placeholder = 'Already subscribed!';
      emailInput.value = 'You are subscribed to our newsletter';
      
      subscribeBtn.disabled = true;
      subscribeBtn.textContent = 'Subscribed!';
      subscribeBtn.classList.add('btn-secondary');
      subscribeBtn.classList.remove('btn-primary');
      
      // Add success message
      const successMessage = document.createElement('p');
      successMessage.className = 'newsletter-success';
      successMessage.textContent = 'You are successfully subscribed to our newsletter!';
      successMessage.style.color = 'var(--brand)';
      successMessage.style.fontWeight = '600';
      successMessage.style.marginTop = 'var(--space-sm)';
      
      form.appendChild(successMessage);
    }
  }

  showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `newsletter-message newsletter-message-${type}`;
    messageElement.textContent = message;
    messageElement.style.marginTop = 'var(--space-sm)';
    messageElement.style.padding = 'var(--space-sm)';
    messageElement.style.borderRadius = 'var(--radius)';
    messageElement.style.fontSize = '14px';
    
    if (type === 'success') {
      messageElement.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      messageElement.style.color = '#10B981';
      messageElement.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    } else if (type === 'info') {
      messageElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      messageElement.style.color = '#3B82F6';
      messageElement.style.border = '1px solid rgba(59, 130, 246, 0.2)';
    }
    
    const form = document.querySelector('.newsletter-form');
    form.appendChild(messageElement);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }
}
