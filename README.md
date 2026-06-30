
# Qahwa

Qahwa is a warm, indie-style coffee discovery app where users can browse coffee shops, rate them on coffee, vibe, and internet, and earn points for contributing reviews.

It is designed to feel cozy, modern, and community-driven — like a digital notebook for people who care about where they drink coffee and study best. Designed for you. 

## Why Qahwa exists

Finding a good coffee shop is not just about the coffee. It is also about the atmosphere, the internet, the seating, and whether the place is actually usable for studying or working.

Qahwa gives users a simple way to discover and compare cafes using the things that matter most:

- Coffee quality
- Vibe
- Internet quality
- Community ratings
- Personal points and progress

## MVP Features

- Browse a list of coffee shops
- Open a coffee shop detail page
- Rate each shop on three categories:
  - Coffee ☕
  - Vibe 🎧
  - Internet 📶
- Earn points for submitting ratings
- See overall shop scores
- Use a warm, visually rich UI with an indie feel

## Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Local mock data for the first version
- Firebase or Supabase later for persistence

## Design Direction

Qahwa is intentionally not corporate-looking.

The visual system should feel:

- warm
- cozy
- indie
- slightly handmade
- soft, layered, and inviting

### Color Palette

- Background: `#F5E9DA`
- Primary text: `#3E2C23`
- Secondary text: `#6F4E37`
- Accent: `#D9A066`
- Secondary accent: `#7A8F7B`
- Alert: `#A65D57`

### Typography

- Headings: serif font such as Playfair Display or Lora
- Body: clean sans-serif such as Inter

## User Flow

1. Open the app
2. Browse coffee shops
3. Open a shop page
4. Rate coffee, vibe, and internet
5. Earn points
6. Return later to rate more places

The app is built around a simple loop:

**discover → rate → earn points → repeat**

## Data Model

### CoffeeShop

```ts
interface CoffeeShop {
  id: string;
  name: string;
  location: string;
  image_url: string;
}
````

### Rating

```ts
interface Rating {
  id: string;
  shop_id: string;
  coffee: number;
  vibe: number;
  internet: number;
  created_at: string;
}
```

### User

```ts
interface User {
  id: string;
  name: string;
  points: number;
}
```

## Points System

The points system is intentionally simple for the MVP:

* +10 points per submitted rating
* +5 bonus points if all three categories are completed

This makes the app feel rewarding without adding unnecessary complexity.

## Project Structure

```text
/src
  /app
    page.tsx
    /shop/[id]/page.tsx
    /rate/[id]/page.tsx

  /components
    CafeCard.tsx
    RatingForm.tsx
    PointsBar.tsx

  /data
    shops.ts

  /types
    index.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

### 3. Open the browser

Go to:

```text
http://localhost:3000
```

## Roadmap

### Phase 1 — MVP

* Browse shops
* Rate shops
* Show points
* Basic detail pages

### Phase 2 — Persistence

* Add Firebase or Supabase
* Store ratings in a real database
* Save points across sessions

### Phase 3 — Social Features

* Friends
* Highlight favorite shops
* Shared activity feed

### Phase 4 — Discovery Features

* Search
* Filters
* Categories like quiet, aesthetic, or study-friendly
* Better ranking logic

## Notes

This project is designed to be:

* easy to start
* visually strong
* fun to use
* expandable later

The first version should focus on clarity, atmosphere, and a satisfying rating experience.

## License

MIT
