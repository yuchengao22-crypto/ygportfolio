ASSETS — what's here and what to add.

ALREADY WIRED IN
  portrait.jpg                     ← your studio headshot (About section). Done.
  work/clarins/slides/             ← 33 slides rendered from your Clarins PDF
  work/lifestyle/slides/           ← 23 slides from the Lifestyle Aesthetics PDF
  work/webl/slides/                ← 28 slides from the WEBL PDF
  work/lvma-ctrip/slides/          ← 13 slides from the 绿马 × 携程 PowerPoint
  work/<slug>/cover.jpg            ← each project's first slide, used as the work-grid cover

  The decks are viewable directly in each project's pop-up (an in-page slide viewer:
  ‹ › buttons, arrow keys, slide counter). Originals were 60–90 MB each; these
  web-optimised slide images total ~20 MB so the site stays fast and deploys by drag-and-drop.

STILL TO ADD
  Yuchen-Gao-CV.pdf                ← bilingual résumé (the "Download CV" button × 3 links here)

NOTES
  • Landor has NO deck on purpose — it's client-confidential (UnionPay). The pop-up shows a
    short "available on request" note instead. If you get cleared to show visuals, drop a
    work/landor/slides/ folder (slide-01.jpg, slide-02.jpg, …) and set  slides: <count>  on the
    landor entry in script.js (and remove  confidential: true ).
  • To refresh or replace a deck: re-export the source to PDF, then re-render the slides
    (slide-01.jpg, slide-02.jpg, …, 1500 px wide, JPEG ~80) into work/<slug>/slides/ and update
    the  slides:  count for that project in script.js.
  • ⚠ Never use the national ID-card scans from your Downloads (IMG_1545 / IMG_9341) anywhere —
    they show your ID number and home address.
