# 🚀 SEO GUIDE - Sådan kommer AkutVagt til tops på Google

## ✅ ALLEREDE GJORT (I Koden)

### 1. **Meta Tags & Structured Data** ✓
- Title tag optimeret med søgeord
- Meta description med call-to-action
- Keywords tilføjet
- Open Graph tags (Facebook/LinkedIn deling)
- Twitter cards
- JSON-LD Schema markup (Google forstår hvad siden handler om)
- Canonical URL
- Geo tags for Danmark

### 2. **Sitemap & Robots.txt** ✓
- `/public/sitemap.xml` - fortæller Google alle sider
- `/public/robots.txt` - giver søgemaskiner adgang
- Alle kategori-sider inkluderet

---

## 📋 TING DU SKAL GØRE EFTER DEPLOYMENT

### **TRIN 1: Google Search Console** (VIGTIGST!)
1. Gå til: https://search.google.com/search-console
2. Klik "Tilføj property"
3. Indtast: `https://www.akutvagt.dk`
4. Verificer ejerskab via One.com DNS eller HTML fil
5. **Indsend sitemap:**
   - Gå til "Sitemaps" i menuen
   - Tilføj: `https://www.akutvagt.dk/sitemap.xml`
   - Klik "Send"
6. Anmod om indeksering af forsiden

### **TRIN 2: Google Business Profile**
1. Opret profil på: https://business.google.com
2. Kategori: "Website" eller "Online Service"
3. Tilføj samme beskrivelse som på hjemmesiden
4. Link til www.akutvagt.dk

### **TRIN 3: One.com SSL Certifikat** (burde være automatisk)
1. Log ind på One.com
2. Check at SSL er aktiveret (https://)
3. Hvis ikke - aktiver gratis Let's Encrypt certifikat

---

## 🎯 SEO OPTIMERING - CONTENT STRATEGI

### **Vigtige søgeord at fokusere på:**
- "akut håndværker" + by (København, Aarhus, Odense osv.)
- "akut VVS [by]"
- "akut elektriker [by]"
- "nød låsesmed [by]"
- "håndværker døgnvagt"
- "akut hjælp håndværker"

### **Content du bør tilføje:**

#### 1. **By-specifikke landing pages**
Opret sider for hver stor by:
- `/akut-haandvaerker-koebenhavn`
- `/akut-haandvaerker-aarhus`
- `/akut-haandvaerker-odense`
- osv.

#### 2. **Blog/Guide sektion**
Artikler som:
- "Hvad koster en akut VVS-mand?"
- "Sådan finder du en pålidelig akut elektriker"
- "10 tegn på du har brug for akut kloakservice"
- "Hvornår skal du ringe til en akut låsesmed?"

#### 3. **FAQ sektion på forsiden**
- Hvor hurtigt kan en akut håndværker komme?
- Hvad koster det at tilkalde en akut håndværker?
- Er håndværkerne tilgængelige 24/7?

---

## 🔗 BACKLINK STRATEGI (Off-Page SEO)

### **1. Lokale Directories**
Tilføj AkutVagt til:
- ✅ DBA.dk (gratis annonce)
- ✅ GulogGratis.dk
- ✅ Trustpilot (bed håndværkere om anmeldelser)
- ✅ Krak.dk (erhvervsregister)
- ✅ Yelp Danmark
- ✅ Facebook Business Side

### **2. Samarbejde med håndværkere**
- Bed håndværkerne linke til AkutVagt fra deres hjemmesider
- Giv dem et badge: "Find os på AkutVagt.dk"

### **3. Pressemeddelelse**
- Skriv pressemeddelelse om lancering
- Send til lokale medier og branchemagasiner
- Build.dk, Licitationen.dk, lokale aviser

### **4. Social Media**
- Opret Facebook side
- Opret Instagram
- Del relevante tips + link til siden
- Brug hashtags: #akuthåndværker #vvs #elektriker

---

## 📊 TEKNISK SEO CHECKLIST

### **Performance** (allerede godt optimeret!)
- ✅ Mobil-venlig design
- ✅ Hurtig loading (Vite er super hurtig)
- ✅ Compressed images (Unsplash giver optimerede billeder)
- ⚠️ HUSK: Tilføj lazy loading til billeder hvis du tilføjer flere

### **Accessibility**
- ✅ Semantic HTML
- ✅ Alt tekster på billeder
- ✅ Keyboard navigation
- ✅ ARIA labels

### **Core Web Vitals**
Test på: https://pagespeed.web.dev/
- Mål: LCP < 2.5s
- Mål: FID < 100ms
- Mål: CLS < 0.1

---

## 🎓 AVANCERET SEO STRATEGI

### **1. Local SEO (By-specifik optimering)**
For hver større by i Danmark:
- Opret landingsside
- Tilføj struktureret data med geo-koordinater
- Nævn bynavne i content

### **2. Rich Snippets**
Tilføj mere schema markup:
- Review/Rating schema (når du har anmeldelser)
- FAQ schema
- Breadcrumb schema

### **3. Page Speed**
- Komprimer JavaScript (Vite gør dette automatisk)
- Brug CDN (Vercel har built-in CDN ✅)
- Lazy load images under fold

---

## 📈 MÅLING AF SUCCES

### **Google Search Console**
Check hver uge:
- Antal klik
- Gennemsnitlig position
- CTR (Click Through Rate)
- Hvilke søgeord giver trafik

### **Google Analytics** (installer dette!)
1. Opret konto: https://analytics.google.com
2. Tilføj tracking code i `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ⏱️ TIDSPLAN - HVORNÅR SER DU RESULTATER?

- **1-2 uger:** Google indexerer siden
- **1-2 måneder:** Begynder at ranke for long-tail keywords
- **3-6 måneder:** Ranker for hoved-keywords (med god backlink strategi)
- **6-12 måneder:** Top 3 positioner (med kontinuerlig optimering)

---

## 🚨 VIGTIGSTE STEPS - START HER!

1. ✅ **Deploy den nye kode** (meta tags + sitemap)
2. ✅ **Tilføj site til Google Search Console**
3. ✅ **Indsend sitemap.xml**
4. ✅ **Opret Google Business Profile**
5. ✅ **Tilføj til 5-10 directories (DBA, Trustpilot osv.)**
6. ✅ **Installer Google Analytics**
7. ✅ **Skriv 5 blog artikler**
8. ✅ **Få 10 backlinks fra håndværkere**

---

## 💡 BONUS TIPS

### **A. Konkurrent Analyse**
Google: "akut håndværker [din by]"
- Se hvem der ranker #1-3
- Analysér deres indhold
- Gør det bedre!

### **B. Long-tail Keywords**
Fokusér på specifikke søgninger:
- ❌ "håndværker" (for bredt)
- ✅ "akut VVS København søndag aften" (specifikt)

### **C. Featured Snippets**
Strukturér content med:
- Nummererede lister
- Tabeller
- FAQ format
- Step-by-step guides

---

## 📞 SUPPORT

Har du spørgsmål? Google disse ressourcer:
- Google Search Console Help
- Moz Beginner's Guide to SEO
- Ahrefs Blog (dansk SEO tips)
- SEO-bloggen på Unwire.dk

**GOD FORNØJELSE MED SEO! 🚀**
