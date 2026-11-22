# Startfrage – Beitrag Ute Gerstner

**Entwurf von Claude (KI-Agent Ute) · Status: zu prüfen**
Auftrag laut 00_Startfrage: Jahresauszug 2022 nehmen, Summenzeilen nachrechnen, Dateiname gegen Jahr prüfen, Umsatzsteuer je Monat prüfen.

## 1. Jahresauszug 2022 nachgerechnet

Quelle: 04_Datenraum/03, **03.11.04.025_2023-01-25** (Blatt „Mietkonto Jahresauszug 2022“)

| Spalte | je Monat (Jan–Dez gleich) | × 12 | Summenzeile im Auszug | passt? |
|---|---|---|---|---|
| Miete netto | 6.121,32 € | 73.455,84 € | 73.455,84 € | ja |
| Betriebskosten | 3.521,70 € | 42.260,40 € | 42.260,40 € | ja |
| Umsatzsteuer | 1.832,17 € | 21.986,04 € | 21.986,04 € | ja |
| Gesamt | 11.475,19 € | 137.702,28 € | 137.702,28 € | ja |

Zeilenprobe: 6.121,32 + 3.521,70 + 1.832,17 = 11.475,19 € ✔
Hinweis: Die Datei hat ein leeres Zusatzblatt „Tabelle1“ – ohne Inhalt, keine Auswirkung.

## 2. Dateiname gegen Jahr

Der Dateiname nennt das **Ausstellungsdatum** (Januar des Folgejahres), nicht das Jahr der Zahlen.

| Datei | Datum im Namen | Jahr im Inhalt |
|---|---|---|
| 03.11.03.022 | 2021-01-11 | **2020** |
| 03.11.04.006 | 2022-01-18 | **2021** |
| 03.11.04.025 | 2023-01-25 | **2022** |
| 03.11.05.005 | 2024-01-16 | **2023** |
| 03.11.05.025 | 2025-01-23 | **2024** |
| 03.11.06.008 | 2026-01-12 | **2025** |

Geprüft: Kopfdaten-Blatt und alle Monatszeilen (z. B. „2022-01“ bis „2022-12“). In jeder Datei steckt genau ein Jahr, kein Jahr fehlt, keines doppelt. Wer „die Datei von 2023“ greift, bekommt die Zahlen von 2022 – das ist die Falle.

## 3. Umsatzsteuer je Monat gegen den Vertrag

Vertrag § 6 (DOCX und Scan S. 2 übereinstimmend): Steuer kommt auf Miete **und** Betriebskostenvorauszahlung, Satz bei Beginn 19 %, „der Steuersatz folgt dem Gesetz“.

| Zeitraum | USt ÷ (Miete + BK) | Ergebnis |
|---|---|---|
| Jan–Jun 2020 | 1.752,14 ÷ 9.221,82 | 19,0 % |
| Jul–Dez 2020 | 1.475,49 ÷ 9.221,82 | **16,0 %** |
| 2021–2025, jeder Monat | z. B. 2022: 1.832,17 ÷ 9.643,02 | 19,0 % |

**Satz zur Umsatzsteuer:** Die Umsatzsteuer passt in allen 72 Monaten zum Vertrag. Juli bis Dezember 2020 stehen 16 %, weil der Gesetzgeber den Satz in diesem Halbjahr befristet gesenkt hat; § 6 lässt den Satz dem Gesetz folgen.
Rundung: Die Steuer ist je Posten gerundet und dann addiert (Abweichung höchstens 0,01 €, z. B. 2024).

## Für die Prüfung durch Ute (bitte abhaken)
- [ ] Eine Monatszeile 2022 selbst im Original nachgerechnet
- [ ] § 6 im Scan (Seite 2) selbst gelesen
- [ ] Befristete Senkung 2. Halbjahr 2020 mit eigener Quelle belegt (Gesetzesquelle notieren)
