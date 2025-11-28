# SysFlow Landing Page - React + TypeScript + Vite

Nowoczesny landing page oparty na oficjalnej stronie SysFlow.one - software house specjalizujący się w automatyzacji, AI, bezpieczeństwie i systemach zarządzania danymi.

## 🚀 Technologie

- **React 18** - biblioteka UI
- **TypeScript** - typowanie statyczne
- **Vite** - szybkie narzędzie budowania
- **CSS Modules** - modułowe style
- **Yarn** - menedżer pakietów

## 📁 Struktura Projektu

```
sysfow/
├── src/
│   ├── components/
│   │   ├── home/               # Komponenty głównych sekcji
│   │   │   ├── Hero.tsx         - Sekcja hero z nagłówkiem
│   │   │   ├── Problems.tsx     - Problemy firm
│   │   │   ├── Solutions.tsx    - Nasze rozwiązania
│   │   │   ├── Training.tsx     - Szczegóły szkolenia
│   │   │   ├── FlowOne.tsx      - System FlowOne
│   │   │   ├── Team.tsx         - Zespół
│   │   │   ├── WhyChoose.tsx    - Dlaczego wybrać
│   │   │   ├── CTA.tsx          - Call to action
│   │   │   └── Contact.tsx      - Kontakt
│   │   ├── layout/             # Nawigacja i footer
│   │   │   └── index.tsx
│   │   └── shared/             # Współdzielone komponenty
│   │       └── Icons.tsx
│   ├── hooks/                  # Custom hooki
│   │   ├── useRevealOnIntersect.ts
│   │   └── useScrollToSection.ts
│   ├── constants/              # Stałe i dane
│   │   └── index.ts
│   ├── styles/                 # Globalne style
│   │   └── global.css
│   ├── App.tsx                 # Główny komponent
│   └── main.tsx                # Punkt wejścia
├── public/                     # Pliki statyczne (favicon, media)
│   ├── image/
│   │   ├── logo.png            - favicon oraz znak firmowy
│   │   ├── kurdziel.jpg
│   │   └── ribeiro.jpg
│   └── video/
│       ├── hero.mp4
│       └── video1.mp4
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README_PL.md
```

## 🛠 Instalacja

### Wymagania
- Node.js >= 16
- Yarn >= 1.22

### Kroki

1. **Zainstaluj zależności:**
```bash
yarn install
```

2. **Uruchom serwer deweloperski:**
```bash
yarn dev
```

3. **Otwórz w przeglądarce:**
```
http://localhost:5173
```

## 📦 Dostępne Komendy

```bash
# Uruchom serwer deweloperski
yarn dev

# Zbuduj projekt do produkcji
yarn build

# Sprawdź linting
yarn lint

# Podejrzyj build produkcyjny
yarn preview
```

## ✨ Funkcje

- ✅ **Responsywny design** - działa na wszystkich urządzeniach
- ✅ **TypeScript** - pełne typowanie
- ✅ **CSS Modules** - izolowane style
- ✅ **Custom Hooks** - useRevealOnIntersect, useScrollToSection
- ✅ **Smooth scrolling** - płynne przewijanie między sekcjami
- ✅ **Animacje** - eleganckie animacje przy scrollowaniu (Intersection Observer)
- ✅ **SEO-friendly** - zoptymalizowana struktura HTML
- ✅ **Fast Refresh** - natychmiastowe odświeżanie w trybie dev

## 📱 Sekcje Strony

1. **Hero** - główny nagłówek z CTA i nawigacją
2. **Problems** - wyzwania i problemy firm
3. **Solutions** - nasze rozwiązania i oferta SysFlow
4. **Training** - szczegóły programu szkoleniowego
   - 8 spotkań po 60 minut
   - Cena: 12,000 PLN
   - Pełna agenda z 9 modułami
   - Funkcje wyróżniające
5. **FlowOne** - system FlowOne do automatyzacji
   - Cel wdrożenia
   - 5-etapowy proces wdrożenia
   - 6 obszarów automatyzacji
6. **Team** - prezentacja zespołu SysFlow
7. **WhyChoose** - dlaczego warto wybrać SysFlow + filozofia
8. **CTA** - call to action z krokami do rozpoczęcia współpracy
9. **Contact** - dane kontaktowe + stopka

## 🎨 Customizacja

### Kolory

Edytuj zmienne CSS w `src/styles/global.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --text-dark: #1f2937;
  --text-gray: #6b7280;
  --bg-light: #f9fafb;
  --bg-white: #ffffff;
}
```

### Treści

Wszystkie stałe dane znajdują się w `src/constants/index.ts`:
- Dane kontaktowe
- Członkowie zespołu
- Punkty agendy szkolenia
- Obszary automatyzacji
- i więcej...

### Czcionki

Używana czcionka: **Inter** (Google Fonts)

Zmień w `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

## 🔧 Dalszy Rozwój

Możliwe rozszerzenia:
- [ ] Formularz kontaktowy z walidacją
- [ ] Integracja z API/CRM
- [ ] Blog/aktualności
- [ ] Galeria projektów
- [ ] Testimonials/opinie klientów
- [ ] Wersja wielojęzyczna (i18n)
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Animacje z Framer Motion
- [ ] Testy jednostkowe (Vitest)
- [ ] Testy E2E (Playwright/Cypress)

## 📞 Kontakt

- **Email:** contact@sysflow.one
- **Tel:** +48 692 311 723

## 📄 Licencja

Projekt stworzony na podstawie strony [SysFlow.one](https://sysflow.one/)

## 🤝 Contribucja

1. Fork projektu
2. Stwórz branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📚 Dokumentacja

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

**Zbudowano z ❤️ dla SysFlow**

