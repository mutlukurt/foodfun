const files = import.meta.glob('../assets/*.{svg,png,jpg,jpeg,webp}', { eager: true, as: 'url' });

export function getAsset(filename) {
  const key = `../assets/${filename}`;
  const url = files[key];
  if (!url) {
    console.warn('[assets] Missing asset:', filename);
    return '';
  }
  return url;
}
