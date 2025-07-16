export const THRESHOLD_BASIC = 0.6;
export const THRESHOLD_LEVENSHTEIN = 0.4;

// Similarité précision basique
// - Normalisation : conversion en minuscules et nettoyage des espaces
// - Tokenisation : découpage en mots
// - Intersection : compte les mots communs entre les deux textes
// - Score : ratio mots_communs / max(longueur_texte1, longueur_texte2)
// Limitations : Pas d'ordre, pas de position, sensible aux doublons, pas de tolérance au formatage
export const calculateBasicSimilarity = (text1, text2) => {
  const normalize = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();

  const normalizedText1 = normalize(text1);
  const normalizedText2 = normalize(text2);

  if (normalizedText1 === normalizedText2) return 1;

  const words1 = normalizedText1.split(' ');
  const words2 = normalizedText2.split(' ');

  const commonWords = words1.filter(word => words2.includes(word));
  const totalWords = Math.max(words1.length, words2.length);

  return totalWords > 0 ? commonWords.length / totalWords : 0;
};

// Similarité Levenshtein
// - Mesure le nombre minimum d'opérations (insertion, suppression, substitution) pour transformer un texte en l'autre
// - Tolère mieux les variations de formatage
// - Préserve la notion d'ordre et de structure
// - Plus adapté au contenu tabulaire et aux données structurées
export const calculateLevenshteinSimilarity = (text1, text2) => {
  const normalize = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim();

  const str1 = normalize(text1);
  const str2 = normalize(text2);

  if (str1 === str2) return 1;

  const len1 = str1.length;
  const len2 = str2.length;

  if (len1 === 0) return len2 === 0 ? 1 : 0;
  if (len2 === 0) return 0;

  const matrix = Array(len2 + 1).fill().map(() => Array(len1 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[0][i] = i;
  for (let j = 0; j <= len2; j++) matrix[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,     // insertion
        matrix[j][i - 1] + 1,     // suppression
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }

  const distance = matrix[len2][len1];
  const maxLength = Math.max(len1, len2);

  return maxLength > 0 ? 1 - (distance / maxLength) : 1;
};

