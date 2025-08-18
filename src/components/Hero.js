import { smoothScrollTo, prefersReducedMotion } from '../utils.js';
import { FloatingIngredients } from './FloatingIngredients.js';
import { getAsset } from '../utils/assetsMap';

export class Hero {
  constructor() {
    this.init();
  }

  init() {
    this.createHero();
  }

  createHero() {
    const heroContainer = document.querySelector('#hero');
    
    const heroContent = document.createElement('div');
    heroContent.className = 'hero-container container';
    
    // Left side - Content
    const leftSide = document.createElement('div');
    leftSide.className = 'hero-content';
    
    // Headline
    const headline = document.createElement('h1');
    headline.className = 'display';
    headline.textContent = 'Order Your Favourite Food Easily';
    
    // Subcopy
    const subcopy = document.createElement('p');
    subcopy.className = 'lead';
    subcopy.textContent = 'Discover delicious meals made with fresh ingredients, delivered to your doorstep or enjoy in our cozy restaurant. Experience the perfect blend of taste and quality.';
    
    // CTA Buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'hero-buttons';
    
    const menuBtn = document.createElement('a');
    menuBtn.href = '#menu';
    menuBtn.className = 'btn btn-primary';
    menuBtn.textContent = 'Our Menu';
    
    const bookBtn = document.createElement('a');
    bookBtn.href = '#newsletter';
    bookBtn.className = 'btn btn-secondary';
    bookBtn.textContent = 'Book a Table';
    
    // Add click handlers for smooth scrolling
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#menu', 80);
    });
    
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#newsletter', 80);
    });
    
    buttonContainer.appendChild(menuBtn);
    buttonContainer.appendChild(bookBtn);
    
    // USPs
    const uspsContainer = document.createElement('div');
    uspsContainer.className = 'hero-features';
    
    const usps = [
      {
        icon: this.createFreshIcon(),
        text: 'Fresh Food'
      },
      {
        icon: this.createOfferIcon(),
        text: 'Best Offer'
      },
      {
        icon: this.createDeliveryIcon(),
        text: 'Fast Delivery'
      }
    ];
    
    usps.forEach(usp => {
      const uspElement = document.createElement('div');
      uspElement.className = 'hero-feature';
      
      uspElement.appendChild(usp.icon);
      
      const text = document.createElement('span');
      text.textContent = usp.text;
      uspElement.appendChild(text);
      
      uspsContainer.appendChild(uspElement);
    });
    
    // Assemble left side
    leftSide.appendChild(headline);
    leftSide.appendChild(subcopy);
    leftSide.appendChild(buttonContainer);
    leftSide.appendChild(uspsContainer);
    
    // Right side - Visual
    const rightSide = document.createElement('div');
    rightSide.className = 'hero-visual';
    
    // Hero image
    const heroImage = document.createElement('img');
    
    // Use getAsset helper for bundled hero image resolution
    heroImage.src = getAsset('hero.svg');
    
    heroImage.alt = 'Decorative noodles bowl illustration in hero circle';
    heroImage.className = 'hero-image';
    heroImage.width = 400;
    heroImage.height = 400;
    
    // Add error handling for hero image
    heroImage.onerror = () => {
      console.warn('Failed to load hero image');
    };
    
    // Organic shapes
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'hero-shapes';
    
    const shape1 = document.createElement('div');
    shape1.className = 'hero-shape';
    
    const shape2 = document.createElement('div');
    shape2.className = 'hero-shape';
    
    shapesContainer.appendChild(shape1);
    shapesContainer.appendChild(shape2);
    
    // Assemble right side
    rightSide.appendChild(shapesContainer);
    rightSide.appendChild(heroImage);
    
    // Assemble hero section
    heroContent.appendChild(leftSide);
    heroContent.appendChild(rightSide);
    
    heroContainer.appendChild(heroContent);
    
    // Render floating ingredients after the hero is mounted
    this.renderFloatingIngredients(rightSide);
  }

  async renderFloatingIngredients(container) {
    const floatingIngredients = new FloatingIngredients();
    await floatingIngredients.renderFloatingIngredients(container);
  }

  createFreshIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
    
    svg.appendChild(path);
    return svg;
  }

  createOfferIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z');
    
    svg.appendChild(path);
    return svg;
  }

  createDeliveryIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M13 10V3L4 14h7v7l9-11h-7z');
    
    svg.appendChild(path);
    return svg;
  }
}
