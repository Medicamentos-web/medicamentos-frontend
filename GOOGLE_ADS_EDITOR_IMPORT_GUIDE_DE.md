# Google Ads Editor Import Guide (MediControl)

Dateien (neu, stabil ohne Zeilentyp-Fehler):
- `ADS_EDITOR_01_CAMPAIGNS_DE.csv`
- `ADS_EDITOR_02_ADGROUPS_DE.csv`
- `ADS_EDITOR_03_KEYWORDS_DE.csv`
- `ADS_EDITOR_04_RSA_DE.csv`
- `ADS_EDITOR_05_NEGATIVE_KEYWORDS_DE.csv`

## Reihenfolge (wichtig)
1. **Kampagnen**
2. **Anzeigengruppen**
3. **Keywords**
4. **RSA Anzeigen**
5. **Negative Keywords**

## Schritte in Google Ads Editor
1. Google Ads Editor offnen
2. Konto auswahlen
3. `Account -> Import -> From file...`
4. Datei `ADS_EDITOR_01_CAMPAIGNS_DE.csv` laden
5. Beim Mapping:
   - Trennzeichen: `,`
   - Textqualifizierer: `"`
   - Neue Elemente ubernehmen
6. Import abschliessen und Entwurfsanderungen prufen
7. Nacheinander importieren:
   - `ADS_EDITOR_02_ADGROUPS_DE.csv`
   - `ADS_EDITOR_03_KEYWORDS_DE.csv`
   - `ADS_EDITOR_04_RSA_DE.csv`
   - `ADS_EDITOR_05_NEGATIVE_KEYWORDS_DE.csv`
8. Danach auf **Post** klicken

## Nach dem Import sofort anpassen
- Endgultige Landing URL pro Anzeigegruppe
- Budget pro Kampagne
- Conversion-Tracking aktiv und korrekt
- Standortsprache (Deutsch) kontrollieren

## Checkliste vor Live-Schaltung
- Keine Policy-Fehler
- Keine disapproved Ads/Assets
- Negative Keywords auf Kampagnenebene aktiv
- Mindestens 1 RSA pro Anzeigengruppe aktiv

## Hinweis
Bei diesen Dateien gibt es jeweils nur einen klaren Entitätstyp. Das vermeidet den Fehler `Zweideutiger Zeilentyp`.
