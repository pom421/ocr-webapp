import { test, expect } from '@playwright/test';
import { calculateBasicSimilarity, calculateLevenshteinSimilarity, THRESHOLD_BASIC, THRESHOLD_LEVENSHTEIN } from './textComparison.js';

const EXPECTED_TEXT = `«Nous sommes à la veille de la désillusion» : le père de l'assistant vocal
Siri dénonce les mensonges et les mythes autour des lA génératives"

Par Chloé Woitier

Luc Julia, cocréateur de l'assistant vocal Siri et directeur scientifique de Renault depuis
2021.

RENCONTRE - Luc Julia s'attaque dans l'ouvrage lA génératives, pas créatives (Le Cherche midi) aux idées fausses qui circulent autour des modèles de langage qui ont donné naissance à ChatGPT.
Luc Julia récidive. Six ans après la parution de son livre de vulgarisation L'intelligence artificielle n'existe pas, l'ingénieur français, devenu célèbre pour avoir cocréé l'assistant vocal Siri, vendu à Apple en 2010, s'attaque dans l'ouvrage IA génératives, pas créatives (Le Cherche midi) aux idées fausses qui circulent autour des modèles de langage qui ont donné naissance à ChatGPT. « J'essaye de faire la différence entre les mythes et la réalité, et surtout de faire attention au vocabulaire. Le terme "intelligence artificielle" m'embête, car le mot
"intelligence" amène des fantasmes anthropomorphiques. Cela fait croire que ces systèmes pensent comme nous, alors que cela n'a rien à voir », explique-t-il au Figaro depuis la Silicon Valley.

À découvrir

PODCAST - Écoutez le dernier épisode de notre série Questions Tech

Celui qui est devenu en 2021 directeur scientifique de Renault, après avoir été vice-président de Samsung chargé de l'innovation, s'agace du bruit ambiant autour de la « révolution lA » qui charrie son lot de croyances erronées sur les capacités réelles de ces algorithmes. « Cela m'horripile d'entendre que les IA seraient créatives. Les IA n'inventent rien. La créativité est du côté de l'humain », souligne le Toulousain, qui`;

test.describe('OCR Text Tests', () => {
  test('should extract text from texte.png', async ({ page }) => {
    await page.goto('/');

    // Upload file and trigger the change event
    await page.setInputFiles('#fileInput', 'inputs/texte.png');
    await page.dispatchEvent('#fileInput', 'change');

    await page.waitForSelector('.fr-result-textarea', { state: 'visible' });

    await page.waitForFunction(() => {
      const textarea = document.querySelector('.fr-result-textarea');
      return textarea && textarea.value.length > 10;
    }, { timeout: 45000 });

    const ocrText = await page.inputValue('.fr-result-textarea');

    const basicSimilarity = calculateBasicSimilarity(ocrText, EXPECTED_TEXT);
    const levenshteinSimilarity = calculateLevenshteinSimilarity(ocrText, EXPECTED_TEXT);

    const basicPercentage = Math.round(basicSimilarity * 100);
    const levenshteinPercentage = Math.round(levenshteinSimilarity * 100);

    console.log(`Texte OCR extrait: "${ocrText}"`);
    console.log(`Texte attendu: "${EXPECTED_TEXT}"`);
    console.log(`Similarité basique: ${basicPercentage}%`);
    console.log(`Similarité Levenshtein: ${levenshteinPercentage}%`);

    expect(basicSimilarity).toBeGreaterThan(THRESHOLD_BASIC);
    expect(levenshteinSimilarity).toBeGreaterThan(THRESHOLD_LEVENSHTEIN);
    expect(ocrText.length).toBeGreaterThan(0);
  });
});
