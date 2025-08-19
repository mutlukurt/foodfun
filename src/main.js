import './styles/theme.css';
import './styles/global.css';
import './styles/components.css';
import './styles/utilities.css';
import './styles/mobile.css';
import { updateScrollProgress, createScrollObserver } from './utils.js';
import { NavBar } from './components/NavBar.js';
import { Hero } from './components/Hero.js';
import { About } from './components/About.js';
import { WhyUs } from './components/WhyUs.js';
import { MenuCarousel } from './components/MenuCarousel.js';
import { Testimonials } from './components/Testimonials.js';
import { Newsletter } from './components/Newsletter.js';
import { Footer } from './components/Footer.js';
import { ThemeToggle } from './components/ThemeToggle.js';
import { Toast } from './components/Toast.js';

// Initialize scroll progress bar
let ticking = false;
const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollProgress();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });

// Initialize scroll reveal animations
const initScrollReveal = () => {
  const sections = document.querySelectorAll('section');
  
  const observer = createScrollObserver((target) => {
    target.classList.add('revealed');
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
};

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 FoodFun Restaurant Landing Page Initializing...');
  
  try {
    // Initialize components in order
    const navbar = new NavBar();
    const hero = new Hero();
    const about = new About();
    const whyUs = new WhyUs();
    const menuCarousel = new MenuCarousel();
    const testimonials = new Testimonials();
    const newsletter = new Newsletter();
    const footer = new Footer();
    const themeToggle = new ThemeToggle();
    const toast = new Toast();
    
    // Initialize scroll reveal after components are mounted
    setTimeout(() => {
      initScrollReveal();
    }, 100);
    
    console.log('✅ All components initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing components:', error);
  }
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, pause animations if needed
    document.body.classList.add('page-hidden');
  } else {
    // Page is visible, resume animations
    document.body.classList.remove('page-hidden');
  }
});

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Trigger any responsive adjustments here
    const event = new CustomEvent('windowResize');
    window.dispatchEvent(event);
  }, 250);
});

// Handle page load completion
window.addEventListener('load', () => {
  console.log('🎉 FoodFun Restaurant Landing Page Loaded Successfully!');
  
  // Remove loading states if any
  document.body.classList.add('page-loaded');
  
  // Initialize any lazy-loaded content
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Handle service worker registration for PWA features (production only)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/foodfun/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for potential external use
window.FoodFun = {
  NavBar,
  Hero,
  About,
  WhyUs,
  MenuCarousel,
  Testimonials,
  Newsletter,
  Footer,
  ThemeToggle,
  Toast
};
