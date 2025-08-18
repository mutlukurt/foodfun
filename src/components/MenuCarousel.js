import { addToCart, formatPrice, formatCalories } from '../utils.js';

export class MenuCarousel {
  constructor() {
    this.menuData = [];
    this.currentIndex = 0;
    this.init();
  }

  async init() {
    await this.loadMenuData();
    this.createMenuCarousel();
    this.bindEvents();
  }

  async loadMenuData() {
    try {
      const response = await fetch('/src/data/menu.json');
      this.menuData = await response.json();
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
    
    menuContent.appendChild(heading);
    menuContent.appendChild(carousel);
    
    menuContainer.appendChild(menuContent);
  }

  createMenuCard(item) {
    const card = document.createElement('div');
    card.className = `menu-card ${item.featured ? 'featured' : ''}`;
    
    // Image
    const imageContainer = document.createElement('div');
    imageContainer.className = 'menu-card-image-container card-media';
    
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = `Delicious ${item.title.toLowerCase()} - a mouthwatering dish that showcases our culinary expertise`;
    image.className = 'menu-card-image';
    image.width = 800; // logical size for aspect-ratio 4/3
    image.height = 600;
    image.loading = 'lazy';
    
    imageContainer.appendChild(image);
    
    // Content
    const content = document.createElement('div');
    content.className = 'menu-card-content';
    
    // Header with title and price
    const header = document.createElement('div');
    header.className = 'menu-card-header';
    
    const title = document.createElement('h3');
    title.className = 'menu-card-title';
    title.textContent = item.title;
    
    const price = document.createElement('span');
    price.className = 'menu-card-price';
    price.textContent = formatPrice(item.price);
    
    header.appendChild(title);
    header.appendChild(price);
    
    // Calories
    const calories = document.createElement('p');
    calories.className = 'menu-card-kcal';
    calories.textContent = formatCalories(item.kcal);
    
    // Tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'menu-card-tags';
    
    item.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'menu-card-tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
    
    // CTA Button
    const ctaBtn = document.createElement('button');
    ctaBtn.className = 'btn btn-primary menu-card-cta';
    ctaBtn.textContent = 'Add to cart';
    ctaBtn.addEventListener('click', () => {
      addToCart(item.id);
    });
    
    // Assemble content
    content.appendChild(header);
    content.appendChild(calories);
    content.appendChild(tagsContainer);
    content.appendChild(ctaBtn);
    
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
