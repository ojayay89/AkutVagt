# Campus placement drive

This is a code bundle for Campus placement drive. The original project is available at https://www.figma.com/design/Z22L3qaXzTg17BZOzbmvLA/Campus-placement-drive.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Akut virksomheds-scraper (Excel)

Der er tilføjet et Python-script der kan finde virksomheder inden for kategorierne:
VVS, elektriker, kloakfirma, låsesmed, glarmester, auto transport og vagt/sikkerhed.
Scriptet filtrerer efter sider der nævner akut/døgnvagt-lignende ord og gemmer resultatet i `.xlsx`.

### Step-by-step: Sådan kører du Python-filen

1. Åbn en terminal i projektmappen (den mappe hvor `scripts/` ligger).
2. Tjek at Python 3 er installeret:
   ```bash
   python3 --version
   ```
3. Kør scriptet:
   ```bash
   python3 scripts/scrape_akut_businesses.py --limit-per-query 5 --pause 0.6 --output output/akut_virksomheder.xlsx
   ```
4. Når scriptet er færdigt, ligger filen her:
   - `output/akut_virksomheder.xlsx`
5. Åbn filen i Excel (eller Google Sheets).

### Hvis du vil have flere/færre resultater

- **Flere kandidater pr. søgning**: sæt `--limit-per-query` højere (fx `10`).
- **Langsommere/høfligere scraping**: sæt `--pause` højere (fx `1.0`).

Eksempel:

```bash
python3 scripts/scrape_akut_businesses.py --limit-per-query 10 --pause 1.0 --output output/akut_virksomheder.xlsx
```

### Fejlsøgning

- Hvis du får netværksfejl (fx proxy/firewall), så prøv fra et andet netværk.
- Hvis output-filen kun indeholder overskrifter, så er der ikke fundet sider der matcher kriterierne (eller siden blokerer scraping).

Output-kolonner:

- virksomhed
- kategori
- adresse
- post nr.
- by
- telefonnummer
- website
- timepris hvis angivet

Bemærk: Web scraping er heuristisk. Nogle felter kan mangle eller være unøjagtige, afhængigt af hvordan den enkelte hjemmeside er bygget.
