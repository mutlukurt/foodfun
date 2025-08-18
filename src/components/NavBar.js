import { smoothScrollTo, prefersReducedMotion } from '../utils.js';

export class NavBar {
  constructor() {
    this.navbar = null;
    this.mobileMenu = null;
    this.hamburger = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createNavBar();
    this.bindEvents();
    this.initScrollSpy();
  }

  createNavBar() {
    const navbarContainer = document.getElementById('navbar');
    
    this.navbar = document.createElement('div');
    this.navbar.className = 'navbar-container';
    
    // Brand
    const brand = document.createElement('a');
    brand.href = '#hero';
    brand.className = 'navbar-brand';
    brand.textContent = 'FoodFun';
    
    // Navigation menu
    this.mobileMenu = document.createElement('ul');
    this.mobileMenu.className = 'navbar-menu';
    
    const menuItems = [
      { href: '#hero', text: 'Home' },
      { href: '#about', text: 'About' },
      { href: '#why-us', text: 'Why Us' },
      { href: '#menu', text: 'Menu' },
      { href: '#testimonials', text: 'Reviews' },
      { href: '#newsletter', text: 'Contact' }
    ];
    
    menuItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.className = 'navbar-link';
      a.textContent = item.text;
      
      // Add click handler for smooth scrolling
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMobileMenu();
        smoothScrollTo(item.href, 80);
      });
      
      li.appendChild(a);
      this.mobileMenu.appendChild(li);
    });
    
    // Mobile hamburger button
    this.hamburger = document.createElement('button');
    this.hamburger.className = 'navbar-toggle';
    this.hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    this.hamburger.setAttribute('aria-expanded', 'false');
    
    for (let i = 0; i < 3; i++) {
      const span = document.createElement('span');
      this.hamburger.appendChild(span);
    }
    
    // Assemble navbar
    this.navbar.appendChild(brand);
    this.navbar.appendChild(this.mobileMenu);
    this.navbar.appendChild(this.hamburger);
    
    navbarContainer.appendChild(this.navbar);
  }

  bindEvents() {
    // Hamburger click
    this.hamburger.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMobileMenu();
      }
    });
    
    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.navbar.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
    
    // Scroll effects
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  toggleMobileMenu() {
    if (this.isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isOpen = true;
    this.mobileMenu.classList.add('open');
    this.hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.isOpen = false;
    this.mobileMenu.classList.remove('open');
    this.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Add scrolled class for background effect
    if (scrollTop > 10) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = this.mobileMenu.querySelectorAll('.navbar-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.updateActiveNavLink(id);
        }
      });
    }, {
      rootMargin: '-20% 0px -80% 0px'
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  updateActiveNavLink(activeId) {
    const navLinks = this.mobileMenu.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
}
