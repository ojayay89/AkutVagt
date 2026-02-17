# 🌐 Tilslut dit One.com domæne til Akutvagt

## 📋 Hvad skal du bruge?

- ✅ Dit domæne hos One.com (f.eks. `akutvagt.dk`)
- ✅ Login til One.com
- ✅ Din React hjemmeside (denne app)
- ✅ En hosting platform (se muligheder nedenfor)
- ✅ 30-60 minutter

---

## 🚀 VIGTIGT: Vælg hosting platform først!

Figma Make er primært et **udviklingsværktøj**. For at få din hjemmeside på internettet med dit eget domæne, skal du vælge en hosting platform.

### 🆓 Gratis alternativer (Anbefalet):

| Platform | Pris | Fordele | Ulemper |
|----------|------|---------|---------|
| **Vercel** | Gratis | Hurtig, let, perfekt til React, gratis SSL | Kræver GitHub |
| **Netlify** | Gratis | Simpel, drag-and-drop, gratis SSL | Begrænsninger på build-tid |
| **Cloudflare Pages** | Gratis | Super hurtig, gratis SSL | Lidt mere teknisk |

### 💰 Figma Make deployment:

**OBS:** Jeg kan ikke bekræfte om Figma Make har betalt hosting eller gratis hosting. Du skal tjekke:
- Kig i Figma Make efter "Deploy", "Publish" eller "Hosting" knap
- Se om der står en pris
- Kontakt Figma support for præcis information

---

## 🎯 Anbefaling: Brug Vercel (Gratis & Let)

Vercel er **gratis**, hurtig og perfekt til React apps som denne. Her er hvorfor:

✅ **100% Gratis** for personlige projekter  
✅ **Automatisk SSL** (https://)  
✅ **Hurtig deployment** (1-2 minutter)  
✅ **Custom domæne** inkluderet gratis  
✅ **Automatiske opdateringer** via GitHub  
✅ **Perfekt til React** apps  

**Ulempe:** Du skal bruge GitHub (men det er også gratis og nemt!)

---

## 📖 METODE 1: Vercel (Anbefalet & Gratis)

### Step 1: Opret GitHub repository

#### 1.1 Opret GitHub konto (hvis du ikke har en)
1. Gå til [github.com](https://github.com)
2. Klik **Sign up**
3. Følg instruktionerne (helt gratis!)

#### 1.2 Upload din kode til GitHub
Du har flere muligheder:

**Option A: Via GitHub Desktop (Nemmest)**
1. Download [GitHub Desktop](https://desktop.github.com)
2. Installer og log ind
3. Klik **File** → **New repository**
4. Navngiv den: `akutvagt`
5. Vælg hvor din kode ligger på din computer
6. Klik **Create repository**
7. Klik **Publish repository** → **Publish**

**Option B: Via GitHub web (Drag-and-drop)**
1. Log ind på GitHub
2. Klik på **+** øverst til højre → **New repository**
3. Navngiv: `akutvagt`
4. Klik **Create repository**
5. Klik **uploading an existing file**
6. Træk alle dine filer til browseren
7. Klik **Commit changes**

---

### Step 2: Deploy til Vercel

#### 2.1 Opret Vercel konto
1. Gå til [vercel.com](https://vercel.com)
2. Klik **Sign Up**
3. Vælg **Continue with GitHub**
4. Godkend adgang til GitHub

#### 2.2 Import dit projekt
1. På Vercel dashboard, klik **Add New** → **Project**
2. Find dit `akutvagt` repository
3. Klik **Import**

#### 2.3 Konfigurer deployment
```
Framework Preset: Vite (eller Create React App)
Build Command: npm run build
Output Directory: dist (eller build)
Install Command: npm install
```

**VIGTIGT - Tilføj Environment Variables:**
Klik **Environment Variables** og tilføj:
```
SUPABASE_URL = https://[dit-projekt-id].supabase.co
SUPABASE_ANON_KEY = [din anon key fra Supabase]
SUPABASE_SERVICE_ROLE_KEY = [din service role key]
```

#### 2.4 Deploy!
1. Klik **Deploy**
2. Vent 1-2 minutter
3. Du får en URL: `https://akutvagt.vercel.app`
4. **Test den!** Klik på linket og se at siden virker

---

### Step 3: Tilføj dit One.com domæne til Vercel

#### 3.1 I Vercel
1. Gå til dit projekt i Vercel
2. Klik **Settings** → **Domains**
3. Indtast dit domæne: `akutvagt.dk`
4. Klik **Add**

#### 3.2 Vercel giver dig DNS-instruktioner
Vercel viser dig hvilke DNS-records du skal tilføje. Typisk:

**For root domæne (akutvagt.dk):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.akutvagt.dk):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### 3.3 Kopier disse værdier (du skal bruge dem i næste step!)

---

### Step 4: Opdater DNS i One.com

#### 4.1 Log ind på One.com
1. Gå til [one.com](https://www.one.com)
2. Log ind
3. Gå til **Kontrolpanel**

#### 4.2 Find DNS-indstillinger
1. Klik på **Domæner**
2. Find `akutvagt.dk`
3. Klik på domænet
4. Find **DNS-indstillinger** eller **Administrer DNS**

#### 4.3 Tilføj A record (for root domæne)
1. Klik **Tilføj post** eller **Add Record**
2. Vælg type: **A**
3. Udfyld:
   ```
   Host/Navn: @ (eller lad feltet være tomt)
   IP-adresse: 76.76.21.21 (eller den IP Vercel gav dig)
   TTL: 3600 (standard)
   ```
4. Klik **Gem**

#### 4.4 Tilføj CNAME record (for www)
1. Klik **Tilføj post** igen
2. Vælg type: **CNAME**
3. Udfyld:
   ```
   Host/Navn: www
   Peger på: cname.vercel-dns.com (eller den værdi Vercel gav dig)
   TTL: 3600
   ```
4. Klik **Gem**

---

### Step 5: Vent og test

#### 5.1 Vent på DNS-opdatering
- **Typisk:** 15 minutter - 4 timer
- **Maksimum:** Op til 24-48 timer
- Vær tålmodig! ☕

#### 5.2 Test dit domæne
1. Åbn en **ny inkognito browser**
2. Gå til: `https://akutvagt.dk`
3. Din hjemmeside skulle gerne vises! 🎉

#### 5.3 Verificer SSL (https)
- Vercel tilføjer automatisk gratis SSL-certifikat
- Dette kan tage 10-30 minutter efter DNS er opdateret
- Hvis du får SSL-fejl, vent lidt mere

---

## 📖 METODE 2: Netlify (Også gratis)

Netlify er et godt alternativ hvis du ikke vil bruge GitHub.

### Quick guide:

1. **Opret konto på [netlify.com](https://www.netlify.com)**
2. **Byg dit projekt lokalt:**
   ```bash
   npm run build
   ```
3. **Træk `dist` (eller `build`) mappen til Netlify**
4. **Få din URL:** `https://akutvagt.netlify.app`
5. **Tilføj custom domain i Netlify**
6. **Opdater DNS i One.com** med de værdier Netlify giver dig
7. **Vent og test!**

**VIGTIGT:** Husk også at tilføje environment variables i Netlify (Supabase keys)!

---

## 📖 METODE 3: Figma Make (Hvis det understøttes)

### Tjek først om Figma Make har hosting:

1. **I Figma Make, kig efter:**
   - "Deploy" knap
   - "Publish" knap
   - "Hosting" settings
   - "Production" mode

2. **Hvis du finder det:**
   - Klik Deploy/Publish
   - Vent på deployment
   - Kopier den URL du får
   - Følg derefter Step 4 fra Vercel-guiden ovenfor (DNS i One.com)

3. **Hvis du IKKE finder det:**
   - Figma Make er måske kun til udvikling
   - Brug Vercel eller Netlify i stedet (anbefalet!)

---

## 💰 Pris sammenligning

| Platform | Hosting | Custom Domain | SSL | Pris |
|----------|---------|---------------|-----|------|
| **Vercel** | ✅ Gratis | ✅ Gratis | ✅ Gratis | **€0/måned** |
| **Netlify** | ✅ Gratis | ✅ Gratis | ✅ Gratis | **€0/måned** |
| **Cloudflare Pages** | ✅ Gratis | ✅ Gratis | ✅ Gratis | **€0/måned** |
| **Figma Make** | ❓ Tjek selv | ❓ Tjek selv | ❓ Tjek selv | **❓** |
| **One.com webhotel** | 💰 Betalt | ✅ Inkluderet | ✅ Inkluderet | **~€3-10/måned** |

**Anbefaling:** Brug Vercel - det er gratis og professionelt! 🚀

---

## 🆘 Problemløsning

### "Jeg har ikke GitHub og vil ikke oprette det"
**Løsning:** Brug **Netlify** i stedet - de har drag-and-drop upload!

### "Deployment fejler i Vercel/Netlify"
**Tjek:**
1. ✅ Har du tilføjet Environment Variables? (Supabase keys)
2. ✅ Er build command korrekt? (`npm run build`)
3. ✅ Er output directory korrekt? (`dist` eller `build`)

### "Mit domæne virker ikke efter 24 timer"
**Løsning:**
1. Tjek DNS på [dnschecker.org](https://dnschecker.org)
2. Bekræft at A record og CNAME er korrekte i One.com
3. Kontakt One.com support

### "Jeg får SSL/HTTPS fejl"
**Løsning:**
1. Vent 30 minutter - SSL-certifikater tager tid
2. Prøv at besøge `http://` i stedet (midlertidigt)
3. Tjek i Vercel/Netlify at SSL er aktiveret

---

## 📝 Komplet Checklist

### Før deployment:
- [ ] Jeg har testet min app lokalt
- [ ] Jeg har en GitHub konto (hvis Vercel)
- [ ] Jeg har mine Supabase keys klar
- [ ] Jeg har adgang til One.com

### Under deployment:
- [ ] Kode uploadet til GitHub (hvis Vercel)
- [ ] Projekt deployet til Vercel/Netlify
- [ ] Environment variables tilføjet
- [ ] Deployment vellykket - jeg kan se siden på .vercel.app eller .netlify.app

### Custom domæne:
- [ ] Domæne tilføjet i Vercel/Netlify
- [ ] DNS-værdier kopieret
- [ ] A record tilføjet i One.com
- [ ] CNAME record tilføjet i One.com
- [ ] Ændringer gemt

### Verificering:
- [ ] Ventet 1-4 timer
- [ ] Testet domæne i inkognito mode
- [ ] Både akutvagt.dk og www.akutvagt.dk virker
- [ ] SSL (https://) virker
- [ ] Admin-login virker
- [ ] Kan tilføje håndværkere

---

## 🎯 Min anbefaling til dig

Baseret på at du er nybegynder og vil have det nemmest:

### 🥇 **Plan A: Vercel (Bedst)**
1. Opret GitHub konto (gratis, 5 min)
2. Upload kode med GitHub Desktop (gratis, nemt)
3. Deploy til Vercel (gratis, 2 min)
4. Tilføj domæne (gratis)
5. **Total tid: ~30 min**
6. **Total pris: €0 for evigt**

### 🥈 **Plan B: Netlify (Hvis du hader GitHub)**
1. Byg projekt lokalt (`npm run build`)
2. Drag-and-drop til Netlify (gratis)
3. Tilføj domæne
4. **Total tid: ~20 min**
5. **Total pris: €0 for evigt**

### 🥉 **Plan C: One.com webhotel**
- Hvis du allerede betaler for webhotel hos One.com
- Upload via FTP
- Mere besværligt at opdatere
- **Pris: ~€3-10/måned**

---