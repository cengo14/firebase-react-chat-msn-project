// utils/colorGenerator.js

/**
 * Basit bir hash fonksiyonu, string'i sayıya dönüştürür
 * @param {string} str - Kullanıcı ID'si
 * @returns {number} - Hashlenmiş sayı
 */

// utils/colorGenerator.js

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

const colorCache = {};

export const getColorFromUserIdCached = (userId) => {
  if (colorCache[userId]) {
    return colorCache[userId];
  }
  const hash = hashCode(userId);
  const hue = Math.abs(hash) % 360;
  const color = `hsl(${hue}, 70%, 60%)`;
  colorCache[userId] = color;
  return color;
};
