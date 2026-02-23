#!/usr/bin/env python3
"""Scrape Danish emergency-service businesses and export to Excel (xlsx).

Dependency-free (Python stdlib only), suitable for restricted environments.
"""

from __future__ import annotations

import argparse
import html
import re
import time
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from urllib.parse import quote_plus, urlparse
from urllib.request import Request, urlopen

USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/123.0 Safari/537.36"
)

CATEGORIES: dict[str, list[str]] = {
    "VVS": ["akut vvs", "døgnvagt vvs", "vvs akut"],
    "Elektriker": ["akut elektriker", "elektriker døgnvagt"],
    "Kloakfirma": ["akut kloak", "kloakmester døgnvagt"],
    "Låsesmed": ["akut låsesmed", "låsesmed døgnvagt"],
    "Glarmester": ["akut glarmester", "glarmester døgnvagt"],
    "Auto transport": ["autotransport akut", "vejhjælp autotransport"],
    "Vagt/sikkerhedsfirma": ["vagtfirma akut", "sikkerhedsfirma døgnvagt"],
}

ACUTE_KEYWORDS = ["akut", "døgnvagt", "24/7", "24 timer", "hurtig udrykning", "nødhjælp"]

PHONE_RE = re.compile(r"(?:\+45\s?)?(?:\d[\s.-]?){8,}")
POST_CITY_RE = re.compile(r"\b(\d{4})\s+([A-Za-zÆØÅæøå\- ]{2,})")
PRICE_RE = re.compile(r"(?:(?:fra|ca\.?|timepris)\s*)?(\d{2,5})\s*(?:kr\.?|dkk)(?:\s*/\s*time|/t)?", re.I)
TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.I | re.S)
TAG_RE = re.compile(r"<[^>]+>")
DDG_LINK_RE = re.compile(r'<a[^>]+class="[^"]*result__a[^"]*"[^>]+href="([^"]+)"', re.I)


@dataclass
class Business:
    virksomhed: str
    kategori: str
    adresse: str
    post_nr: str
    by: str
    telefonnummer: str
    website: str
    timepris_hvis_angivet: str


def fetch(url: str, timeout: float = 15.0) -> str:
    req = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="ignore")


def duckduckgo_results(query: str, max_results: int = 12) -> list[str]:
    url = f"https://duckduckgo.com/html/?q={quote_plus(query)}"
    html_text = fetch(url)
    links: list[str] = []
    for match in DDG_LINK_RE.finditer(html_text):
        href = html.unescape(match.group(1))
        if not href.startswith("http"):
            continue
        host = urlparse(href).netloc.lower()
        if "duckduckgo.com" in host:
            continue
        links.append(href)
        if len(links) >= max_results:
            break
    return links


def strip_html(raw_html: str) -> str:
    no_script = re.sub(r"<script.*?</script>", " ", raw_html, flags=re.I | re.S)
    no_style = re.sub(r"<style.*?</style>", " ", no_script, flags=re.I | re.S)
    text = TAG_RE.sub(" ", no_style)
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def extract_title(raw_html: str) -> str:
    m = TITLE_RE.search(raw_html)
    if not m:
        return ""
    title = html.unescape(m.group(1))
    return re.sub(r"\s+", " ", TAG_RE.sub(" ", title)).strip()


def looks_acute(text: str) -> bool:
    low = text.lower()
    return any(k in low for k in ACUTE_KEYWORDS)


def extract_company_name(raw_html: str, url: str) -> str:
    title = extract_title(raw_html)
    if title:
        return title.split("|")[0].split("-")[0].strip()
    return urlparse(url).netloc.removeprefix("www.")


def first_match(pattern: re.Pattern[str], text: str) -> str:
    m = pattern.search(text)
    return m.group(0).strip() if m else ""


def to_business(category: str, url: str, raw_html: str) -> Business:
    text = strip_html(raw_html)

    post_nr, by = "", ""
    m_city = POST_CITY_RE.search(text)
    if m_city:
        post_nr, by = m_city.group(1).strip(), m_city.group(2).strip()

    address = ""
    if post_nr:
        idx = text.find(post_nr)
        if idx > 0:
            prefix = text[max(0, idx - 70):idx].strip(" ,")
            address = " ".join(prefix.split()[-8:]).strip(" ,")

    m_price = PRICE_RE.search(text)
    price = f"{m_price.group(1)} kr/time" if m_price else ""

    return Business(
        virksomhed=extract_company_name(raw_html, url),
        kategori=category,
        adresse=address,
        post_nr=post_nr,
        by=by,
        telefonnummer=first_match(PHONE_RE, text),
        website=url,
        timepris_hvis_angivet=price,
    )


def unique_by_website(items: Iterable[Business]) -> list[Business]:
    seen: set[str] = set()
    out: list[Business] = []
    for item in items:
        host = urlparse(item.website).netloc.removeprefix("www.").lower()
        if not host or host in seen:
            continue
        seen.add(host)
        out.append(item)
    return out


def scrape(limit_per_query: int, pause_s: float) -> list[Business]:
    collected: list[Business] = []
    for category, queries in CATEGORIES.items():
        urls: list[str] = []
        for q in queries:
            try:
                urls.extend(duckduckgo_results(q, max_results=limit_per_query))
            except Exception:
                pass
            time.sleep(pause_s)

        for url in urls:
            try:
                raw = fetch(url)
                text = strip_html(raw)
                if not looks_acute(text):
                    continue
                business = to_business(category, url, raw)
                if business.virksomhed and business.telefonnummer:
                    collected.append(business)
            except Exception:
                pass
            time.sleep(pause_s)

    return unique_by_website(collected)


def excel_col_name(index_1_based: int) -> str:
    result = ""
    n = index_1_based
    while n > 0:
        n, rem = divmod(n - 1, 26)
        result = chr(65 + rem) + result
    return result


def create_sheet_xml(rows: list[list[str]]) -> str:
    xml_rows = []
    for r_idx, row in enumerate(rows, start=1):
        cells = []
        for c_idx, value in enumerate(row, start=1):
            ref = f"{excel_col_name(c_idx)}{r_idx}"
            safe = html.escape(value or "")
            cells.append(f'<c r="{ref}" t="inlineStr"><is><t>{safe}</t></is></c>')
        xml_rows.append(f'<row r="{r_idx}">' + "".join(cells) + "</row>")
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<sheetData>' + "".join(xml_rows) + '</sheetData></worksheet>'
    )


def write_xlsx(path: Path, rows: list[list[str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    sheet_xml = create_sheet_xml(rows)

    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>"""

    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    workbook = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="AkutVirksomheder" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>"""

    workbook_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>"""

    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", rels)
        zf.writestr("xl/workbook.xml", workbook)
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        zf.writestr("xl/worksheets/sheet1.xml", sheet_xml)


def main() -> None:
    parser = argparse.ArgumentParser(description="Scrape akut-virksomheder og gem i Excel")
    parser.add_argument("--limit-per-query", type=int, default=5)
    parser.add_argument("--pause", type=float, default=0.6)
    parser.add_argument("--output", default="output/akut_virksomheder.xlsx")
    args = parser.parse_args()

    businesses = scrape(args.limit_per_query, args.pause)

    header = [
        "virksomhed",
        "kategori",
        "adresse",
        "post nr.",
        "by",
        "telefonnummer",
        "website",
        "timepris hvis angivet",
    ]

    rows = [header] + [
        [
            b.virksomhed,
            b.kategori,
            b.adresse,
            b.post_nr,
            b.by,
            b.telefonnummer,
            b.website,
            b.timepris_hvis_angivet,
        ]
        for b in businesses
    ]

    out = Path(args.output)
    write_xlsx(out, rows)
    print(f"Gemte {len(businesses)} virksomheder i {out}")


if __name__ == "__main__":
    main()
