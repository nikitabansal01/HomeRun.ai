# Homerun.ai

A voice-first AI chief of staff for modern families — concept product and interactive prototype.

Homerun.ai remembers what a household needs (school deadlines, schedules, finances, groceries, relationships) and delivers reminders **in the voice of whoever asked** — when your wife says "call the electrician," tomorrow's reminder sounds like her.

> This is a front-end prototype. Integrations (ElevenLabs voice, Instagram, Google Sheets/Calendar, receipt OCR, Netflix availability) are simulated with mock data — no real accounts are connected.

## Highlights

- **Landing page** (`/`) — the pitch: voice-first reminders, smart inputs, and three relationship layers.
- **Interactive dashboard** (`/app`) — a working demo powered by mock data:
  - **Voice reminders** — first-person messages played back in each family member's (simulated) cloned voice, ElevenLabs-style.
  - **Smart pantry** — snap a grocery receipt; stock and run-out dates are inferred via a simulated OCR pass.
  - **Movie radar** — drop an Instagram reel/post link to identify the movie and check whether it's on Netflix; forwarded DMs land here with taste-match scores.
  - **Finance hub** — credit cards + due dates synced from a Google Sheet (or a photo of one); monthly spend tracking.
  - **Calendar sync** — connect each family member's Google / iCloud calendar; dinners, outings, and pickups in one view.
  - **Your people** — three tabs: family at home, parents & in-laws, friends.

## Tech stack

- React 19 + Vite
- Tailwind CSS (dark "tech" design system: night surfaces, violet→cyan gradient accents, glass panels)
- React Router
- lucide-react icons

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  pages/        Landing.jsx, Dashboard.jsx
  components/
    landing/    Hero, FamilyVoices, SmartInputs, RelationshipLayers, Integrations, …
    dashboard/  VoiceReminders, PantryTile, MovieRadar, FinanceHub, CalendarTile, PeopleTabs, …
  data/         mockData.js — the sample household that powers the demo
  lib/          colors, date, and voice helpers
```

---

Design & prototype by Nikita Bansal.
