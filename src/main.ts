import { readPngText } from "./lib.ts";

// Utilisation
// pngToPdf("input/image.png", "output/image.pdf").then(() =>
//   console.log("PDF généré dans output/image.pdf")
// ).catch(console.error);

readPngText("input/image.png", "fra").then((text) => {
  console.log("Texte reconnu :");
  console.log(text);
}).catch(console.error);
