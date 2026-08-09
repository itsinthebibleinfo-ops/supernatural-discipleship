# Supernatural Upgrade Discipleship

A no-login discipleship quick course built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Basic, Immediate, and Advanced discipleship tracks
- Guided lessons with Scriptures, deep-dive prompts, practical application, and prayer focus
- KJV Bible passage lookup through a server route
- Course-linked Greek/Hebrew lexicon notes
- Flashcards for study and review
- Focused app routes instead of one long page: `/`, `/lessons/[id]`, `/bible`, and `/flashcards`
- Local-only progress tracking with browser `localStorage`
- No sign-in, no database, no user profile, and no personal data collection

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Bible Data

The app proxies KJV passage lookups through `src/app/api/bible/route.ts` using `https://bible-api.com`.
Course content and lexicon entries are deterministic local data in `src/lib/course-data.ts`.

## Deployment

This project is ready for Vercel:

```bash
vercel --prod
```
