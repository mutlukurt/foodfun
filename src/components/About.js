import { prefersReducedMotion } from '../utils.js';
import { getAsset } from '../utils/assetsMap';

export class About {
  constructor() {
    this.init();
  }

  init() {
    this.createAbout();
    this.initParallax();
  }

  createAbout() {
    const aboutContainer = document.querySelector('#about');
    
    const aboutContent = document.createElement('div');
    aboutContent.className = 'about-container container';
    
    // Left side - Content
    const leftSide = document.createElement('div');
    leftSide.className = 'about-content';
    
    const heading = document.createElement('h2');
    heading.className = 'h2';
    heading.textContent = 'Our Story';
    
    const story = document.createElement('p');
    story.className = 'body';
    story.textContent = 'Founded with a passion for creating exceptional dining experiences, FoodFun has been serving our community since 2018. We believe that great food starts with the finest ingredients, sourced locally whenever possible. Our talented chefs combine traditional techniques with modern creativity to bring you dishes that are both familiar and exciting. Every meal is crafted with care, ensuring that each bite tells a story of quality, passion, and dedication to culinary excellence.';
    
    leftSide.appendChild(heading);
    leftSide.appendChild(story);
    
    // Right side - Image
    const rightSide = document.createElement('div');
    rightSide.className = 'about-image';
    
    const image = document.createElement('img');
    
    // Use getAsset helper for bundled about image resolution
    image.src = getAsset('plate-mediterranean-salad.svg');
    
    image.alt = 'Fresh Mediterranean salad illustration with greens and veggies';
    image.loading = 'lazy';
    image.width = 800;
    image.height = 600;
    
    // Add error handling for about image
    image.onerror = () => {
      console.warn('Failed to load about image');
    };
    
    rightSide.appendChild(image);
    
    // Assemble about section
    aboutContent.appendChild(leftSide);
    aboutContent.appendChild(rightSide);
    
    aboutContainer.appendChild(aboutContent);
  }

  initParallax() {
    if (prefersReducedMotion()) return;
    
    const aboutImage = document.querySelector('.about-image img');
    if (!aboutImage) return;
    
    let ticking = false;
    
    const handleParallax = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.3;
          
          // Only apply parallax when image is in viewport
          const rect = aboutImage.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            aboutImage.style.transform = `translateY(${rate}px)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });
  }
}
