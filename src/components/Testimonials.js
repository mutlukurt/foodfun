import { prefersReducedMotion } from '../utils.js';
import testimonials from '../data/testimonials.json';
import { assetUrl } from '../utils/assetUrl';

export class Testimonials {
  constructor() {
    this.testimonials = [];
    this.currentIndex = 0;
    this.autoAdvanceInterval = null;
    this.init();
  }

  async init() {
    this.loadTestimonials();
    this.createTestimonials();
    this.bindEvents();
    this.startAutoAdvance();
  }

  loadTestimonials() {
    try {
      // Use imported JSON data directly
      this.testimonials = testimonials || [];
      
      if (this.testimonials.length === 0) {
        console.warn('Testimonials data is empty or undefined');
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      this.testimonials = [];
    }
  }

  createTestimonials() {
    const testimonialsContainer = document.querySelector('#testimonials');
    
    const testimonialsContent = document.createElement('div');
    testimonialsContent.className = 'testimonials-container container';
    
    const heading = document.createElement('h2');
    heading.className = 'h2';
    heading.textContent = 'What Our Customers Say';
    
    const slider = document.createElement('div');
    slider.className = 'testimonials-slider';
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-roledescription', 'carousel');
    slider.setAttribute('aria-live', 'polite');
    
    // Check if we have testimonials data
    if (!this.testimonials || this.testimonials.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'testimonials-empty-state';
      emptyState.innerHTML = `
        <p>Customer reviews are loading...</p>
        <p>Please refresh the page if this persists.</p>
      `;
      slider.appendChild(emptyState);
    } else {
      // Track for testimonials
      const track = document.createElement('div');
      track.className = 'testimonials-track';
      
      this.testimonials.forEach((testimonial, index) => {
        const testimonialElement = this.createTestimonial(testimonial, index);
        track.appendChild(testimonialElement);
      });
      
      slider.appendChild(track);
      
      // Controls
      const controls = document.createElement('div');
      controls.className = 'testimonials-controls';
      
      // Previous button
      const prevBtn = document.createElement('button');
      prevBtn.className = 'testimonials-btn';
      prevBtn.setAttribute('aria-label', 'Previous testimonial');
      prevBtn.innerHTML = '←';
      
      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.className = 'testimonials-btn';
      nextBtn.setAttribute('aria-label', 'Next testimonial');
      nextBtn.innerHTML = '→';
      
      // Dots navigation
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'testimonials-dots';
      dotsContainer.setAttribute('role', 'tablist');
      dotsContainer.setAttribute('aria-label', 'Testimonial navigation');
      
      this.testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'testimonials-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        
        if (index === 0) {
          dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
          this.goToTestimonial(index);
        });
        
        dotsContainer.appendChild(dot);
      });
      
      controls.appendChild(prevBtn);
      controls.appendChild(dotsContainer);
      controls.appendChild(nextBtn);
      
      slider.appendChild(controls);
    }
    
    testimonialsContent.appendChild(heading);
    testimonialsContent.appendChild(slider);
    
    testimonialsContainer.appendChild(testimonialsContent);
  }

  createTestimonial(testimonial, index) {
    const testimonialElement = document.createElement('div');
    testimonialElement.className = 'testimonial';
    testimonialElement.setAttribute('role', 'tabpanel');
    testimonialElement.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    
    const text = document.createElement('blockquote');
    text.className = 'testimonial-text';
    text.textContent = testimonial.text;
    
    const author = document.createElement('div');
    author.className = 'testimonial-author';
    
    const avatar = document.createElement('img');
    
    // Use assetUrl helper for base-aware avatar resolution
    avatar.src = assetUrl(testimonial.avatar);
    
    avatar.alt = `${testimonial.name}, ${testimonial.role} from ${testimonial.location} - customer testimonial avatar`;
    avatar.className = 'testimonial-avatar';
    avatar.loading = 'lazy';
    avatar.width = 60;
    avatar.height = 60;
    
    // Add error handling for avatar images
    avatar.onerror = () => {
      console.warn(`Failed to load avatar for ${testimonial.name}: ${testimonial.avatar}`);
      // Could add a fallback avatar here
    };
    
    const name = document.createElement('div');
    name.className = 'testimonial-name';
    name.textContent = testimonial.name;
    
    const role = document.createElement('div');
    role.className = 'testimonial-role';
    role.textContent = testimonial.role;
    
    const location = document.createElement('div');
    location.className = 'testimonial-location';
    location.textContent = testimonial.location;
    
    author.appendChild(avatar);
    author.appendChild(name);
    author.appendChild(role);
    author.appendChild(location);
    
    testimonialElement.appendChild(text);
    testimonialElement.appendChild(author);
    
    return testimonialElement;
  }

  bindEvents() {
    const prevBtn = document.querySelector('.testimonials-btn:first-child');
    const nextBtn = document.querySelector('.testimonials-btn:last-child');
    const dots = document.querySelectorAll('.testimonials-dot');
    
    if (!prevBtn || !nextBtn) return;
    
    // Previous button
    prevBtn.addEventListener('click', () => {
      this.previousTestimonial();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
      this.nextTestimonial();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousTestimonial();
      } else if (e.key === 'ArrowRight') {
        this.nextTestimonial();
      }
    });
    
    // Pause auto-advance on hover/focus
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => {
        this.pauseAutoAdvance();
      });
      
      slider.addEventListener('mouseleave', () => {
        this.resumeAutoAdvance();
      });
      
      slider.addEventListener('focusin', () => {
        this.pauseAutoAdvance();
      });
      
      slider.addEventListener('focusout', () => {
        this.resumeAutoAdvance();
      });
    }
  }

  goToTestimonial(index) {
    if (index < 0 || index >= this.testimonials.length) return;
    
    this.currentIndex = index;
    this.updateTestimonials();
    this.updateDots();
    this.resetAutoAdvance();
  }

  nextTestimonial() {
    const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.goToTestimonial(nextIndex);
  }

  previousTestimonial() {
    const prevIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
    this.goToTestimonial(prevIndex);
  }

  updateTestimonials() {
    const track = document.querySelector('.testimonials-track');
    const testimonials = track.querySelectorAll('.testimonial');
    
    if (!track) return;
    
    const translateX = -this.currentIndex * 100;
    
    if (prefersReducedMotion()) {
      track.style.transform = `translateX(${translateX}%)`;
    } else {
      track.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update aria-hidden attributes
    testimonials.forEach((testimonial, index) => {
      testimonial.setAttribute('aria-hidden', index !== this.currentIndex ? 'true' : 'false');
    });
  }

  updateDots() {
    const dots = document.querySelectorAll('.testimonials-dot');
    
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  startAutoAdvance() {
    if (prefersReducedMotion()) return;
    
    this.autoAdvanceInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  pauseAutoAdvance() {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  resumeAutoAdvance() {
    if (!this.autoAdvanceInterval) {
      this.startAutoAdvance();
    }
  }

  resetAutoAdvance() {
    this.pauseAutoAdvance();
    this.startAutoAdvance();
  }
}
