import { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { PDFDocument } from "npm:pdf-lib";
import Tesseract from "npm:tesseract.js";

export const pngToPdf = async (
  inputPath: string,
  outputPath: string,
): Promise<void> => {
  // Lire l'image PNG
  const pngBytes = await Deno.readFile(inputPath);

  // Créer un nouveau PDF
  const pdfDoc = await PDFDocument.create();
  const pngImage = await pdfDoc.embedPng(pngBytes);

  // Définir la taille de la page selon l'image
  const page = pdfDoc.addPage([pngImage.width, pngImage.height]);
  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: pngImage.width,
    height: pngImage.height,
  });

  // S'assurer que le dossier output existe
  await ensureDir("output");

  // Sauvegarder le PDF
  const pdfBytes = await pdfDoc.save();
  await Deno.writeFile(outputPath, pdfBytes);
};

// Fonction qui lit un fichier PNG et retourne le texte reconnu par Tesseract.js
export const readPngText = async (
  pngPath: string,
  lang = "fra",
): Promise<string> => {
  const { data } = await Tesseract.recognize(pngPath, lang);
  return data.text;
};
