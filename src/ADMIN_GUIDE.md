# 🔐 Akutvagt Admin Guide

## 📋 Oversigt

Din hjemmeside er nu fuldt sikret med email/password login. Admin-panelet er skjult og kun tilgængeligt via skjulte URL'er. Admin-konti kan KUN oprettes via Supabase (ikke via hjemmesiden).

---

## 🚀 Kom i gang (FØRSTE GANG)

### Step 1: Opret admin-konto i Supabase

**VIGTIGT:** Admin-konti skal oprettes direkte i Supabase - ikke via hjemmesiden!

#### Metode A: Via Supabase Dashboard (Anbefalet)
1. Log ind på [Supabase Dashboard](https://supabase.com/dashboard)
2. Vælg dit projekt
3. Gå til **Authentication** → **Users**
4. Klik på **Add user** → **Create new user**
5. Udfyld:
   - **Email**: Din admin email (f.eks. `admin@akutvagt.dk`)
   - **Password**: Vælg et stærkt password
   - **Auto Confirm User**: ✅ Sæt flueben (vigtigt!)
6. Klik **Create user**

#### Metode B: Via SQL Editor
1. Gå til **SQL Editor** i Supabase
2. Kør denne SQL (ret email og password):
```sql
-- Opret admin bruger
SELECT auth.users_create_user(
  email := 'admin@akutvagt.dk',
  password := 'DitSikkerPassword123',
  email_confirmed := true
);
```

### Step 2: Log ind på hjemmesiden

1. Gå til: **`/admin-login`**
2. Indtast din email og password fra Supabase
3. Klik **"Log ind"**
4. Du er nu i admin-panelet! 🎉

---

## 🔑 Vigtige URL'er

| URL | Formål | Hvem kan se? |
|-----|--------|--------------|
| `/` | Offentlig forside | Alle |
| `/admin-login` | Login til admin | Alle (men kræver konto fra Supabase) |
| `/admin-dashboard` | Admin panel | Kun indloggede admins |

**💡 Tips:** Gem `/admin-login` URL'en som bogmærke i din browser!

---

## 👨‍💼 Sådan bruger du Admin-panelet

### Tilføj ny håndværker:
1. Klik på **"Tilføj ny"** (rød knap øverst)
2. Udfyld formularen:
   - Virksomhedsnavn* (påkrævet)
   - Kategori* (påkrævet)
   - Adresse* (påkrævet)
   - Telefon* (påkrævet)
   - Timepris (valgfri)
   - Hjemmeside (valgfri)
3. Klik **"Gem"**

### Rediger håndværker:
1. Klik på den blå blyant-ikon ved håndværkeren
2. Ret informationerne
3. Klik **"Gem"**

### Slet håndværker:
1. Klik på den røde skraldespands-ikon
2. Bekræft sletningen

### Log ud:
- Klik på **"Log ud"** knappen i øverste højre hjørne

---

## 👥 Flere admin-brugere

Hvis du vil tilføje flere administratorer:

1. Gentag **Step 1** (opret i Supabase) for hver ny admin
2. Giv dem email + password
3. De logger ind via `/admin-login`

**Alternativ:** Du kan også bruge Supabase's "Invite user" funktion hvis du har email-server sat op.

---

## 🔒 Sikkerhed

✅ **Hvad er sikkert:**
- Admin-konti kan KUN oprettes i Supabase (ikke på hjemmesiden)
- Kræver email + password login
- Admin URL'er er skjulte (ikke vist på forsiden)
- Session-baseret (forbliver logget ind)
- Tokens verificeres ved hver side-load

⚠️ **Vigtige sikkerhedstips:**
1. Brug **stærke passwords** (min. 12 tegn, tal + bogstaver + symboler)
2. Del **ALDRIG** dine Supabase login-oplysninger
3. Del **ALDRIG** dine admin loginoplysninger til hjemmesiden
4. Log **altid ud** når du er færdig på offentlige computere
5. Del **IKKE** admin URL'erne offentligt
6. Hold adgang til din Supabase konto **strengt fortrolig**

---

## 🌐 Offentlig side

### Hvad kan besøgende se?
- Liste over alle håndværkere
- Kategori-filtrering
- Kontaktoplysninger (telefon efter klik)
- **INGEN** admin-links eller knapper
- **INGEN** mulighed for at oprette admin-konti

### Hvordan tilføjer besøgende håndværkere?
- De kan **IKKE**! Kun du som admin kan det 🎉

---

## 📊 Funktioner

### ✅ Inkluderet:
- Email/password beskyttelse via Supabase Auth
- Tilføj håndværkere
- Rediger håndværkere
- Slet håndværkere
- Kategori-filtrering
- Klik-statistik (telefon + hjemmeside)
- Responsivt design
- Session-håndtering
- Sikker admin-oprettelse (kun via Supabase)

### 📈 Data der gemmes:
- Håndværker information
- Klik-statistik (hvor mange der klikker "Se nummer" og hjemmeside-links)
- Admin-brugerkonti (i Supabase Auth)

---

## 🆘 Problemløsning

### "Jeg kan ikke logge ind"
- Tjek at du har indtastet korrekt email og password
- Husk: Password er case-sensitive!
- Bekræft at brugeren er oprettet i Supabase Authentication
- Tjek at "Auto Confirm User" var aktiveret da du oprettede brugeren

### "Jeg bliver logget ud hele tiden"
- Dette sker hvis du clearer browser-data/cookies
- Log bare ind igen via `/admin-login`

### "Jeg har glemt mit password"
**Løsning:**
1. Gå til Supabase Dashboard
2. **Authentication** → **Users**
3. Find din bruger og klik på "..."
4. Vælg **Reset password** eller **Delete user** og opret ny

### "Hvordan sletter jeg en admin-bruger?"
1. Gå til Supabase Dashboard
2. **Authentication** → **Users**
3. Find brugeren
4. Klik på "..." → **Delete user**

---

## 📝 Checkliste: Første gang

1. ✅ Opret admin-konto i Supabase Dashboard eller via SQL
2. ✅ Notér email + password et sikkert sted (f.eks. password manager)
3. ✅ Log ind via `/admin-login`
4. ✅ Tilføj dine første håndværkere
5. ✅ Test at alt virker på forsiden (`/`)
6. ✅ Gem `/admin-login` som bogmærk i browser
7. ✅ Log ud for at teste login virker

---

## 🎯 Sikkerhedsfordele

- ✅ **Ingen offentlig signup** - Kun via Supabase
- ✅ **Ingen admin-links** på forsiden
- ✅ **Password-beskyttet**
- ✅ **Kun du kender admin-URL'erne**
- ✅ **Fuld kontrol** over hvem der har admin-adgang

---

## 🎉 Færdig!

Din hjemmeside er nu klar til brug med **maksimal sikkerhed**!

**Næste skridt:**
1. Opret din første admin i Supabase
2. Log ind på `/admin-login`
3. Start med at tilføje håndværkere!

---

## 📞 Support

**Har du brug for hjælp?**
- Tjek at du har fulgt alle trin korrekt
- Bekræft at admin-brugeren er oprettet i Supabase
- Kontakt din udvikler hvis problemer fortsætter
