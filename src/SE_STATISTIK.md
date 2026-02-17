# 📊 Se klik-statistik for håndværkere

## 🎯 Hvad gemmes?

Din hjemmeside gemmer **ALLE** klik på:
- ✅ **"Se nummer"** knappen (telefon-klik)
- ✅ **"Hjemmeside"** knappen (hjemmeside-klik)

For **hvert klik** gemmes:
- 🆔 **Håndværker ID** - Hvilken håndværker der blev klikket på
- 📱 **Type** - Om det var telefon eller hjemmeside
- 📅 **Tidspunkt** - Præcis dato og tid for klikket

---

## 💾 Hvor gemmes det?

Data gemmes i **Supabase** database i din `kv_store_27acf415` tabel.

**Nøgle-format:**
```
click:[uuid]
```

**Data-format:**
```json
{
  "id": "abc-123-def",
  "craftsmanId": "xyz-789-abc",
  "type": "phone",  // eller "website"
  "timestamp": "2026-02-17T20:30:45.123Z"
}
```

---

## 🔍 METODE 1: Se statistik i Supabase Dashboard

### Step 1: Log ind på Supabase

1. Gå til [supabase.com/dashboard](https://supabase.com/dashboard)
2. Log ind
3. Vælg dit Akutvagt projekt

---

### Step 2: Gå til Table Editor

1. I venstre menu, klik på **"Table Editor"**
2. Vælg tabellen: **`kv_store_27acf415`**
3. Nu ser du ALLE dine data

---

### Step 3: Find klik-data

**Filtrer efter klik:**

1. I søgefeltet, klik på **"Filter"** knappen
2. Vælg kolonne: **`key`**
3. Operator: **`starts with`** (eller `like`)
4. Værdi: `click:`
5. Klik **"Apply"**

**Nu ser du kun klik-data!** 🎉

---

### Step 4: Se hvilken håndværker

I kolonnen `value` ser du JSON-data som:
```json
{
  "craftsmanId": "abc-123",
  "type": "phone",
  "timestamp": "2026-02-17T20:30:45.123Z"
}
```

**Hvordan finder jeg håndværker-navnet?**

1. Kopier `craftsmanId` (f.eks. `abc-123`)
2. Fjern filteret (klik X)
3. Søg i `key` kolonnen efter: `craftsman:abc-123`
4. Se `value` - der står virksomhedsnavnet!

---

## 📥 METODE 2: Eksporter til Excel

### Option A: Direkte fra Supabase (Nemmest!)

1. I **Table Editor**, vis alle klik (filtrer som i Metode 1)
2. Klik på **"..."** (tre prikker) øverst til højre
3. Vælg **"Download as CSV"**
4. Åbn filen i Excel
5. Færdig! ✅

**VIGTIGT:** CSV-filen indeholder rå data. Du skal selv parse JSON i `value` kolonnen.

---

### Option B: Via SQL Editor (Mere avanceret)

1. Gå til **"SQL Editor"** i Supabase
2. Kør denne SQL for at få pænt formateret data:

```sql
-- Hent alle klik med håndværker-info
SELECT 
  (value->>'id') as click_id,
  (value->>'craftsmanId') as craftsman_id,
  (value->>'type') as click_type,
  (value->>'timestamp') as timestamp
FROM kv_store_27acf415
WHERE key LIKE 'click:%'
ORDER BY (value->>'timestamp') DESC;
```

3. Klik **"Run"**
4. Resultaterne vises i en tabel nedenfor
5. Klik på **"Download CSV"** knappen (nederst til højre)
6. Åbn i Excel

**Endnu bedre - Inkluder virksomhedsnavne:**

```sql
-- Hent klik med virksomhedsnavne
WITH clicks AS (
  SELECT 
    (value->>'id') as click_id,
    (value->>'craftsmanId') as craftsman_id,
    (value->>'type') as click_type,
    (value->>'timestamp') as timestamp
  FROM kv_store_27acf415
  WHERE key LIKE 'click:%'
),
craftsmen AS (
  SELECT 
    (value->>'id') as id,
    (value->>'companyName') as company_name,
    (value->>'category') as category
  FROM kv_store_27acf415
  WHERE key LIKE 'craftsman:%'
)
SELECT 
  clicks.timestamp,
  craftsmen.company_name AS virksomhed,
  craftsmen.category AS kategori,
  clicks.click_type AS klik_type,
  clicks.click_id
FROM clicks
LEFT JOIN craftsmen ON clicks.craftsman_id = craftsmen.id
ORDER BY clicks.timestamp DESC;
```

**Dette giver dig en Excel-fil med:**
- 📅 Tidspunkt
- 🏢 Virksomhedsnavn
- 📂 Kategori
- 📱 Klik-type (phone/website)
- 🆔 Klik ID

---

## 📊 METODE 3: Se statistik i admin-panel (Fremtidig feature)

Jeg kan lave et statistik-dashboard i admin-panelet hvis du vil!

**Hvad det kan vise:**
- 📊 Samlet antal klik per håndværker
- 📈 Graf over klik over tid
- 🏆 Top 10 mest klikkede håndværkere
- 📱 Phone vs Website klik ratio
- 📅 Klik per dag/uge/måned

**Vil du have det?** Sig til, så laver jeg det!

---

## 🧮 Simpel Excel analyse

Når du har downloadet CSV-filen:

### Tæl klik per håndværker:

1. **Filtrer kun telefon-klik:**
   - I kolonnen `click_type`, filtrer til kun `phone`

2. **Tæl per virksomhed:**
   - Lav en pivot-tabel
   - Rækker: `virksomhed`
   - Værdier: Tæl af `click_id`

3. **Se resultat:**
   ```
   Virksomhed A: 45 klik
   Virksomhed B: 32 klik
   Virksomhed C: 18 klik
   ```

---

## 📈 Eksempel: Se dagens statistik

### Via SQL i Supabase:

```sql
-- Dagens klik (sidste 24 timer)
WITH clicks AS (
  SELECT 
    (value->>'craftsmanId') as craftsman_id,
    (value->>'type') as click_type,
    (value->>'timestamp') as timestamp
  FROM kv_store_27acf415
  WHERE key LIKE 'click:%'
    AND (value->>'timestamp')::timestamp > NOW() - INTERVAL '24 hours'
),
craftsmen AS (
  SELECT 
    (value->>'id') as id,
    (value->>'companyName') as company_name
  FROM kv_store_27acf415
  WHERE key LIKE 'craftsman:%'
)
SELECT 
  craftsmen.company_name AS virksomhed,
  COUNT(CASE WHEN clicks.click_type = 'phone' THEN 1 END) AS telefon_klik,
  COUNT(CASE WHEN clicks.click_type = 'website' THEN 1 END) AS hjemmeside_klik,
  COUNT(*) AS total_klik
FROM clicks
LEFT JOIN craftsmen ON clicks.craftsman_id = craftsmen.id
GROUP BY craftsmen.company_name
ORDER BY total_klik DESC;
```

**Output:**
```
Virksomhed           | Telefon | Hjemmeside | Total
---------------------|---------|------------|-------
Akut VVS Service ApS |   12    |     8      |  20
Elektrikeren 24/7    |    7    |     5      |  12
Nødblik & Vindue     |    3    |     2      |   5
```

---

## 🎯 Hurtig guide - Jeg vil bare se tallene NU!

### 3-minutters metode:

1. **Log ind på Supabase** → Dit projekt
2. **Klik "SQL Editor"** i menuen
3. **Kopier denne SQL:**

```sql
WITH clicks AS (
  SELECT 
    (value->>'craftsmanId') as craftsman_id,
    (value->>'type') as click_type
  FROM kv_store_27acf415
  WHERE key LIKE 'click:%'
),
craftsmen AS (
  SELECT 
    (value->>'id') as id,
    (value->>'companyName') as company_name
  FROM kv_store_27acf415
  WHERE key LIKE 'craftsman:%'
)
SELECT 
  craftsmen.company_name AS virksomhed,
  COUNT(CASE WHEN clicks.click_type = 'phone' THEN 1 END) AS telefon_klik,
  COUNT(CASE WHEN clicks.click_type = 'website' THEN 1 END) AS hjemmeside_klik,
  COUNT(*) AS total_klik
FROM clicks
LEFT JOIN craftsmen ON clicks.craftsman_id = craftsmen.id
GROUP BY craftsmen.company_name
ORDER BY total_klik DESC;
```

4. **Klik "Run"**
5. **Se resultatet!** 🎉
6. **Download CSV** hvis du vil have det i Excel

---

## 🆘 Problemløsning

### "Jeg ser ingen klik-data"
**Mulige årsager:**
1. Der er ikke blevet klikket på noget endnu
2. Siden er ikke deployed (kun lokal udvikling)
3. Filteret er forkert sat

**Løsning:**
- Test selv ved at klikke på "Se nummer" og "Hjemmeside"
- Vent 5 sekunder og refresh Supabase

### "value kolonnen viser bare tekst, ikke JSON"
**Dette er normalt!** Supabase viser JSON som tekst.

**Løsning:**
- Brug SQL Editor i stedet (se Metode 2)
- Eller parse JSON manuelt i Excel

### "Hvordan ser jeg hvilken håndværker?"
**Løsning:**
- Brug den avancerede SQL query fra Metode 2
- Den joiner automatisk håndværker-navne

---

## 💡 Tips & Tricks

### Automatisk rapportering:

Du kan sætte en **ugentlig email** op i Supabase:
1. Opret en **Edge Function**
2. Kør SQL query hver mandag
3. Send email med statistik til dig selv

*Vil du have hjælp til dette? Sig til!*

---

### Power BI / Google Sheets integration:

Du kan også forbinde:
- **Google Sheets** → Importer fra Supabase API
- **Power BI** → Forbind til Supabase database
- **Excel Power Query** → Hent data direkte

---

## 📝 Hvad kan jeg gøre med dataen?

### Forretningsanalyse:

- 📊 **Hvilke håndværkere er mest populære?**
- 📈 **Hvilke kategorier får flest klik?**
- ⏰ **Hvornår på dagen kommer flest klik?**
- 📅 **Weekends vs hverdage?**
- 📱 **Foretrækker folk telefon eller hjemmeside?**
- 🎯 **Hvilke byer/områder har flest klik?**

### Optimering:

- ✅ Fjern håndværkere der aldrig får klik
- ✅ Prioriter populære håndværkere
- ✅ Tilføj flere i populære kategorier
- ✅ Se om timepris påvirker klik

---

## 🚀 Vil du have et dashboard i admin-panelet?

Jeg kan lave et **klik-statistik dashboard** direkte i admin-panelet med:

### Features:
- 📊 Live klik-tællere per håndværker
- 📈 Grafer over tid (sidste 7/30 dage)
- 🏆 Top 10 mest klikkede
- 📱 Phone vs Website ratio
- 📅 Klik-kalendar
- 📥 Export til Excel knap
- 🔄 Auto-refresh hver 30 sek

**Vil du have det? Sig til!** 🎉

---

## 📞 Har du brug for hjælp?

**Supabase dokumentation:**
- [Table Editor Guide](https://supabase.com/docs/guides/database/tables)
- [SQL Editor Guide](https://supabase.com/docs/guides/database/sql-editor)

**Vil du have custom rapporter eller dashboards?**
- Sig til, så hjælper jeg dig! 🚀

---

## ✅ Opsummering

| Metode | Nemt? | Info | Excel? |
|--------|-------|------|--------|
| **Supabase Table Editor** | ⭐⭐⭐ Meget | Rå data | ✅ Ja (CSV) |
| **Supabase SQL Editor** | ⭐⭐ Mellem | Pæn formatering | ✅ Ja (CSV) |
| **Admin Dashboard** | ⭐⭐⭐ Meget | Live grafer | ❌ Endnu ikke |

**Min anbefaling:**
1. Brug **SQL Editor** metoden (Metode 2, Option B)
2. Kopier den avancerede SQL query
3. Download CSV
4. Åbn i Excel
5. Lav pivot-tabeller for analyse

**Total tid:** 2-3 minutter 🚀

---

**Held og lykke med din analyse!** 📊
