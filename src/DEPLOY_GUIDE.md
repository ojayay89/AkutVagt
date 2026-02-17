# 🚀 Simpel Deployment Guide - Kom online på 30 minutter!

## 🎯 Hvad er målet?

At få din Akutvagt hjemmeside online med dit eget domæne **GRATIS** via Vercel.

**Total tid:** ~30 minutter  
**Total pris:** €0 (helt gratis!)  
**Kræver:** En gratis GitHub konto

---

## 📋 Hvad du skal gøre (oversigt)

1. ✅ Download din kode fra Figma Make
2. ✅ Upload til GitHub (gratis)
3. ✅ Deploy til Vercel (gratis)
4. ✅ Tilslut dit One.com domæne (gratis)
5. ✅ Færdig! 🎉

---

## 🔥 STEP 1: Download din kode (2 minutter)

### I Figma Make:

1. Kig efter en **"Export"**, **"Download"** eller **"Download Code"** knap
2. Klik på den
3. Download hele projektet som ZIP-fil
4. Pak ZIP-filen ud på din computer
5. Gem mappen et sted du kan finde den (f.eks. Skrivebord)

**📁 Nu har du en mappe med alle dine filer!**

---

## 🔥 STEP 2: Opret GitHub konto (5 minutter)

**Hvad er GitHub?** Et sted til at gemme kode online - tænk på det som "Google Drive for kodning".

### 2.1 Gå til GitHub:
1. Åbn [github.com](https://github.com) i din browser
2. Klik på **"Sign up"** (øverst til højre)

### 2.2 Udfyld:
- Email: Din email
- Password: Vælg et stærkt password
- Username: Vælg et brugernavn (f.eks. `akutvagt-dk`)
- Klik **"Create account"**

### 2.3 Verificer email:
- Tjek din email indbakke
- Klik på verifikations-linket fra GitHub
- Du er nu på GitHub! ✅

---

## 🔥 STEP 3: Upload kode til GitHub (8 minutter)

Du har 2 muligheder - vælg den der er nemmest for dig:

---

### 💻 **Option A: GitHub Desktop (Anbefalet - Nemmest)**

#### 3.1 Download GitHub Desktop:
1. Gå til [desktop.github.com](https://desktop.github.com)
2. Klik **"Download for Windows"** eller **"Download for Mac"**
3. Installer programmet
4. Åbn GitHub Desktop

#### 3.2 Log ind:
1. Klik **"Sign in to GitHub.com"**
2. Log ind med din GitHub konto
3. Klik **"Authorize desktop"**

#### 3.3 Upload din kode:
1. I GitHub Desktop, klik **"File"** → **"Add Local Repository"**
2. Klik **"Choose..."**
3. Find mappen med din Akutvagt kode (fra Step 1)
4. Klik **"Add repository"**

**Hvis du får en fejl:**
1. Klik i stedet **"Create New Repository"**
2. Name: `akutvagt`
3. Local path: Vælg mappen med din kode
4. Klik **"Create repository"**

#### 3.4 Publicer til GitHub:
1. I GitHub Desktop, klik **"Publish repository"**
2. **FJERN flueben fra "Keep this code private"** (så det er offentligt)
3. Klik **"Publish repository"**
4. **Færdig!** Din kode er nu på GitHub! 🎉

---

### 🌐 **Option B: GitHub Web (Uden at installere noget)**

#### 3.1 Opret repository:
1. Log ind på [github.com](https://github.com)
2. Klik på **"+"** øverst til højre
3. Vælg **"New repository"**

#### 3.2 Udfyld:
- Repository name: `akutvagt`
- Description: `Akutvagt håndværker platform`
- Vælg: **Public** (offentlig)
- **IKKE** flueben ved "Initialize with README"
- Klik **"Create repository"**

#### 3.3 Upload filer:
1. Klik på **"uploading an existing file"** (blåt link)
2. Træk **ALLE** filer og mapper fra din Akutvagt mappe til browseren
3. Vent mens de uploader (kan tage 1-2 minutter)
4. Scroll ned og klik **"Commit changes"**
5. **Færdig!** Din kode er på GitHub! 🎉

---

## 🔥 STEP 4: Deploy til Vercel (10 minutter)

**Hvad er Vercel?** En gratis hosting service der viser din hjemmeside på internettet.

### 4.1 Opret Vercel konto:
1. Gå til [vercel.com](https://vercel.com)
2. Klik **"Sign Up"** (øverst til højre)
3. Vælg **"Continue with GitHub"**
4. Log ind med din GitHub konto
5. Klik **"Authorize Vercel"** for at give adgang
6. Du er nu på Vercel dashboard! ✅

### 4.2 Import dit projekt:
1. På Vercel dashboard, klik **"Add New..."** (stor knap)
2. Vælg **"Project"**
3. Find dit **"akutvagt"** repository i listen
4. Klik **"Import"** ved siden af det

### 4.3 Konfigurer projekt:

**Framework Preset:**
- Vælg **"Vite"** fra dropdown (hvis det ikke allerede er valgt)

**Root Directory:**
- Lad den stå som `./` (standard)

**Build and Output Settings:**
- Build Command: `npm run build` (eller lad standard)
- Output Directory: `dist` (eller lad standard)
- Install Command: `npm install` (eller lad standard)

### 4.4 Tilføj Environment Variables (VIGTIGT!):

Klik på **"Environment Variables"** for at folde det ud.

Du skal tilføje 3 variabler:

#### Variabel 1:
```
Name: SUPABASE_URL
Value: https://[dit-projekt-id].supabase.co
```
**Hvordan finder jeg værdien?**
- Gå til [supabase.com/dashboard](https://supabase.com/dashboard)
- Vælg dit projekt
- Klik på **"Settings"** → **"API"**
- Kopier **"Project URL"**

#### Variabel 2:
```
Name: SUPABASE_ANON_KEY
Value: [din anon key]
```
**Hvor finder jeg den?**
- Samme sted (Supabase → Settings → API)
- Kopier **"anon public"** key

#### Variabel 3:
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [din service role key]
```
**Hvor finder jeg den?**
- Samme sted (Supabase → Settings → API)
- Kopier **"service_role"** key
- **⚠️ VIGTIGT:** Denne skal holdes hemmelig!

**Klik "Add" efter hver variabel!**

### 4.5 Deploy!
1. Scroll ned
2. Klik den store **"Deploy"** knap
3. Vent 1-3 minutter mens Vercel bygger din side
4. **Success!** 🎉

### 4.6 Test din side:
1. Vercel viser dig nu en URL: `https://akutvagt-abc123.vercel.app`
2. Klik på **"Visit"** eller kopier URL'en
3. Åbn den i en ny fane
4. **Din hjemmeside skulle gerne virke!** 🚀

**Hvis der er fejl:**
- Tjek at alle 3 Environment Variables er tilføjet korrekt
- Klik på **"Deployments"** og se error-loggen
- Ret fejlen og Vercel re-deployer automatisk

---

## 🔥 STEP 5: Tilslut dit One.com domæne (10-15 minutter)

Nu har du en fungerende side på `https://akutvagt-abc123.vercel.app`.  
Lad os tilslutte dit rigtige domæne: `akutvagt.dk`

### 5.1 Tilføj domæne i Vercel:
1. I dit Vercel projekt, klik på **"Settings"** (øverst)
2. Klik på **"Domains"** i venstremenuen
3. I feltet "Domain", skriv: `akutvagt.dk`
4. Klik **"Add"**

### 5.2 Vercel giver dig DNS-instruktioner:

Vercel viser nu hvad du skal gøre. Typisk ser du:

```
⚠️ Invalid Configuration
To use akutvagt.dk, set the following record on your DNS provider:

Type: A
Name: @
Value: 76.76.21.21
```

**Kopier denne information!** Du skal bruge den i næste step.

**Tilføj også www:**
1. Under samme "Domains" side
2. Tilføj: `www.akutvagt.dk`
3. Klik **"Add"**
4. Vercel viser DNS for www (typisk en CNAME)

---

### 5.3 Opdater DNS i One.com:

#### 5.3.1 Log ind på One.com:
1. Gå til [one.com](https://www.one.com)
2. Log ind med dine oplysninger
3. Klik **"Kontrolpanel"**

#### 5.3.2 Find DNS-indstillinger:
1. Find **"Domæner"** i menuen
2. Klik på dit domæne: `akutvagt.dk`
3. Scroll og find **"DNS-indstillinger"** eller **"Administrer DNS"**
4. Klik på det

#### 5.3.3 Tilføj A record (for akutvagt.dk):

**VIGTIGT:** Slet først gamle A records hvis der er nogen!

1. Klik **"Tilføj post"** eller **"Add Record"**
2. Vælg type: **A**
3. Udfyld:
   ```
   Navn/Host: @ (eller lad være tomt)
   Værdi/IP: 76.76.21.21 (brug værdien Vercel gav dig!)
   TTL: 3600
   ```
4. Klik **"Gem"**

#### 5.3.4 Tilføj CNAME record (for www.akutvagt.dk):

1. Klik **"Tilføj post"** igen
2. Vælg type: **CNAME**
3. Udfyld:
   ```
   Navn/Host: www
   Værdi: cname.vercel-dns.com (eller den værdi Vercel gav)
   TTL: 3600
   ```
4. Klik **"Gem"**

#### 5.3.5 Bekræft ændringer:
- Tjek at begge records er gemt
- De skulle gerne vises i listen nu

---

## 🔥 STEP 6: Vent og test (1-4 timer)

### 6.1 DNS-opdatering tager tid:
- **Hurtigst:** 15 minutter
- **Typisk:** 1-4 timer
- **Sjældent:** Op til 24 timer

**Vær tålmodig!** ☕ Gå en tur eller lav noget andet.

### 6.2 Tjek status i Vercel:
1. Gå tilbage til Vercel → Settings → Domains
2. Vent til du ser **grønne flueben** ✅ ved begge domæner
3. Når de er grønne, er det klart!

### 6.3 Test dit domæne:
1. Åbn en **ny inkognito/privat browser** (Ctrl+Shift+N)
2. Gå til: `https://akutvagt.dk`
3. **Din hjemmeside skulle gerne vises!** 🎉🎉🎉

### 6.4 Test også www:
- Gå til: `https://www.akutvagt.dk`
- Skulle også virke!

### 6.5 Test SSL (https):
- Vercel tilføjer **gratis SSL-certifikat** automatisk
- Hvis du ser en lås-ikon 🔒 i browserlinjen = Perfekt!
- Hvis du får SSL-fejl, vent 30 minutter mere

---

## 🎉 TILLYKKE - DU ER FÆRDIG!

Din Akutvagt hjemmeside er nu live på internettet! 🚀

### ✅ Hvad virker nu:

- ✅ Din hjemmeside er online 24/7
- ✅ Tilgængelig på `https://akutvagt.dk`
- ✅ Gratis hosting fra Vercel
- ✅ Gratis SSL (sikker https)
- ✅ Custom domæne
- ✅ Admin-panel virker
- ✅ Supabase database virker
- ✅ Automatisk backup på GitHub

### 💰 Hvad har det kostet?

**€0** - Helt gratis! 🎊

---

## 🔄 Sådan opdaterer du siden fremover

Når du vil lave ændringer:

### Via GitHub Desktop (Nemmest):
1. Ret filerne på din computer
2. Åbn GitHub Desktop
3. Skriv en besked (f.eks. "Tilføjet ny håndværker")
4. Klik **"Commit to main"**
5. Klik **"Push origin"**
6. **Vercel deployer automatisk!** (1-2 min)
7. Opdateringer er live! ✅

### Via GitHub Web:
1. Gå til dit repository på github.com
2. Find filen du vil rette
3. Klik på fil → Blyant-ikon (Edit)
4. Ret koden
5. Scroll ned og klik **"Commit changes"**
6. **Vercel deployer automatisk!**

---

## 🆘 Hvis noget går galt

### "Vercel viser fejl under deployment"
1. Gå til Vercel → Dit projekt → **"Deployments"**
2. Klik på den fejlede deployment
3. Læs fejlbeskeden
4. Tjek at Environment Variables er korrekte
5. Prøv at re-deploy

### "Mit domæne virker ikke efter 24 timer"
1. Tjek DNS på [dnschecker.org](https://dnschecker.org)
2. Skriv `akutvagt.dk` og vælg type: **A**
3. Se om den peger til Vercel's IP (76.76.21.21)
4. Hvis nej: Tjek One.com DNS-indstillinger igen
5. Kontakt One.com support hvis det fortsætter

### "Admin-login virker ikke"
1. Husk at oprette admin i Supabase først! (Se OPRET_ADMIN.md)
2. Tjek at Environment Variables er tilføjet i Vercel
3. Prøv at re-deploy i Vercel

### "Hjemmesiden er tom/hvid"
1. Tjek browser console (F12 → Console)
2. Se efter fejlbeskeder
3. Tjek at Supabase keys er korrekte i Vercel
4. Re-deploy projektet

---

## 📞 Få hjælp

### Vercel Support:
- Dokumentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

### One.com Support:
- Telefon: **46 90 02 05** (Danmark)
- Chat: I kontrolpanelet
- Email: support@one.com

### Supabase Support:
- Dokumentation: [supabase.com/docs](https://supabase.com/docs)
- Discord: [discord.supabase.com](https://discord.supabase.com)

---

## 📝 Quick Checklist

Brug denne til at holde styr:

**GitHub:**
- [ ] Oprettet GitHub konto
- [ ] Uploadet kode til GitHub
- [ ] Kan se mit repository på github.com/[bruger]/akutvagt

**Vercel:**
- [ ] Oprettet Vercel konto
- [ ] Importeret projekt fra GitHub
- [ ] Tilføjet 3 Environment Variables (Supabase)
- [ ] Deployment vellykket
- [ ] Kan se siden på .vercel.app URL

**Domæne:**
- [ ] Tilføjet akutvagt.dk i Vercel
- [ ] Tilføjet www.akutvagt.dk i Vercel
- [ ] A record tilføjet i One.com
- [ ] CNAME record tilføjet i One.com
- [ ] Ventet 1-4 timer
- [ ] Domæne virker! ✅

**Test:**
- [ ] https://akutvagt.dk virker
- [ ] https://www.akutvagt.dk virker
- [ ] SSL-lås vises i browseren
- [ ] Kan se håndværkere på forsiden
- [ ] Admin-login virker
- [ ] Kan tilføje håndværkere i admin

---

## 🎯 Næste skridt

1. **Opret din admin-konto** i Supabase (se OPRET_ADMIN.md)
2. **Log ind** på `/admin-login`
3. **Tilføj håndværkere** i admin-panelet
4. **Del dit domæne** med kunder! 🚀

---

**Held og lykke! Du har gjort det! 🎉**

Hvis du har spørgsmål, gennemgå guiden igen eller kontakt support.
