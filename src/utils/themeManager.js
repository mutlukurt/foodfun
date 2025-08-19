class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }

  init() {
    // Apply theme before first paint to avoid flash
    this.loadTheme();
    this.applyTheme();
    
    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', (e) => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'system';
    }
  }

  getEffectiveTheme() {
    if (this.currentTheme === 'system') {
      return this.mediaQuery.matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  applyTheme() {
    const effectiveTheme = this.getEffectiveTheme();
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#0D0F14' : '#FFFFFF');
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme();
    this.saveTheme();
    
    // Dispatch custom event for components to react
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: this.getEffectiveTheme() } 
    }));
  }

  getTheme() {
    return this.currentTheme;
  }

  saveTheme() {
    localStorage.setItem('theme', this.currentTheme);
  }

  toggleTheme() {
    if (this.currentTheme === 'light') {
      this.setTheme('dark');
    } else if (this.currentTheme === 'dark') {
      this.setTheme('light');
    } else {
      // If system, toggle to light
      this.setTheme('light');
    }
  }
}

// Create singleton instance
export const themeManager = new ThemeManager();

// Export functions for easy use
export const setTheme = (theme) => themeManager.setTheme(theme);
export const getTheme = () => themeManager.getTheme();
export const toggleTheme = () => themeManager.toggleTheme();
export const getEffectiveTheme = () => themeManager.getEffectiveTheme();
