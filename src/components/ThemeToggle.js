import { themeManager, setTheme, getTheme, toggleTheme } from '../utils/themeManager.js';

export class ThemeToggle {
  constructor() {
    this.init();
  }

  init() {
    this.createThemeToggle();
    this.bindEvents();
    this.updateIcon();
    
    // Listen for theme changes from other sources
    window.addEventListener('themechange', () => {
      this.updateIcon();
    });

    // Handle mobile-specific positioning
    this.handleMobilePositioning();
  }

  handleMobilePositioning() {
    // Adjust position based on screen size and orientation
    const updatePosition = () => {
      const toggle = document.querySelector('.theme-toggle');
      if (!toggle) return;

      const isMobile = window.innerWidth <= 768;
      const isLandscape = window.innerHeight < window.innerWidth;
      
      if (isMobile) {
        // Mobile positioning with safe area support
        toggle.style.bottom = 'max(16px, env(safe-area-inset-bottom))';
        toggle.style.right = 'max(16px, env(safe-area-inset-right))';
        
        // Adjust size for very small screens
        if (window.innerWidth <= 375) {
          toggle.style.width = '44px';
          toggle.style.height = '44px';
        } else {
          toggle.style.width = '48px';
          toggle.style.height = '48px';
        }
      } else {
        // Desktop positioning
        toggle.style.bottom = 'var(--space-lg)';
        toggle.style.right = 'var(--space-lg)';
        toggle.style.width = '56px';
        toggle.style.height = '56px';
      }
    };

    // Initial position
    updatePosition();
    
    // Update on resize and orientation change
    window.addEventListener('resize', updatePosition);
    window.addEventListener('orientationchange', () => {
      setTimeout(updatePosition, 100);
    });
  }

  createThemeToggle() {
    const container = document.getElementById('theme-toggle-container');
    
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark/light theme');
    toggle.setAttribute('title', 'Toggle theme');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    
    // Create icon based on current theme
    const icon = this.createThemeIcon();
    toggle.appendChild(icon);
    
    container.appendChild(toggle);
  }

  createThemeIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const currentTheme = getTheme();
    const effectiveTheme = themeManager.getEffectiveTheme();
    
    if (effectiveTheme === 'dark') {
      // Sun icon for dark theme
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '12');
      circle.setAttribute('r', '5');
      
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('x1', '12');
      line1.setAttribute('y1', '1');
      line1.setAttribute('x2', '12');
      line1.setAttribute('y2', '3');
      
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttribute('x1', '12');
      line2.setAttribute('y1', '21');
      line2.setAttribute('x2', '12');
      line2.setAttribute('y2', '23');
      
      const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line3.setAttribute('x1', '4.22');
      line3.setAttribute('y1', '4.22');
      line3.setAttribute('x2', '5.64');
      line3.setAttribute('y2', '5.64');
      
      const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line4.setAttribute('x1', '18.36');
      line4.setAttribute('y1', '18.36');
      line4.setAttribute('x2', '19.78');
      line4.setAttribute('y2', '19.78');
      
      const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line5.setAttribute('x1', '1');
      line5.setAttribute('y1', '12');
      line5.setAttribute('x2', '3');
      line5.setAttribute('y2', '12');
      
      const line6 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line6.setAttribute('x1', '21');
      line6.setAttribute('y1', '12');
      line6.setAttribute('x2', '23');
      line6.setAttribute('y2', '12');
      
      const line7 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line7.setAttribute('x1', '4.22');
      line7.setAttribute('y1', '19.78');
      line7.setAttribute('x2', '5.64');
      line7.setAttribute('y2', '18.36');
      
      const line8 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line8.setAttribute('x1', '18.36');
      line8.setAttribute('y1', '5.64');
      line8.setAttribute('x2', '19.78');
      line8.setAttribute('y2', '4.22');
      
      svg.appendChild(circle);
      svg.appendChild(line1);
      svg.appendChild(line2);
      svg.appendChild(line3);
      svg.appendChild(line4);
      svg.appendChild(line5);
      svg.appendChild(line6);
      svg.appendChild(line7);
      svg.appendChild(line8);
    } else {
      // Moon icon for light theme
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
      
      svg.appendChild(path);
    }
    
    return svg;
  }

  bindEvents() {
    const toggle = document.querySelector('.theme-toggle');
    
    toggle.addEventListener('click', () => {
      this.handleThemeToggle();
    });

    // Keyboard support for accessibility
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleThemeToggle();
      }
    });
  }

  handleThemeToggle() {
    // Add class to prevent transition flash during theme change
    document.body.classList.add('theme-changing');
    
    // Toggle theme
    toggleTheme();
    
    // Remove class after theme change
    setTimeout(() => {
      document.body.classList.remove('theme-changing');
    }, 200);
  }

  updateIcon() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    const oldIcon = toggle.querySelector('svg');
    
    if (oldIcon) {
      oldIcon.remove();
    }
    
    const newIcon = this.createThemeIcon();
    toggle.appendChild(newIcon);
  }
}
