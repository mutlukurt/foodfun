import { addToCart, formatPrice, formatCalories } from '../utils.js';
import menuData from '../data/menu.json';
import { getAsset } from '../utils/assetsMap';

export class MenuCarousel {
  constructor() {
    this.menuData = [];
    this.currentIndex = 0;
    this.init();
  }

  async init() {
    this.loadMenuData();
    this.createMenuCarousel();
    this.bindEvents();
  }

  loadMenuData() {
    try {
      // Use imported JSON data directly
      this.menuData = menuData || [];
      
      if (this.menuData.length === 0) {
        console.warn('Menu data is empty or undefined');
      }
    } catch (error) {
      console.error('Error loading menu data:', error);
      this.menuData = [];
    }
  }

  createMenuCarousel() {
    const menuContainer = document.querySelector('#menu');
    
    const menuContent = document.createElement('div');
    menuContent.className = 'menu-container container';
    
    const heading = document.createElement('h2');
    heading.className = 'h2';
    heading.textContent = 'Our Delicious Menu';
    
    const carousel = document.createElement('div');
    carousel.className = 'menu-carousel';
    
    // Check if we have menu data
    if (!this.menuData || this.menuData.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'menu-empty-state';
      emptyState.innerHTML = `
        <p>Menu is loading...</p>
        <p>Please refresh the page if this persists.</p>
      `;
      carousel.appendChild(emptyState);
    } else {
      // Desktop grid (4 columns)
      const desktopGrid = document.createElement('div');
      desktopGrid.className = 'menu-grid hidden-mobile';
      
      this.menuData.forEach(item => {
        const card = this.createMenuCard(item);
        desktopGrid.appendChild(card);
      });
      
      // Mobile carousel
      const mobileCarousel = document.createElement('div');
      mobileCarousel.className = 'menu-grid hidden-desktop';
      
      this.menuData.forEach(item => {
        const card = this.createMenuCard(item);
        mobileCarousel.appendChild(card);
      });
      
      // Mobile controls
      const mobileControls = document.createElement('div');
      mobileControls.className = 'menu-carousel-controls hidden-desktop';
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'menu-carousel-btn';
      prevBtn.setAttribute('aria-label', 'Previous menu items');
      prevBtn.innerHTML = '←';
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'menu-carousel-btn';
      nextBtn.setAttribute('aria-label', 'Next menu items');
      nextBtn.innerHTML = '→';
      
      mobileControls.appendChild(prevBtn);
      mobileControls.appendChild(nextBtn);
      
      carousel.appendChild(desktopGrid);
      carousel.appendChild(mobileCarousel);
      carousel.appendChild(mobileControls);
    }
    
    menuContent.appendChild(heading);
    menuContent.appendChild(carousel);
    
    menuContainer.appendChild(menuContent);
  }

  createMenuCard(item) {
    const card = document.createElement('div');
    card.className = `menu-card h-full flex flex-col ${item.featured ? 'featured' : ''}`;
    
    // Image with bundled asset URL
    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-media';
    
    const image = document.createElement('img');
    
    // Use getAsset helper for bundled image resolution
    image.src = getAsset(item.image);
    
    image.alt = `Delicious ${item.title.toLowerCase()} - a mouthwatering dish that showcases our culinary expertise`;
    image.className = 'w-full h-full object-contain';
    image.loading = 'lazy';
    image.decoding = 'async';
    
    // Add error handling for images
    image.onerror = () => {
      console.warn(`Failed to load image for ${item.title}: ${item.image}`);
      // Could add a fallback image here
    };
    
    imageContainer.appendChild(image);
    
    // Content
    const content = document.createElement('div');
    content.className = 'card-body grow flex flex-col gap-3';
    
    // Header with title and price
    const header = document.createElement('div');
    header.className = 'title-price flex items-start justify-between gap-2';
    
    const title = document.createElement('h3');
    title.className = 'menu-card-title line-clamp-2';
    title.textContent = item.title;
    
    const price = document.createElement('span');
    price.className = 'menu-card-price';
    price.textContent = formatPrice(item.price);
    
    header.appendChild(title);
    header.appendChild(price);
    
    // Calories
    const calories = document.createElement('p');
    calories.className = 'kcal text-sm text-muted-foreground';
    calories.textContent = formatCalories(item.kcal);
    
    // Tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags flex flex-wrap gap-2';
    
    item.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'menu-card-tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
    
    // CTA Button
    const ctaBtn = document.createElement('button');
    ctaBtn.className = 'btn w-full';
    ctaBtn.textContent = 'Add to cart';
    ctaBtn.addEventListener('click', () => {
      addToCart(item.id);
    });
    
    // CTA wrapper for bottom alignment
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'cta mt-auto';
    ctaWrapper.appendChild(ctaBtn);
    
    // Assemble content
    content.appendChild(header);
    content.appendChild(calories);
    content.appendChild(tagsContainer);
    content.appendChild(ctaWrapper);
    
    // Assemble card
    card.appendChild(imageContainer);
    card.appendChild(content);
    
    return card;
  }

  bindEvents() {
    const mobileCarousel = document.querySelector('.menu-carousel .hidden-desktop');
    const prevBtn = document.querySelector('.menu-carousel-btn:first-child');
    const nextBtn = document.querySelector('.menu-carousel-btn:last-child');
    
    if (!mobileCarousel || !prevBtn || !nextBtn) return;
    
    // Previous button
    prevBtn.addEventListener('click', () => {
      this.scrollToPrevious();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
      this.scrollToNext();
    });
    
    // Update button states on scroll
    mobileCarousel.addEventListener('scroll', () => {
      this.updateButtonStates();
    });
    
    // Initial button state
    this.updateButtonStates();
  }

  scrollToPrevious() {
    const mobileCarousel = document.querySelector('.menu-carousel .hidden-desktop');
    if (!mobileCarousel) return;
    
    const cardWidth = 280 + 24; // card width + gap
    const currentScroll = mobileCarousel.scrollLeft;
    const targetScroll = Math.max(0, currentScroll - cardWidth);
    
    mobileCarousel.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }

  scrollToNext() {
    const mobileCarousel = document.querySelector('.menu-carousel .hidden-desktop');
    if (!mobileCarousel) return;
    
    const cardWidth = 280 + 24; // card width + gap
    const currentScroll = mobileCarousel.scrollLeft;
    const maxScroll = mobileCarousel.scrollWidth - mobileCarousel.clientWidth;
    const targetScroll = Math.min(maxScroll, currentScroll + cardWidth);
    
    mobileCarousel.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }

  updateButtonStates() {
    const mobileCarousel = document.querySelector('.menu-carousel .hidden-desktop');
    const prevBtn = document.querySelector('.menu-carousel-btn:first-child');
    const nextBtn = document.querySelector('.menu-carousel-btn:last-child');
    
    if (!mobileCarousel || !prevBtn || !nextBtn) return;
    
    const currentScroll = mobileCarousel.scrollLeft;
    const maxScroll = mobileCarousel.scrollWidth - mobileCarousel.clientWidth;
    
    // Previous button
    prevBtn.disabled = currentScroll <= 0;
    
    // Next button
    nextBtn.disabled = currentScroll >= maxScroll;
  }
}
