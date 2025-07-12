export const calculateSimilarity = (text1, text2) => {
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
