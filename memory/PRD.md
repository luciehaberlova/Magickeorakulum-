# Magické orákulum — PRD

## Original problem statement
Build a single-page web app "Magické orákulum" (Czech). On each load, randomly
select one of 6 masterclass offers and display it. Persist the result per
device via `localStorage` (`oracle_result`). Czech copy, beige background
(#FAF7F2), charcoal text (#1A1A1A), deep purple accent (#4A3F7A), Libre
Baskerville + Libre Franklin fonts. Crystal ball SVG with animated glints,
typewriter reveal, CTA pill button linking to masterclass, Instagram Stories
share section that copies a text and opens Instagram.

## Architecture
- Single static page. Two delivery forms:
  - React component at `/app/frontend/src/App.js` (for live preview)
  - True standalone single-file at `/app/oracle.html` (per spec deliverable)
- No backend / MongoDB / external libs (only Google Fonts).
- All animations via CSS keyframes.

## Implemented (2026-02)
- Crystal ball SVG (120px) with radial gradients + 3 animated glints (~5s loop)
- Ball fade-in (0.5s), then 0.8s pause, then line 1 typewriter (~40ms/char):
  "Magické orákulum říká…"
- 0.4s pause → line 2 typewriter: oracle text for selected masterclass
- 0.6s pause → CTA block fade-in (CTA lead, pill button, fine print)
- Pill button opens masterclass link (`target="_blank" rel="noopener noreferrer"`)
- Instagram section (separated by border):
  - copies "Magické orákulum od @luciehaberlova.cz #zahradnislavnost"
  - opens `instagram://app`, falls back to https://www.instagram.com/
  - shows "Text zkopírován! …" message for 4s, then fades out
- localStorage key `oracle_result` persists random index 0–5
- Mobile-first; fits 375px viewport without scrolling
- 6 masterclasses with placeholder links LINK_1 … LINK_6

## Personas
- Visitor at a garden party scanning a QR / opening a link on phone
- Returning visitor (sees same result, can re-share to Stories)

## Backlog / Next actions
- P0: Replace placeholder links LINK_1 … LINK_6 with real Circle URLs
- P1: Optional analytics or simple visit counter (deliberately omitted per spec)
- P2: Optional "Try again" hidden reset (long-press the ball?) — only if requested
- Deployment: host `/app/oracle.html` on any static host (Vercel / Netlify / GH Pages)
