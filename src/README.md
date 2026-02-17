# 🚨 Akutvagt - Håndværker Platform

En moderne, sikker platform til at vise akut håndværkere med deres kontaktoplysninger, priser og klik-statistik.

---

## 🎯 Hvad er dette?

En fuldt responsiv React-applikation med:
- 🏠 **Offentlig forside** - Viser håndværkere med kategori-filtrering
- 🔐 **Sikkert admin-panel** - Administrer håndværkere (kun for admins)
- 📊 **Klik-statistik** - Spor telefon- og hjemmeside-klik
- 💾 **Supabase database** - Permanent data-lagring
- 🔒 **Email/Password login** - Fuld sikkerhed via Supabase Auth

---

## 🚀 Kom hurtigt i gang

### 1️⃣ Opret din admin-konto

Admin-konti oprettes **KUN i Supabase** (ikke via hjemmesiden):

**Se detaljeret guide:** [OPRET_ADMIN.md](./OPRET_ADMIN.md)

**Hurtig oversigt:**
1. Log ind på [Supabase Dashboard](https://supabase.com/dashboard)
2. Gå til **Authentication** → **Users**
3. Klik **Add user** → **Create new user**
4. Udfyld email, password og **sæt flueben ved "Auto Confirm User"** ✅
5. Klik **Create user**

### 2️⃣ Log ind

1. Gå til `/admin-login` på din hjemmeside
2. Indtast din email + password fra Supabase
3. Du er nu admin! 🎉

### 3️⃣ Tilføj håndværkere

1. I admin-panelet (`/admin-dashboard`)
2. Klik **Tilføj ny**
3. Udfyld formular og gem

---

## 📂 Struktur

```
/
├── components/
│   ├── PublicSite.tsx       # Offentlig forside
│   ├── AdminLogin.tsx       # Admin login-side
│   ├── AdminPanel.tsx       # Admin panel (beskyttet)
│   ├── CraftsmanCard.tsx    # Håndværker-kort
│   └── FilterBar.tsx        # Kategori-filter
├── supabase/
│   └── functions/server/
│       └── index.tsx        # Backend API
├── utils/
│   ├── api.ts              # API-kald til backend
│   └── supabase/
│       └── info.tsx        # Supabase config (auto-genereret)
├── types.ts                # TypeScript typer
├── routes.ts               # React Router setup
└── App.tsx                 # Main entry point
```

---

## 🌐 URL'er

| URL | Beskrivelse | Adgang |
|-----|-------------|--------|
| `/` | Offentlig forside med håndværkere | Alle |
| `/admin-login` | Login til admin | Alle (kræver konto) |
| `/admin-dashboard` | Admin panel | Kun indloggede admins |

**💡 Tip:** Gem `/admin-login` som bogmærk!

---

## 🔐 Sikkerhed

✅ **Implementeret:**
- Admin-konti kan **KUN** oprettes i Supabase (ikke via hjemmesiden)
- Email + password authentication via Supabase Auth
- Session-baseret login med token-verificering
- Auto-redirect hvis ikke logget ind
- Skjulte admin-URL'er (ingen links på forsiden)
- Logout funktion

❌ **INGEN offentlig signup** - Maksimal sikkerhed!

---

## 📊 Features

### Offentlig side (/)
- ✅ Viser alle håndværkere som kort
- ✅ Kategori-filtrering (VVS, Elektriker, Glarmester, osv.)
- ✅ Skjult telefonnummer (vises ved klik på "Se nummer")
- ✅ Hjemmeside-links
- ✅ Responsivt design (mobil + desktop)
- ✅ Klik-statistik registrering

### Admin Panel (/admin-dashboard)
- ✅ Tilføj nye håndværkere
- ✅ Rediger eksisterende håndværkere
- ✅ Slet håndværkere
- ✅ Oversigt i tabel-format
- ✅ Kategori-udvælgelse
- ✅ Log ud funktion

### Database
- ✅ Permanent lagring i Supabase
- ✅ Key-Value tabel for håndværkere
- ✅ Klik-statistik gemmes permanent
- ✅ Sample data initialization

---

## 🛠️ Teknologi Stack

- **Frontend:** React + TypeScript + Tailwind CSS v4
- **Backend:** Supabase Edge Functions (Hono web server)
- **Database:** Supabase Postgres (via KV store)
- **Auth:** Supabase Authentication
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Deployment:** Figma Make

---

## 📖 Guides

| Guide | Beskrivelse |
|-------|-------------|
| [OPRET_ADMIN.md](./OPRET_ADMIN.md) | Detaljeret guide til at oprette admin-konto |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | Komplet admin manual med alle features |

---

## 🔄 Workflow

### For første gang:
1. **Opret admin** i Supabase Dashboard
2. **Log ind** via `/admin-login`
3. **Tilføj håndværkere** i admin-panelet
4. **Test** på forsiden at alt virker

### Daglig brug:
1. Gå til `/admin-login`
2. Log ind
3. Administrer håndværkere
4. Log ud når færdig

---

## 📊 Data Model

### Håndværker (Craftsman)
```typescript
{
  id: string;              // UUID
  companyName: string;     // Virksomhedsnavn
  address: string;         // Adresse
  phone: string;           // Telefonnummer
  category: string;        // Kategori (VVS, Elektriker, osv.)
  hourlyRate?: number;     // Timepris (valgfri)
  website?: string;        // Hjemmeside (valgfri)
  createdAt?: string;      // Oprettelsestidspunkt
  updatedAt?: string;      // Sidst opdateret
}
```

### Klik-statistik
```typescript
{
  id: string;              // UUID
  craftsmanId: string;     // Reference til håndværker
  type: 'phone' | 'website'; // Type af klik
  timestamp: string;       // Tidspunkt for klik
}
```

---

## 🆘 Support

### Almindelige problemer:

**"Jeg kan ikke logge ind"**
→ Tjek at brugeren er oprettet i Supabase med "Auto Confirm" aktiveret

**"Siden viser ingen håndværkere"**
→ Log ind som admin og tilføj håndværkere

**"Hvordan tilføjer jeg flere admins?"**
→ Opret flere brugere i Supabase (se OPRET_ADMIN.md)

**Læs mere:** [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

---

## ⚙️ Kategorier

Følgende kategorier er tilgængelige:
- VVS
- Elektriker
- Glarmester
- Låsesmed
- Tømrer
- Murer

*Kategorier kan udvides ved at redigere dropdown i AdminPanel.tsx*

---

## 🎨 Design

- Minimalistisk og moderne
- Rød accent-farve (#DC2626)
- Kort med skygger
- Responsivt grid-layout
- Mobil-venligt
- Tailwind CSS v4

---

## 📝 License

Private projekt - Alle rettigheder forbeholdes.

---

## 🎉 Konklusion

Din hjemmeside er nu klar med:
- ✅ Sikker admin-beskyttelse
- ✅ Nemt at administrere
- ✅ Professionelt design
- ✅ Permanent data-lagring
- ✅ Klik-statistik

**Start nu:** Opret din admin-konto i Supabase og begynd at tilføje håndværkere!

---

**Udvikllet med ❤️ for Akutvagt**
