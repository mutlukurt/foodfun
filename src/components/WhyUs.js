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
        icon: this.createIconImg('/assets/ic-fresh.svg', 'Freshness star icon'),
        title: 'Fresh Food',
        description: 'We use only the freshest, locally-sourced ingredients to ensure every dish is bursting with flavor and nutrition.'
      },
      {
        icon: this.createIconImg('/assets/ic-offer.svg', 'Special offer badge icon'),
        title: 'Best Offer',
        description: 'Enjoy competitive prices and special deals on our signature dishes, making quality dining accessible to everyone.'
      },
      {
        icon: this.createIconImg('/assets/ic-delivery.svg', 'Fast delivery truck icon'),
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

  createIconImg(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.width = 60;
    img.height = 60;
    img.loading = 'lazy';
    img.style.filter = 'invert(var(--icon-invert, 0))';
    return img;
  }
}
