# Pulse Clone

Pulse is a React project inspired by Spotify-style landing pages and premium conversion flows. It now includes a stronger Spotify-like home experience plus a dedicated login page, while keeping the assets original.

## What is inside

- `src/App.tsx`: the main Spotify-inspired landing page
- `src/styles.css`: the visual system, layout and responsive behaviour for both routes
- `.github/workflows/daily-commit.yml`: the daily automation workflow
- `scripts/update-daily-log.sh`: the script that records one automatic update per day
- `daily-log.md`: the journal updated by GitHub Actions
- `daily-roadmap.md`: the suggested daily evolution backlog

## Available commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Routes

- `/#/`: premium-style landing page
- `/#/login`: dedicated login page

## Daily commit automation

The workflow is configured for 9:00 AM Toronto time, Canada. Because GitHub Actions schedules only in UTC and Toronto changes with daylight saving time, the workflow runs at both 13:00 UTC and 14:00 UTC and the script records an update only when the local Toronto hour is exactly 9 AM.

Each automatic commit updates `daily-log.md`, stores the Toronto timestamp and suggests the next improvement from the roadmap.

Important: the workflow does not write real product code on its own. It only records daily progress automatically. Real UI evolution still depends on manual changes.

## Publish with GitHub web

1. Create a new empty repository on GitHub.
2. Use a name like `pulse-clone` or `daily-github-project`.
3. Do not add README, `.gitignore`, or license from GitHub.
4. Upload the contents of this folder to that repository.
5. Open `Actions` and run `Daily Commit` once to validate permissions.

## Good next improvements

1. Add form validation and error states to the login page.
2. Add scroll-triggered motion.
3. Connect a mock API for playlists.
4. Build a lightweight authenticated dashboard route.
