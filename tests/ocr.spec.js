import { test, expect } from '@playwright/test';
import { calculateBasicSimilarity, calculateLevenshteinSimilarity } from './textComparison.js';

const EXPECTED_TABLE_TEXT = `A B C D E

85 10 79,00 € 26 32
11 89 64,00 € 41 30
17 1 31,00 € 35 96
59 48 58,00 € 70 17
5 31 10,00 € 27 9
68 29 19,00 € 66 35
76 27 18,00 € 84 71
68 46 75,00 € 2 69
79 64 36,00 € 16 55
55 23 59,00 € 36 62
52 75 12,00 € 71 55
69 21 52,00 € 16 78
32 19 27,00 € 12 28
44 11 33,00 € 99 43
91 48 76,00 € 92 92
63 55 87,00 € 87 82
86 96 42,00 € 28 38
55 16 48,00 € 82 92
87 7 97,00 € 1 75
93 80 92,00 € 90 74
82 10 94,00 € 69 2
1 32 47,00 € 42 14
50 79 81,00 € 25 89
67 16 2,00 € 28 42
11 55 58,00 € 1 82
36 80 67,00 € 70 7
89 82 28,00 € 76 51`;

test.describe('OCR Tests', () => {
  test('should extract text from table.png', async ({ page }) => {
    await page.goto('/');

    // Upload file and trigger the change event
    await page.setInputFiles('#fileInput', 'inputs/table.png');
    await page.dispatchEvent('#fileInput', 'change');

    await page.waitForSelector('.fr-result-textarea', { state: 'visible' });

    await page.waitForFunction(() => {
      const textarea = document.querySelector('.fr-result-textarea');
      return textarea && textarea.value.length > 10;
    }, { timeout: 45000 });

    const ocrText = await page.inputValue('.fr-result-textarea');

    const basicSimilarity = calculateBasicSimilarity(ocrText, EXPECTED_TABLE_TEXT);
    const levenshteinSimilarity = calculateLevenshteinSimilarity(ocrText, EXPECTED_TABLE_TEXT);

    const basicPercentage = Math.round(basicSimilarity * 100);
    const levenshteinPercentage = Math.round(levenshteinSimilarity * 100);

    console.log(`Texte OCR extrait: "${ocrText}"`);
    console.log(`Texte attendu: "${EXPECTED_TABLE_TEXT}"`);
    console.log(`Similarité basique: ${basicPercentage}%`);
    console.log(`Similarité Levenshtein: ${levenshteinPercentage}%`);

    expect(basicSimilarity).toBeGreaterThan(0.6);
    expect(levenshteinSimilarity).toBeGreaterThan(0.4);
    expect(ocrText.length).toBeGreaterThan(0);
  });
});
