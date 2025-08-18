import { assetUrl } from '../utils/assetUrl';

export class FloatingIngredients {
  constructor() {
    this.ingredients = [
      { name: 'avocado', label: 'Fresh avocado slice', color: '#90EE90' },
      { name: 'tomato', label: 'Ripe tomato', color: '#FF6347' },
      { name: 'lemon', label: 'Fresh lemon slice', color: '#FFD700' },
      { name: 'herb', label: 'Herb leaf', color: '#228B22' }
    ];
  }

  async renderFloatingIngredients(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fi-wrap';
    
    for (const ingredient of this.ingredients) {
      const svgElement = await this.createIngredientSVG(ingredient);
      wrapper.appendChild(svgElement);
    }
    
    container.appendChild(wrapper);
  }

  async createIngredientSVG(ingredient) {
    try {
      // Use assetUrl helper for base-aware SVG resolution
      const svgUrl = assetUrl(`ing-${ingredient.name}.svg`);
      
      // Try to fetch the SVG file
      const response = await fetch(svgUrl);
      if (response.ok) {
        const svgText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        
        if (svg) {
          // Clone the SVG and add our attributes
          const clonedSvg = svg.cloneNode(true);
          this.setSVGAttributes(clonedSvg, ingredient);
          return clonedSvg;
        }
      }
    } catch (error) {
      console.warn(`Failed to load ${ingredient.name} SVG, using fallback:`, error);
    }
    
    // Fallback to simple circle SVG
    return this.createFallbackSVG(ingredient);
  }

  setSVGAttributes(svg, ingredient) {
    svg.setAttribute('class', 'fi');
    svg.setAttribute('data-name', ingredient.name);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', ingredient.label);
    svg.setAttribute('aria-hidden', 'false');
    
    // Ensure proper sizing
    svg.style.width = '100%';
    svg.style.height = '100%';
  }

  createFallbackSVG(ingredient) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'fi');
    svg.setAttribute('data-name', ingredient.name);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', ingredient.label);
    svg.setAttribute('aria-hidden', 'false');
    
    // Create a simple circle as fallback
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '10');
    circle.setAttribute('fill', ingredient.color);
    circle.setAttribute('opacity', '0.8');
    
    // Add a small accent for visual interest
    const accent = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    accent.setAttribute('cx', '8');
    accent.setAttribute('cy', '8');
    accent.setAttribute('r', '3');
    accent.setAttribute('fill', 'rgba(255,255,255,0.3)');
    
    svg.appendChild(circle);
    svg.appendChild(accent);
    
    return svg;
  }
}
