/**
 * Base-aware asset URL resolver for Vite
 * Uses imported assets from manifest for proper Vite processing
 */
import * as assets from '../assets/index.js';

// Asset mapping for easy lookup
const assetMap = {
  // Menu plates
  'plate-smoothie.svg': assets.plateSmoothie,
  'plate-rice-salad.svg': assets.plateRiceSalad,
  'plate-steak.svg': assets.plateSteak,
  'plate-beef-noodles.svg': assets.plateBeefNoodles,
  'plate-avocado-bowl.svg': assets.plateAvocadoBowl,
  'plate-mediterranean-salad.svg': assets.plateMediterraneanSalad,
  'plate-tomato-soup.svg': assets.plateTomatoSoup,
  'plate-salmon.svg': assets.plateSalmon,
  
  // Avatars
  'avatar-salah.svg': assets.avatarSarah,
  'avatar-mina.svg': assets.avatarMichael,
  'avatar-ethan.svg': assets.avatarEmily,
  
  // Icons
  'ic-fresh.svg': assets.icFresh,
  'ic-offer.svg': assets.icOffer,
  'ic-delivery.svg': assets.icDelivery,
  
  // Other images
  'hero.svg': assets.hero,
  'favicon.svg': assets.favicon,
  
  // Ingredients
  'ing-avocado.svg': assets.ingAvocado,
  'ing-tomato.svg': assets.ingTomato,
  'ing-lemon.svg': assets.ingLemon,
  'ing-herb.svg': assets.ingHerb,
};

export const assetUrl = (file) => {
  if (assetMap[file]) {
    return assetMap[file];
  }
  
  // Fallback for any unmapped assets
  console.warn(`Asset not found in manifest: ${file}`);
  return new URL(`./assets/${file}`, import.meta.url).href;
};
