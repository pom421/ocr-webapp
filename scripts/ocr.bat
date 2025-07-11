@rem Version 0.7.0.0
@echo off
@CHCP 1252 1>nul 2>nul
@SET REPORIG=%1
@SET REPEXTRACT=%2
@SET CROPHAUT=%3
@SET CROPBAS=%4
@SET CROPGAUCHE=%5
@SET CROPDROITE=%6
@echo Répertoire d'origine :  %REPORIG%
@echo Répertoire temporaire : %REPEXTRACT%
@set DISQORIG=%REPORIG:~1,2%
@set DISQEXTRACT=%REPEXTRACT:~1,2%
@%DISQEXTRACT%
@cd "%REPEXTRACT%" 1>nul 2>nul
@SET REPEXTRACT=%cd%
@%DISQORIG%
@cd "%REPORIG%" 1>nul 2>nul
@SET REPORIG=%cd%
@for /r %%a in (*.pdf) do (
@cd %%~dpa 1>nul 2>nul
@echo    Fichier traité :     "%%a"
@echo       Création des répertoires de travail temporaires
@rmdir /S /Q "%REPEXTRACT%\Travail" 1>nul 2>nul
@mkdir "%REPEXTRACT%\Travail" 1>nul 2>nul
@cd    "%REPEXTRACT%\Travail" 1>nul 2>nul
@mkdir "%REPEXTRACT%\Travail\xpdf-tools" 1>nul 2>nul
@mkdir "%REPEXTRACT%\Travail\imagemagick" 1>nul 2>nul
@mkdir "%REPEXTRACT%\Travail\pdftk" 1>nul 2>nul
@mkdir "%REPEXTRACT%\Travail\tesseract" 1>nul 2>nul
@echo       Extraction du PDF en format image
@"%REPEXTRACT%\Outils\xpdf-tools\pdftopng.exe" "%%a"
"%REPEXTRACT%\Travail\xpdf-tools\%%~na" 1>nul 2>nul
@cd "%REPEXTRACT%\Travail\xpdf-tools"
%DISQEXTRACT%
@echo       Pré-traitement
@for %%I in (*.png) do (
"%REPEXTRACT%\Outils\ImageMagick\convert.exe" "%%I"  -auto-level
-auto-threshold OTSU -auto-gamma -unsharp 0x0.75+0.75+0.008
-adaptive-resize 2970x2970 -crop +%CROPGAUCHE%0+%CROPHAUT%0 -crop
-%CROPDROITE%0-%CROPBAS%0 -bordercolor White -border 10x10 -alpha off
-deskew 40%% "%REPEXTRACT%\Travail\imagemagick\%%I" 1>nul 2>nul
)
@del /Q *.png 1>nul 2>nul
@cd "%REPEXTRACT%\Travail\imagemagick" 1>nul 2>nul
@echo       OCR
@for %%T in (*.png) do (
"%REPEXTRACT%\Outils\tesseract\tesseract.exe" --oem 1 --psm 1
--tessdata-dir "%REPEXTRACT%\Outils\tesseract\tessdata" "%%T"
"%REPEXTRACT%\Travail\tesseract\%%T" -l fra+eng pdf 1>nul 2>nul
)
@del /Q *.png 1>nul 2>nul
@cd "%REPEXTRACT%\Travail\tesseract" 1>nul 2>nul
@echo       Répertoire de sortie "%%~dpa_Sortie"
@echo       Génération du PDF Texte
@"%REPEXTRACT%\Outils\pdftk\pdftk.exe" *.pdf cat output
"%REPEXTRACT%\Travail\pdftk\%%~na.pdf" 1>nul 2>nul
@del /Q *.pdf 1>nul 2>nul
@cd "%REPEXTRACT%\Travail\pdftk" 1>nul 2>nul
@echo       Extraction sous différents formats texte avec colonnes et
sans espace superflu
@for %%P in (*.pdf) do (
"%REPEXTRACT%\Outils\xpdf-tools\pdftotext.exe" -simple "%%P"
"%%P_avec_colonnes.txt" 1>nul 2>nul
"%REPEXTRACT%\Outils\xpdf-tools\pdftotext.exe" -simple2 "%%P"
"%%P_simple_espace_superflu.txt" 1>nul 2>nul
)
@mkdir "%%~dpa_Sortie" 1>nul 2>nul
@attrib /D +h +s "%%~dpa_Sortie" 1>nul 2>nul
@for %%O in (*) do (
@move "%%O" "%%~dpa_Sortie\%%O" 1>nul 2>nul
@attrib +h +s "%%~dpa_Sortie\%%O"
)
@echo       Suppression des répertoires de travail temporaires
@CD "%REPEXTRACT%" 1>nul 2>nul
@%DISQEXTRACT%
@rmdir /S /Q Travail 1>nul 2>nul
)
@echo Nettoyage
@rmdir /S /Q Outils 1>nul 2>nul
@cd "%REPORIG%" 1>nul 2>nul
@%DISQORIG%
@attrib /S /D -h -s "_Sortie" 1>nul 2>nul
@attrib /S /D -h -s "*.pdf" 1>nul 2>nul
@attrib /S /D -h -s "*.txt" 1>nul 2>nul
@CHCP 850 1>nul 2>nul
@echo on
@echo

@echo Traitement de l'arborescence terminée
@start /b "" cmd /c del /F /Q "%~f0"&exit /b
