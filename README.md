# Oakwood — Parent App (live_02)

Web-first learning management app for UK families. Parents manage their children's UK National Curriculum learning. Local-first, no backend required.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · Zustand · React Router v6 · shadcn/cmdk/Radix UI

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # production build
```

## Demo Credentials

| Profile | Role | PIN |
|---------|------|-----|
| Jamie Oakwood | Veli | 1234 |
| Alex Blackwood | Veli | 1234 |
| Amelia (Year 5) | Çocuk | 5678 |
| Oliver (Year 7) | Çocuk | 5678 |

## Architecture

```
live_02/src/
├── app/          — Router, AppShell (sidebar + topbar + AI panel)
├── components/   — Avatar, shadcn UI primitives
├── features/     — auth, dashboard, quiz, homework, subjects, reports, messages, settings
├── lib/          — quizService, homeworkService, aiService
├── state/        — Zustand store (oakwood-v2, localStorage persist)
└── types/        — Profile, QuizSession, Question, etc.
```

## Screens

- **Profile Selector** — family member cards, gender-neutral initials avatars
- **PIN Entry** — 4-digit, 5-attempt lockout, 30s cooldown
- **Family Hub** — parent + children hierarchy, family agenda
- **Quiz Wizard** — 3 steps: subject/topic → settings → preview
- **Quiz Session** — MC, gap-fill, open-ended; countdown timer
- **Quiz Result** — score, correct/wrong, AI suggestion, auto-homework generation
- **Homework** — grouped by subject, completable
- **Subjects** — active/inactive toggle, add/remove
- **Reports** — session history, trend, score stats
- **Messages** — direct family chat + threaded shared notes
- **Settings** — add/edit/delete parents and children
- **⌘K Palette** — nav, child switcher, quick actions

## AI Integration

AI features require a backend proxy at `http://localhost:3001`. Without it, AI buttons show a graceful fallback message. To enable:

```bash
cd ../live/server
cp .env.example .env   # add OPENAI_API_KEY
npm install && npm run dev
```

Alternatively, CLI bridge (Electron → claude/codex CLI) is planned for Faz 6.

## Design System

D+E hybrid — forest green (#4A6741) + warm minimal:
- Background: #fff8f5 · Border: #EAE4D9 · Primary: #4A6741
- Headings: Playfair Display italic · Body: Inter
- Utility classes: `.oak-card` `.oak-btn-primary` `.oak-btn-ghost` `.oak-nav-item`

## MVP Scope

Local-only (one device). No cloud sync, no teacher role yet. Data persists in browser localStorage under key `oakwood-v2`.

## Roadmap

| Phase | Content |
|-------|---------|
| Faz 0–2 ✅ | Shell, auth, quiz flow, homework, subjects, reports, messages |
| Faz 3 | AI service connection, flashcard mode |
| Faz 4 | Resource library (kaynakça), curriculum CSV import |
| Faz 5 | Mobile responsive |
| Faz 6 | Electron packaging + CLI bridge |
| Faz 7 | Teacher role, Supabase backend |
