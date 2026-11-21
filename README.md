# TravelPlanner: offline reisplanner voor iPhone

De app is een gewone webpagina die offline werkt en die je op je beginscherm zet. Alles is gratis. Je hebt enkel één gratis GitHub-account nodig om de bestanden online te zetten.

## 1. Online zetten

Deze repo wordt gehost met **GitHub Pages** op:
**https://bmangodt.github.io/TravelPlanner/**

(Staat Pages nog niet aan? Ga naar **Settings → Pages** en kies bij *Branch* `main` en `/ (root)`, klik **Save**.)

Je reisgegevens staan **niet** op GitHub, ze blijven alleen op je iPhone. GitHub bewaart enkel de lege app.

## 2. Op je iPhone zetten

1. Open de link in **Safari**.
2. Tik op het deel-icoon → **Zet op beginscherm**.
3. Open de app voortaan via het icoon. Zo werkt ze offline en bewaart iOS je gegevens het best.

Let op: de app op je beginscherm en de pagina in Safari hebben elk hun eigen opslag. Werk dus steeds via het icoon.

## 3. Voor vertrek (met wifi)

- Geef je reis in: **Meer → Nieuwe reis**, daarna je verblijven en per dag je plaatsen en routes.
- Een plaats zoeken lukt enkel met internet. Offline kan je coördinaten of een Google Maps-link plakken, of een punt op de kaart aantikken.
- Bekijk elke dag een keer en zoom op de kaart in en uit rond je plaatsen. Die kaartstukken worden bewaard voor offline gebruik.
- Download in **Apple Kaarten** een offline kaart van je bestemming, zodat navigeren ook zonder internet lukt.
- Maak een **back-up** (Meer → Back-up maken → Bewaar in Bestanden/iCloud Drive).

## 4. PDF maken

Tik op **PDF / afdrukken**. Tik in het afdrukscherm op het deel-icoon en kies **Bewaar in Bestanden**, of druk meteen af via AirPrint. Op een computer kies je **Opslaan als PDF**.

## Aanpassen of bijwerken

De broncode staat in `src/` (`python3 src/build.py` vanuit `src/` met Leaflet 1.9.4 in `node_modules`). Een nieuwe versie zet je online door `index.html` (en eventueel `sw.js`) te vervangen. Je ingegeven reizen blijven behouden.
