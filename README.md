# Aplikacja do Zarządzania Warsztatem Samochodowym

## Opis projektu

Aplikacja umożliwia kompleksową obsługę warsztatu samochodowego, w tym:

- Zarządzanie klientami,
- Zarządzanie naprawami,
- Zarządzanie samochodami.

Jest to projekt grupowy zrealizowany w ramach studiów.

---

## Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane następujące narzędzia:

- [Node.js](https://nodejs.org/) w wersji 16 lub nowszej,
- [pnpm](https://pnpm.io/) w wersji 7 lub nowszej.

---

## Instalacja

1. **Sklonuj repozytorium:**

   ```bash
   git clone <URL_DO_REPOZYTORIUM>
   cd <NAZWA_FOLDERU>

   ```

2. Zainstaluj zależności:

pnpm install

3. Skonfiguruj zmienne środowiskowe:

Skopiuj plik .env.example i utwórz plik .env:

cp .env.example .env  
W pliku .env ustaw wartość VITE_API_URL na adres swojego API.

Uruchamianie aplikacji

Uruchom aplikację w trybie deweloperskim:

pnpm dev  
Aplikacja będzie dostępna pod adresem: http://localhost:5173.

Budowanie aplikacji do produkcji:

pnpm build  
Wynikiem będzie folder dist zawierający zbudowaną aplikację.

Podgląd zbudowanej aplikacji:

pnpm preview  
Aplikacja będzie dostępna pod adresem: http://localhost:4173.

Struktura projektu

src/ - Główny folder projektu zawierający kod źródłowy aplikacji:
components/ - Reużywalne komponenty React,
pages/ - Strony aplikacji,
services/ - Logika komunikacji z API,
styles/ - Pliki stylów,
utils/ - Funkcje pomocnicze.
public/ - Folder publiczny zawierający statyczne zasoby.

Konfiguracja zmiennych środowiskowych

Plik .env powinien zawierać następującą zmienną:

VITE_API_URL - URL do Twojego API.

Przykład pliku .env znajduje się w pliku .env.example.

Technologie

React (z TypeScript),
Vite (jako bundler),
pnpm (do zarządzania zależnościami).
