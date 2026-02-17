# 🔐 Sådan opretter du Admin-konto

## 📌 Hurtig Guide

Admin-konti kan **KUN** oprettes i Supabase - ikke via hjemmesiden. Dette sikrer maksimal sikkerhed.

---

## 🎯 Metode 1: Via Supabase Dashboard (Nemmest)

### Trin-for-trin:

1. **Gå til Supabase**
   - Åbn [supabase.com/dashboard](https://supabase.com/dashboard)
   - Log ind på din konto

2. **Vælg dit projekt**
   - Klik på dit Akutvagt-projekt

3. **Gå til Authentication**
   - Find menuen til venstre
   - Klik på **Authentication** (ikon med person)
   - Vælg **Users**

4. **Opret ny bruger**
   - Klik på **Add user** knappen (grøn knap øverst til højre)
   - Vælg **Create new user**

5. **Udfyld brugerinfo**
   ```
   Email: din@email.dk
   Password: DitSikkerPassword123
   Auto Confirm User: ✅ SÆT FLUEBEN (meget vigtigt!)
   ```

6. **Gem**
   - Klik **Create user**
   - Færdig! ✅

7. **Test login**
   - Gå til din hjemmeside: `/admin-login`
   - Log ind med den email og password du lige oprettede
   - Du skal nu være inde i admin-panelet!

---

## 💻 Metode 2: Via SQL (For erfarne)

### Trin-for-trin:

1. **Åbn SQL Editor**
   - I Supabase Dashboard
   - Klik på **SQL Editor** i menuen til venstre

2. **Kopier denne SQL**
   ```sql
   -- Opret admin bruger
   -- Ret email og password nedenfor
   
   SELECT auth.users_create_user(
     email := 'admin@akutvagt.dk',
     password := 'DitSikkerPassword123',
     email_confirmed := true
   );
   ```

3. **Tilpas værdierne**
   - Ret `admin@akutvagt.dk` til din ønskede email
   - Ret `DitSikkerPassword123` til dit ønskede password

4. **Kør SQL**
   - Klik **Run** eller tryk Ctrl+Enter
   - Du skulle gerne se en bekræftelse

5. **Test login**
   - Gå til `/admin-login` på din hjemmeside
   - Log ind med din nye konto

---

## ✅ Verificering

### Sådan tjekker du om brugeren er oprettet:

1. Gå til **Authentication** → **Users** i Supabase
2. Du skulle gerne se din nye bruger i listen
3. Under kolonnen "Email Confirmed" skal der stå **grøn hak** ✅
4. Hvis der står **rød kryds** ❌, skal du slette brugeren og oprette igen med "Auto Confirm" aktiveret

---

## 🔄 Opret flere admins

Vil du have flere administratorer? Gentag bare processen!

**Tips:**
- Brug forskellige emails for hver admin
- Vælg stærke, unikke passwords
- Hold styr på hvem der har adgang

---

## 🆘 Problemer?

### "Jeg kan ikke logge ind efter oprettelse"

**Tjek dette:**
1. ✅ Er brugeren bekræftet? (Se "Email Confirmed" i Supabase)
2. ✅ Indtaster du korrekt email + password?
3. ✅ Er password case-sensitive (store/små bogstaver)

**Løsning:**
- Slet brugeren i Supabase
- Opret igen og husk at sætte "Auto Confirm User" ✅

### "Email Confirmed er falsk (rød kryds)"

**Løsning:**
1. I Supabase: Find brugeren under **Authentication** → **Users**
2. Klik på de tre prikker (...) ved brugeren
3. Vælg **Delete user**
4. Opret brugeren igen og **sæt flueben ved "Auto Confirm User"**

### "Hvordan nulstiller jeg password?"

**Løsning:**
1. Gå til **Authentication** → **Users** i Supabase
2. Find brugeren
3. Klik på (...) → **Send password recovery**
4. ELLER slet brugeren og opret ny med nyt password

---

## 📝 Checkliste

Før du starter:
- [ ] Log ind på Supabase
- [ ] Find dit projekt
- [ ] Beslut din admin email
- [ ] Vælg et stærkt password (min. 12 tegn)

Under oprettelse:
- [ ] Indtast email korrekt
- [ ] Indtast stærkt password
- [ ] **SÆT FLUEBEN VED "AUTO CONFIRM USER"** ✅
- [ ] Klik Create/Run

Efter oprettelse:
- [ ] Gem email + password sikkert
- [ ] Test login på `/admin-login`
- [ ] Verificer at du kan tilgå `/admin-dashboard`

---

## 🎉 Færdig!

Nu har du en admin-konto og kan administrere din hjemmeside!

**Næste skridt:**
1. Gå til `/admin-login`
2. Log ind
3. Begynd at tilføje håndværkere!

---

## 💡 Gode råd

### Passwords:
- ✅ Minimum 12 tegn
- ✅ Kombination af store/små bogstaver, tal og symboler
- ✅ Brug en password manager (1Password, LastPass, etc.)
- ❌ Brug IKKE samme password som andre sites

### Sikkerhed:
- ✅ Del ALDRIG dine Supabase login-oplysninger
- ✅ Del ALDRIG dine admin loginoplysninger
- ✅ Log ud når du er færdig på offentlige computere
- ✅ Hold admin URL'er fortrolige

---

**Har du spørgsmål?** Læs ADMIN_GUIDE.md for mere information.
