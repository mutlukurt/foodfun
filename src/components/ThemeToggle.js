import { storage } from '../utils.js';

export class ThemeToggle {
  constructor() {
    this.currentTheme = 'light';
    this.init();
  }

  init() {
    this.loadTheme();
    this.createThemeToggle();
    this.bindEvents();
  }

  loadTheme() {
    // Check localStorage first
    const savedTheme = storage.get('ff-theme');
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    this.applyTheme();
  }

  createThemeToggle() {
    const container = document.getElementById('theme-toggle-container');
    
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark/light theme');
    toggle.setAttribute('title', 'Toggle theme');
    
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
    
    if (this.currentTheme === 'dark') {
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
      this.toggleTheme();
    });
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't manually set a theme
      if (!storage.get('ff-theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme();
        this.updateIcon();
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    this.updateIcon();
    this.saveTheme();
  }

  applyTheme() {
    const html = document.documentElement;
    
    if (this.currentTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
  }

  updateIcon() {
    const toggle = document.querySelector('.theme-toggle');
    const oldIcon = toggle.querySelector('svg');
    
    if (oldIcon) {
      oldIcon.remove();
    }
    
    const newIcon = this.createThemeIcon();
    toggle.appendChild(newIcon);
  }

  saveTheme() {
    storage.set('ff-theme', this.currentTheme);
  }
}
