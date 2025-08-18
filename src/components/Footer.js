export class Footer {
  constructor() {
    this.init();
  }

  init() {
    this.createFooter();
  }

  createFooter() {
    const footerContainer = document.querySelector('#footer');
    
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-container container';
    
    // Brand column
    const brandColumn = this.createBrandColumn();
    
    // Quick links column
    const quickLinksColumn = this.createQuickLinksColumn();
    
    // Support links column
    const supportColumn = this.createSupportColumn();
    
    // Contact info column
    const contactColumn = this.createContactColumn();
    
    // Social media column
    const socialColumn = this.createSocialColumn();
    
    footerContent.appendChild(brandColumn);
    footerContent.appendChild(quickLinksColumn);
    footerContent.appendChild(supportColumn);
    footerContent.appendChild(contactColumn);
    footerContent.appendChild(socialColumn);
    
    // Footer bottom
    const footerBottom = document.createElement('div');
    footerBottom.className = 'footer-bottom container';
    
    const copyright = document.createElement('p');
    copyright.textContent = `© ${new Date().getFullYear()} FoodFun Restaurant. All rights reserved.`;
    
    footerBottom.appendChild(copyright);
    
    footerContainer.appendChild(footerContent);
    footerContainer.appendChild(footerBottom);
  }

  createBrandColumn() {
    const column = document.createElement('div');
    column.className = 'footer-column';
    
    const brand = document.createElement('h3');
    brand.textContent = 'FoodFun';
    brand.style.color = 'var(--brand)';
    brand.style.fontSize = '24px';
    brand.style.fontWeight = '800';
    
    const description = document.createElement('p');
    description.textContent = 'Delivering exceptional dining experiences with fresh ingredients and innovative flavors since 2018.';
    description.style.marginTop = 'var(--space-sm)';
    description.style.lineHeight = '1.6';
    
    column.appendChild(brand);
    column.appendChild(description);
    
    return column;
  }

  createQuickLinksColumn() {
    const column = document.createElement('div');
    column.className = 'footer-column';
    
    const heading = document.createElement('h3');
    heading.textContent = 'Quick Links';
    
    const links = document.createElement('ul');
    links.className = 'footer-links';
    
    const quickLinks = [
      { href: '#hero', text: 'Home' },
      { href: '#about', text: 'About' },
      { href: '#menu', text: 'Menu' },
      { href: '#newsletter', text: 'Contact' }
    ];
    
    quickLinks.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      
      // Add smooth scroll behavior
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.smoothScrollTo(link.href);
      });
      
      li.appendChild(a);
      links.appendChild(li);
    });
    
    column.appendChild(heading);
    column.appendChild(links);
    
    return column;
  }

  createSupportColumn() {
    const column = document.createElement('div');
    column.className = 'footer-column';
    
    const heading = document.createElement('h3');
    heading.textContent = 'Support';
    
    const links = document.createElement('ul');
    links.className = 'footer-links';
    
    const supportLinks = [
      { href: '#', text: 'Help Center' },
      { href: '#', text: 'Privacy Policy' },
      { href: '#', text: 'Terms of Service' },
      { href: '#', text: 'FAQ' }
    ];
    
    supportLinks.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      links.appendChild(li);
    });
    
    column.appendChild(heading);
    column.appendChild(links);
    
    return column;
  }

  createContactColumn() {
    const column = document.createElement('div');
    column.className = 'footer-column';
    
    const heading = document.createElement('h3');
    heading.textContent = 'Contact Info';
    
    const contactInfo = document.createElement('div');
    contactInfo.style.marginTop = 'var(--space-sm)';
    
    const address = document.createElement('p');
    address.innerHTML = '<strong>Address:</strong><br>123 Food Street<br>Culinary District, NY 10001';
    address.style.marginBottom = 'var(--space-sm)';
    
    const phone = document.createElement('p');
    phone.innerHTML = '<strong>Phone:</strong><br>+1 (555) 123-4567';
    phone.style.marginBottom = 'var(--space-sm)';
    
    const email = document.createElement('p');
    email.innerHTML = '<strong>Email:</strong><br>hello@foodfun.com';
    
    contactInfo.appendChild(address);
    contactInfo.appendChild(phone);
    contactInfo.appendChild(email);
    
    column.appendChild(heading);
    column.appendChild(contactInfo);
    
    return column;
  }

  createSocialColumn() {
    const column = document.createElement('div');
    column.className = 'footer-column';
    
    const heading = document.createElement('h3');
    heading.textContent = 'Follow Us';
    
    const socialLinks = document.createElement('div');
    socialLinks.className = 'footer-social';
    
    const socialPlatforms = [
      { name: 'Facebook', icon: this.createFacebookIcon(), href: '#' },
      { name: 'Twitter', icon: this.createTwitterIcon(), href: '#' },
      { name: 'Instagram', icon: this.createInstagramIcon(), href: '#' },
      { name: 'LinkedIn', icon: this.createLinkedInIcon(), href: '#' }
    ];
    
    socialPlatforms.forEach(platform => {
      const link = document.createElement('a');
      link.href = platform.href;
      link.setAttribute('aria-label', `Follow us on ${platform.name}`);
      link.appendChild(platform.icon);
      socialLinks.appendChild(link);
    });
    
    column.appendChild(heading);
    column.appendChild(socialLinks);
    
    return column;
  }

  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  createFacebookIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z');
    
    svg.appendChild(path);
    return svg;
  }

  createTwitterIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z');
    
    svg.appendChild(path);
    return svg;
  }

  createInstagramIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323z');
    
    svg.appendChild(path);
    return svg;
  }

  createLinkedInIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z');
    
    svg.appendChild(path);
    return svg;
  }
}
