// Explicitly import all assets to ensure they're bundled by Vite
import plateSmoothie from '../assets/plate-smoothie.svg';
import plateRiceSalad from '../assets/plate-rice-salad.svg';
import plateSteak from '../assets/plate-steak.svg';
import plateBeefNoodles from '../assets/plate-beef-noodles.svg';
import plateAvocadoBowl from '../assets/plate-avocado-bowl.svg';
import plateMediterraneanSalad from '../assets/plate-mediterranean-salad.svg';
import plateTomatoSoup from '../assets/plate-tomato-soup.svg';
import plateSalmon from '../assets/plate-salmon.svg';

import avatarSarah from '../assets/avatar-salah.svg';
import avatarMichael from '../assets/avatar-mina.svg';
import avatarEmily from '../assets/avatar-ethan.svg';

import icFresh from '../assets/ic-fresh.svg';
import icOffer from '../assets/ic-offer.svg';
import icDelivery from '../assets/ic-delivery.svg';

import heroImage from '../assets/hero.svg';

import ingAvocado from '../assets/ing-avocado.svg';
import ingTomato from '../assets/ing-tomato.svg';
import ingLemon from '../assets/ing-lemon.svg';
import ingHerb from '../assets/ing-herb.svg';

// Create a mapping of filenames to imported assets
const assetMap = {
  // Menu plates
  'plate-smoothie.svg': plateSmoothie,
  'plate-rice-salad.svg': plateRiceSalad,
  'plate-steak.svg': plateSteak,
  'plate-beef-noodles.svg': plateBeefNoodles,
  'plate-avocado-bowl.svg': plateAvocadoBowl,
  'plate-mediterranean-salad.svg': plateMediterraneanSalad,
  'plate-tomato-soup.svg': plateTomatoSoup,
  'plate-salmon.svg': plateSalmon,
  
  // Avatars
  'avatar-salah.svg': avatarSarah,
  'avatar-mina.svg': avatarMichael,
  'avatar-ethan.svg': avatarEmily,
  
  // Icons
  'ic-fresh.svg': icFresh,
  'ic-offer.svg': icOffer,
  'ic-delivery.svg': icDelivery,
  
  // Hero
  'hero.svg': heroImage,
  
  // Ingredients
  'ing-avocado.svg': ingAvocado,
  'ing-tomato.svg': ingTomato,
  'ing-lemon.svg': ingLemon,
  'ing-herb.svg': ingHerb,
};

export function getAsset(filename) {
  const url = assetMap[filename];
  if (!url) {
    console.warn('[assets] Missing asset:', filename);
    return '';
  }
  return url;
}
