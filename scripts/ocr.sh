#!/bin/bash
# Version 0.7.0.0

REPORIG="$1"
REPEXTRACT="$2"
CROPHAUT="$3"
CROPBAS="$4"
CROPGAUCHE="$5"
CROPDROITE="$6"

echo "Répertoire d'origine :  $REPORIG"
echo "Répertoire temporaire : $REPEXTRACT"

REPORIG=$(cd "$REPORIG" && pwd)
REPEXTRACT=$(cd "$REPEXTRACT" && pwd)

cd "$REPORIG" || exit 1

for pdf in *.pdf; do
  echo "   Fichier traité :     \"$pdf\""
  echo "      Création des répertoires de travail temporaires"
  rm -rf "$REPEXTRACT/Travail"
  mkdir -p "$REPEXTRACT/Travail/xpdf-tools" \
           "$REPEXTRACT/Travail/imagemagick" \
           "$REPEXTRACT/Travail/pdftk" \
           "$REPEXTRACT/Travail/tesseract"

  echo "      Extraction du PDF en format image"
  pdftopng "$pdf" "$REPEXTRACT/Travail/xpdf-tools/${pdf%.pdf}"

  cd "$REPEXTRACT/Travail/xpdf-tools" || exit 1

  echo "      Pré-traitement"
  for img in *.png; do
    convert "$img" -auto-level \
      -auto-threshold OTSU -auto-gamma -unsharp 0x0.75+0.75+0.008 \
      -resize 2970x2970 \
      -crop +"$CROPGAUCHE"0+"$CROPHAUT"0 \
      -crop -"${CROPDROITE}0"-"${CROPBAS}0" \
      -bordercolor White -border 10x10 -alpha off \
      -deskew 40% \
      "$REPEXTRACT/Travail/imagemagick/$img"
  done
  rm -f *.png

  cd "$REPEXTRACT/Travail/imagemagick" || exit 1

  echo "      OCR"
  for img in *.png; do
    tesseract --oem 1 --psm 1 "$img" "$REPEXTRACT/Travail/tesseract/${img%.png}" -l fra+eng pdf
  done
  rm -f *.png

  cd "$REPEXTRACT/Travail/tesseract" || exit 1

  echo "      Génération du PDF Texte"
  pdftk *.pdf cat output "$REPEXTRACT/Travail/pdftk/${pdf%.pdf}.pdf"
  rm -f *.pdf

  cd "$REPEXTRACT/Travail/pdftk" || exit 1

  echo "      Extraction sous différents formats texte"
  for p in *.pdf; do
    pdftotext -simple "$p" "${p}_avec_colonnes.txt"
    pdftotext -simple2 "$p" "${p}_simple_espace_superflu.txt"
  done

  SORTIE_DIR="${REPORIG}/_Sortie"
  mkdir -p "$SORTIE_DIR"

  # Déplacement des fichiers générés
  for o in *; do
    mv "$o" "$SORTIE_DIR/"
  done

  echo "      Suppression des répertoires de travail temporaires"
  cd "$REPEXTRACT" || exit 1
  rm -rf Travail
done

echo "Nettoyage"
rm -rf "$REPEXTRACT/Outils"

cd "$REPORIG" || exit 1

echo "Traitement de l'arborescence terminée"


## magick-wasm
# Une version d'imageMagick en WASM ([référence](https://github.com/dlemstra/magick-wasm?tab=readme-ov-file)).
# Le code peut tourner sur le client ou sur un serveur Node.