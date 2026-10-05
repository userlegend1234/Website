# Immovana Website

One-Pager für Immovana – „Immobilien, persönlich begleitet.“ Fokus: Verkäuferinnen und Verkäufer, kostenloses Erstgespräch.
Reines HTML/CSS/JS, kein Framework, kein Build-Schritt.

| Datei | Inhalt |
| --- | --- |
| `index.html` | Hero, Verkaufen, Versprechen, Ablauf (6 Schritte), FAQ, Kontakt mit 3-Schritt-Anfrage |
| `styles.css` | Alle Styles – Farben als CSS-Variablen ganz oben (`--ink`, `--brass` …) |
| `script.js` | Animationen (Strichzeichnung, Scroll-Effekte, 3D-Neigung, magnetische Buttons), Menü, Formular |
| `favicon.svg` | Icon |

## Vorschau

`python3 -m http.server` im Ordner `immovana/` und http://localhost:8000 öffnen.

## Noch zu erledigen

- Kontaktdaten in `index.html` prüfen/ergänzen (Telefon, Adresse; E-Mail `info@immovana.ch` ist angenommen) – mit `TODO` markiert
- E-Mail-Adresse auch in `script.js` (mailto) anpassen, falls anders
- Formular: aktuell öffnet sich das E-Mail-Programm. Für echten Versand z.B. Formspree/Netlify Forms anbinden (`TODO` in `script.js`)
- Impressum- und Datenschutz-Links im Footer verlinken
- Optional: echte Fotos (Team, Objekte) ergänzen
