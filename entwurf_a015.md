# A015 Zählerverzeichnis und Ablesungen prüfen – Petra Sander

**Entwurf von Claude (KI-Agent Petra) · ruht bis auf Weiteres · Status: zu prüfen**
⚠ Befunde aus der Zählerprüfung gehen vor dem 2.12. **nicht** in den Kurschat (Firmenbriefing Abschn. 21).

## 0. Passen Verzeichnis und Ablesungen zusammen?
- Verzeichnis: 56 Zähler (Zaehlerverzeichnis_Neubau.xlsx). Strom: alle 19 Stromzähler haben Ablesungen, keine Ablesung ohne Verzeichniseintrag.
- Wasser: alle Wasserzähler des Verzeichnisses haben Ablesungen. Wärme- und Kältezähler: Ablesedateien (Zaehlerstaende_Waerme/Kaelte) liegen uns **nicht** vor – Thermenfeld wertet sie selbst aus.
- Verzeichnis-Bemerkung bei 10271171 verweist auf „ZAE-1011“ – eine Kennung, die im Verzeichnis sonst nicht vorkommt.

## 1. Fehlerliste

| Zähler | Blatt / Zeile | Datum | Art des Fehlers | Begründung | betroffener Mieter | erfasst von |
|---|---|---|---|---|---|---|
| **21950889** UV Technischer Vertrieb | Strom, Ablesungen, Zeile 5575 | 24.06.2026 | Zählerstand mit einer Stelle zu viel (9.346.940 statt rund 934.694) | Vorwert 931.117 (12.06.), Folgewert 938.632 (06.07.); Sprung +8.415.823 kWh, danach −8.408.308 kWh; Verbrauch-Spalte leer | im Verzeichnis nur „Technischer Vertrieb“ – **Mieter klären (Konrad weiß es)** | Dennis Prange (Torwinkel) |
| 13917722 UV Projektbüros Dachgeschoss | Strom, Zeile 3976 | 26.10.2023 | Schätzung (430.508) liegt **unter** der echten Ablesung vom 16.10. (430.551) | Zählerstand kann nicht sinken | Mieter nicht im Verzeichnis | Dennis Prange |
| 13917722 | Strom, Zeile 3996 | 07.11.2023 | Verbrauch 2.354 kWh passt weder zur Differenz zur Schätzung (4.084) noch zur letzten Ablesung (4.041) | Folgefehler der Schätzung | wie oben | Dennis Prange |
| 23725151 Sanitär Projektberatung | Wasser, Zeile 2387 | 27.03.2023 | Ablesung an einem Zähler, der am 26.03.2023 ausgebaut wurde (Zeile 2384); Stand 1.807 < Ausbaustand 1.808 | Zähler existiert nicht mehr | Pfadklar (Projektberatung) – Zuordnung prüfen | Dennis Prange |
| 21428418 Sanitär Ingenieurplanung OG | Wasser, Zeile 3052 | „12/12/2024“ | Datum im falschen Format | alle anderen Zeilen TT.MM.JJJJ | – | Dennis Prange |

**Nicht als Fehler gewertet:** Wasser-Verbräuche weichen oft um 1 m³ von der Standdifferenz ab (Rundung ganzer m³, systematisch); Corona-Delle beim Hauptwasserzähler März–Mai 2020 (plausibel, Belegung niedriger).

## 2. Zähler mit Eichfrist bis Ende 2027

| Zähler | Medium | Standort | Nächste Eichung | Einstufung |
|---|---|---|---|---|
| 17689936 | Fernwärme | Hauptwärmemengenzähler | 16.01.2022 | **abgelaufen** |
| 14187552 | Kälte | Hauptmengenzähler | 16.01.2022 | **abgelaufen** |
| 10271171 | Fernwärme | Gastronomie Speicherladung | 20.02.2022 | **abgelaufen** |
| 19411823, 14371760, 22621006, 22328699, 26699473, 17780502, 25973957, 10666116 | Fernwärme | Heizkreise Techn. Service, Gebäudesoftware, Projektberatung, Ingenieurplanung OG, **Technischer Vertrieb**, Flex. Projektbüros, Gebäudesoftware Erw., Projektbüros DG | Feb.–März 2022 | **abgelaufen** |
| 25076018 | Trinkwasser | **Hauptwasserzähler** | 23.01.2023 | **abgelaufen** |
| 12791414 / 12503441 | Trinkwasser kalt/warm | Gastronomie Küche / Warmwasser | 30.01.2023 / 30.01.2022 | **abgelaufen** |
| 21428418, 13450301, 26059751 | Trinkwasser | Sanitär Ingenieurplanung OG, Techn. Vertrieb, Flex. Projektbüros | Feb.–März 2023 | **abgelaufen** |
| 20522958, 20962015, 20226913, 18378389 | Fernwärme | Heizkreise Gastronomie, Ingenieurplanung EG, **Messtechnik (wir)**, Lernhafen | 10.01.–11.04.2027 | bis Ende 2027 fällig |

Strom: alle Eichfristen 2033 – unauffällig.

## 3. Wärmezähler an Thermenfeld (Uebergaben/K03)
Alle 18 Fernwärmezähler aus dem Verzeichnis mit Zählernummer, Standort, Eichfrist (Tabelle 2 + vier Altzähler mit Ausbau 2022). Auffälligkeiten im Verzeichnis: Hauptwärmemengenzähler seit 16.01.2022 ohne gültige Eichung; 2022 nur vier von zwölf Heizkreis-Zählern getauscht; acht laufen seit 2022 abgelaufen; Verweis „ZAE-1011“ ohne Entsprechung.
**Bewertung für die Abrechnung 2026 (Einschätzung):** Verbrauchswerte aus Zählern mit abgelaufener Eichfrist dürfen im geschäftlichen Verkehr grundsätzlich nicht verwendet werden; eine Heizkostenabrechnung darauf ist angreifbar. Benennung in der Übergabe: sachlich als „Eichfrist laut Verzeichnis abgelaufen seit …“, ohne Vorwurf – Thermenfeld kann mit der Gegenprüfung (bis 30.11.) einen Tausch belegen, der im Verzeichnis fehlt.

## 4. Korrekturmeldung (wichtigster Fehler) – Entwurf
**Signalsteg_2026-12-02_Zaehlerverzeichnis_Person2_Korrekturmeldung_v1.pdf** · Versand erst nach dem Vortrag am 2.12.
> **An:** Raumlot Objektmanagement GmbH, Farid Mertens · **Kopie:** Torwinkel Gebäudeservice GmbH, Jannik Vogler
> **Betreff:** Korrektur Ablesung Stromzähler 21950889 (Unterverteilung Technischer Vertrieb) vom 24.06.2026
> Im Export des Ablesesystems vom 05.11.2026 steht für den Zähler 21950889 am 24.06.2026 der Stand **9.346.940 kWh** (Zeile 5575). Richtig ist ein Stand von rund **934.694 kWh**.
> Gegenprobe 1 (Zählerverlauf): Vorwert 931.117 kWh am 12.06., Folgewert 938.632 kWh am 06.07.; der Folgeverbrauch 3.937 kWh ergibt rückgerechnet 934.695 kWh.
> Gegenprobe 2 (Hauptzähler): Der Netzübergabezähler 18838817 zeigt im Juni 2026 normale Wochenverbräuche von 30.695–38.283 kWh, keinen Sprung um 8,4 Mio. kWh.
> Wir bitten um Korrektur im Ablesesystem und um Prüfung, ob der Wert bereits in eine Abrechnung oder Hochrechnung eingeflossen ist.
> Signalsteg Messtechnik GmbH, Petra Sander, Standortleitung Messtechnik

## 5. Interne Freigabe für Konrad (≤ 5 Sätze)
> Konrad darf im Angebot zur Forum-Messung sagen, dass Signalsteg Zählerdaten plausibilisieren kann, aber nicht, dass wir die Daten des Hauses gerade prüfen oder was wir gefunden haben. An Berit Fuchs geht kein Befund und kein Hinweis auf einen Zähler. Er verweist sie für Fragen zu ihren Ablesungen an die Verwaltung. Ein eigenes Angebot an Bauteilbogen erst nach dem 2.12. und nach Rücksprache mit mir. Diese Freigabe gilt bis zur Versendung der Korrekturmeldung.

## 6. Notiz zur Gegenprüfung von Thermenfeld
_Nach dem 30.11. ausfüllen:_ Bleibt Signalsteg beim Ergebnis? Ja, wenn Thermenfeld keinen Eichschein oder Tauschnachweis für die genannten Zähler vorlegt.

## 7. Wasser/Kälte melden?
Vorschlag: abgelaufene Wasser- und Kältezähler an **Raumlot** (Auftraggeberin) im selben Befund, nicht separat an Dritte.

## Für die Prüfung (bitte abhaken)
- [ ] Strom-Datei, Zeile 5575 öffnen (Bildschirmfoto) – und die Zeilen davor/danach
- [ ] Hauptzähler 18838817 Juni 2026 ansehen
- [ ] Verzeichnis: Hauptwärmemengenzähler 17689936, „Nächste Eichung 16.01.2022“
