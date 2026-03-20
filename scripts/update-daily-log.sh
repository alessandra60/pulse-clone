#!/usr/bin/env bash
set -euo pipefail

TORONTO_DATE="$(TZ="America/Toronto" date +%F)"
TORONTO_HOUR="$(TZ="America/Toronto" date +%H)"
STAMP="$(TZ="America/Toronto" date +"%Y-%m-%d %I:%M:%S %p America/Toronto")"
TOTAL_UPDATES="$(grep -c "Last automated update:" daily-log.md || true)"
TRIGGER_EVENT="${GITHUB_EVENT_NAME:-schedule}"
COMMIT_MESSAGE_FILE=".daily-commit-message.txt"

ROADMAP=(
  "Refine the hero spacing and balance the typography."
  "Add a real mobile navigation overlay."
  "Create a modal login form inspired by Spotify."
  "Add subtle scroll reveals for cards and sections."
  "Improve keyboard support for category chips."
  "Add a playlist details drawer."
  "Create a pricing or premium comparison section."
  "Add a testimonials carousel."
  "Introduce a mock API layer for playlists."
  "Add loading skeletons and empty states."
  "Improve accessibility labels and color contrast."
  "Add a second theme direction for experimentation."
  "Polish footer and social links."
  "Review performance and bundle size."
)

ENTRY_INTROS=(
  "Checked in a short progress note for the project today."
  "Captured today's progress snapshot for the case study."
  "Added a daily update to keep the project history moving."
  "Recorded today's project note to keep the worklog current."
  "Saved a quick progress entry for the current iteration."
)

COMMIT_MESSAGES=(
  "docs: record daily project note"
  "docs: update progress journal"
  "docs: capture today's project snapshot"
  "docs: log daily progress note"
  "docs: note the next project focus"
)

NEXT_INDEX=$((TOTAL_UPDATES % ${#ROADMAP[@]}))
NEXT_FOCUS="${ROADMAP[$NEXT_INDEX]}"
ENTRY_INTRO="${ENTRY_INTROS[$((TOTAL_UPDATES % ${#ENTRY_INTROS[@]}))]}"
COMMIT_MESSAGE="${COMMIT_MESSAGES[$((TOTAL_UPDATES % ${#COMMIT_MESSAGES[@]}))]}"

if [ "${TRIGGER_EVENT}" != "workflow_dispatch" ] && [ "${TORONTO_HOUR}" != "09" ]; then
  exit 0
fi

if grep -q "Last automated update: ${TORONTO_DATE}" daily-log.md; then
  exit 0
fi

printf '%s\n' "${COMMIT_MESSAGE}" > "${COMMIT_MESSAGE_FILE}"

{
  echo ""
  echo "- Last automated update: ${TORONTO_DATE}"
  echo "- Daily note: ${ENTRY_INTRO}"
  echo "- Logged at: ${STAMP}"
  echo "- Next focus: ${NEXT_FOCUS}"
} >> daily-log.md
