export class WhyUs {
  constructor() {
    this.init();
  }

  init() {
    this.createWhyUs();
  }

  createWhyUs() {
    const whyUsContainer = document.querySelector('#why-us');
    
    const whyUsContent = document.createElement('div');
    whyUsContent.className = 'why-us-container container';
    
    const heading = document.createElement('h2');
    heading.className = 'h2';
    heading.textContent = 'Why Choose FoodFun?';
    
    const featuresGrid = document.createElement('div');
    featuresGrid.className = 'why-us-grid';
    
    const features = [
      {
        icon: this.createFreshFoodIcon(),
        title: 'Fresh Food',
        description: 'We use only the freshest, locally-sourced ingredients to ensure every dish is bursting with flavor and nutrition.'
      },
      {
        icon: this.createBestOfferIcon(),
        title: 'Best Offer',
        description: 'Enjoy competitive prices and special deals on our signature dishes, making quality dining accessible to everyone.'
      },
      {
        icon: this.createFastDeliveryIcon(),
        title: 'Fast Delivery',
        description: 'Get your favorite meals delivered to your doorstep in under 30 minutes, hot and ready to enjoy.'
      }
    ];
    
    features.forEach(feature => {
      const card = document.createElement('div');
      card.className = 'why-us-card';
      
      const icon = feature.icon;
      const title = document.createElement('h3');
      title.className = 'h3';
      title.textContent = feature.title;
      
      const description = document.createElement('p');
      description.className = 'body';
      description.textContent = feature.description;
      
      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(description);
      
      featuresGrid.appendChild(card);
    });
    
    whyUsContent.appendChild(heading);
    whyUsContent.appendChild(featuresGrid);
    
    whyUsContainer.appendChild(whyUsContent);
  }

  createFreshFoodIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
    
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M8 14l2 2 4-4');
    
    svg.appendChild(path1);
    svg.appendChild(path2);
    return svg;
  }

  createBestOfferIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z');
    
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 6v6m0 0v6m0-6h6m-6 0H6');
    
    svg.appendChild(path1);
    svg.appendChild(path2);
    return svg;
  }

  createFastDeliveryIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M13 10V3L4 14h7v7l9-11h-7z');
    
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 19l3 3 3-3-3-3-3 3z');
    
    svg.appendChild(path1);
    svg.appendChild(path2);
    return svg;
  }
}
