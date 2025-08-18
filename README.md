# 🍽️ FoodFun Restaurant Landing Page

A modern, responsive restaurant landing page built with **Vite**, **Vanilla JavaScript**, **HTML**, and **CSS**. Features a beautiful design with dark/light theme support, smooth animations, and excellent accessibility.

![FoodFun Restaurant](https://img.shields.io/badge/FoodFun-Restaurant%20Landing%20Page-brightgreen)
![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla%20JS-F7DF1E)
![Responsive](https://img.shields.io/badge/Responsive-Yes-4CAF50)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%20AA-2196F3)

## ✨ Features

- 🎨 **Dark/Light Theme Toggle** - Persistent theme switching with system preference detection
- 📱 **Fully Responsive** - Optimized for all devices (360px to 1440px+)
- ♿ **Accessibility First** - WCAG AA compliant with proper ARIA labels and keyboard navigation
- 🚀 **Performance Optimized** - Lazy loading, intersection observers, and efficient animations
- 🎭 **Smooth Animations** - Scroll-triggered animations with reduced motion support
- 🛒 **Interactive Menu** - Mobile carousel with add-to-cart functionality
- 💬 **Testimonials Slider** - Auto-advancing carousel with pause on hover/focus
- 📧 **Newsletter Subscription** - Email validation with localStorage persistence
- 🎯 **Scroll Progress Bar** - Visual scroll indicator at the top
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foodfun.git
   cd foodfun
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
foodfun/
├── public/
│   ├── assets/           # Images and static assets
│   │   ├── hero.jpg      # Hero section image
│   │   ├── salad.png     # About section image
│   │   ├── plate1.jpg    # Menu item images
│   │   ├── plate2.jpg
│   │   ├── plate3.jpg
│   │   ├── plate4.jpg
│   │   ├── plate5.jpg
│   │   ├── plate6.jpg
│   │   ├── avatar1.jpg   # Testimonial avatars
│   │   ├── avatar2.jpg
│   │   ├── avatar3.jpg
│   │   └── favicon.png   # Site favicon
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/       # JavaScript components
│   │   ├── NavBar.js     # Navigation component
│   │   ├── Hero.js       # Hero section
│   │   ├── About.js      # About section
│   │   ├── WhyUs.js      # Features section
│   │   ├── MenuCarousel.js # Menu display
│   │   ├── Testimonials.js # Customer reviews
│   │   ├── Newsletter.js # Email subscription
│   │   ├── Footer.js     # Site footer
│   │   ├── ThemeToggle.js # Theme switcher
│   │   └── Toast.js      # Notification system
│   ├── data/             # JSON data files
│   │   ├── menu.json     # Menu items data
│   │   └── testimonials.json # Customer testimonials
│   ├── styles/           # CSS stylesheets
│   │   ├── global.css    # Global styles and tokens
│   │   ├── components.css # Component-specific styles
│   │   └── utilities.css # Utility classes
│   ├── utils.js          # Utility functions
│   └── main.js           # Main application entry
├── index.html            # Main HTML file
├── package.json          # Project dependencies
└── README.md            # This file
```

## 🎨 Design System

### Color Tokens

```css
/* Light Theme */
--brand: #F7B500      /* Primary brand color */
--brand-2: #FFE08A    /* Secondary brand color */
--text: #1B1B1B       /* Primary text */
--muted: #6A6A6A      /* Secondary text */
--bg: #FFFFFF         /* Background */
--bg-2: #FAFAFA      /* Secondary background */
--radius: 18px        /* Border radius */

/* Dark Theme */
--bg: #0D0F14        /* Dark background */
--bg-2: #12151B      /* Dark secondary background */
--text: #EDEFF3      /* Light text */
--muted: #A9B2C3     /* Light muted text */
```

### Typography Scale

```css
.display    /* clamp(28px, 3vw, 48px) - Hero headlines */
.h1         /* clamp(28px, 3vw, 48px) - Main headings */
.h2         /* clamp(20px, 2.2vw, 32px) - Section headings */
.h3         /* clamp(18px, 1.8vw, 24px) - Subsection headings */
.body       /* 16px - Body text */
.lead       /* clamp(18px, 1.5vw, 20px) - Lead paragraphs */
.small      /* 14px - Small text */
```

### Spacing Scale

```css
--space-xs: 0.5rem   /* 8px */
--space-sm: 1rem     /* 16px */
--space-md: 1.5rem   /* 24px */
--space-lg: 2rem     /* 32px */
--space-xl: 3rem     /* 48px */
--space-2xl: 4rem    /* 64px */
--space-3xl: 6rem    /* 96px */
```

## 🔧 Component Architecture

### Component Lifecycle

Each component follows a consistent pattern:

```javascript
export class ComponentName {
  constructor() {
    this.init();
  }

  init() {
    this.createComponent();
    this.bindEvents();
  }

  createComponent() {
    // DOM creation logic
  }

  bindEvents() {
    // Event listeners
  }
}
```

### Key Components

- **NavBar**: Sticky navigation with mobile hamburger menu
- **Hero**: Main landing section with CTAs and floating elements
- **About**: Company story with parallax image effect
- **WhyUs**: Feature cards with hover animations
- **MenuCarousel**: Responsive menu display with cart functionality
- **Testimonials**: Accessible carousel with auto-advance
- **Newsletter**: Email subscription with validation
- **Footer**: Multi-column footer with social links
- **ThemeToggle**: Theme switcher with system preference detection
- **Toast**: Non-blocking notification system

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
360px   /* Small mobile */
414px   /* Large mobile */
768px   /* Tablet */
1024px  /* Small desktop */
1280px  /* Desktop */
1440px  /* Large desktop */
```

## ♿ Accessibility Features

- **Semantic HTML** - Proper landmark elements and ARIA roles
- **Keyboard Navigation** - Full keyboard support for all interactive elements
- **Screen Reader Support** - ARIA labels and live regions
- **Focus Management** - Visible focus indicators and logical tab order
- **Reduced Motion** - Respects `prefers-reduced-motion` user preference
- **Color Contrast** - WCAG AA compliant color combinations
- **Touch Targets** - Minimum 44x44px for mobile interactions

## 🚀 Performance Features

- **Lazy Loading** - Images load only when needed
- **Intersection Observer** - Efficient scroll animations
- **Debounced Events** - Optimized scroll and resize handlers
- **CSS Transitions** - Hardware-accelerated animations
- **Minimal JavaScript** - Lightweight, tree-shaken code
- **Optimized Assets** - Compressed images and efficient formats

## 🛠️ Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES2020, CSS Grid, Flexbox, Intersection Observer

## 📊 Lighthouse Scores

Target scores for production build:

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

## 🔒 Local Storage Keys

The application uses localStorage for persistence:

```javascript
'ff-theme'      // User's theme preference
'ff-cart'       // Shopping cart items
'ff-subscribed' // Newsletter subscription status
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Theme toggle works and persists
- [ ] Mobile hamburger menu functions correctly
- [ ] Menu carousel scrolls on mobile
- [ ] Testimonials auto-advance and pause on hover
- [ ] Newsletter subscription works
- [ ] All links scroll smoothly to sections
- [ ] Responsive design works on all breakpoints
- [ ] Keyboard navigation is functional
- [ ] Screen reader compatibility

### Cross-browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

- **Netlify**: Drag and drop `dist` folder
- **Vercel**: Connect repository for auto-deployment
- **GitHub Pages**: Deploy from `dist` branch
- **Traditional Hosting**: Upload `dist` contents to web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vite** for the fast build tool
- **CSS Custom Properties** for theming
- **Intersection Observer API** for scroll animations
- **Modern CSS Grid & Flexbox** for layouts
- **Vanilla JavaScript** for lightweight implementation

## 📞 Support

For support and questions:

- 📧 Email: hello@foodfun.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/foodfun/issues)
- 📖 Documentation: [Project Wiki](https://github.com/yourusername/foodfun/wiki)

---

**Made with ❤️ by the FoodFun Team**

*Delivering exceptional dining experiences since 2018*
