# Yuchen Gao — Portfolio

Single-page, bilingual (EN / 中文), fully responsive portfolio. Plain static site — no build step, no framework. Open `index.html` by double-clicking, deploy by drag-and-drop.

## Files
```
index.html      all sections + semantic structure
styles.css      design tokens, type scale, grain + gradient-mesh, responsive
script.js       i18n dictionary + toggle, scroll reveal, nav state, work modals, mobile menu
assets/         your CV, portrait, and per-project images (see assets/README.txt)
```

## Edit content
- **Copy** lives in the `I18N` object at the top of `script.js` (EN + ZH) and inline in `index.html`.
- **Projects** (cards + detail modals) live in the `PROJECTS` array in `script.js` — bilingual, edit in place.
- **Design tokens** (colours, fonts, spacing) live in `:root` at the top of `styles.css`.
- **Headline** is `Yuchen Gao.` in the hero; a commented `Portfolio` alternative sits right below it in `index.html`.

## Assets
Your portrait and all four project decks are already wired in — each project's pop-up has an in-page **slide viewer** (‹ › buttons, arrow keys) rendered from your PDFs/PPT. The only file still to add is the résumé: **`assets/Yuchen-Gao-CV.pdf`** (the three "Download CV" buttons link to it). Details and how to refresh a deck are in [`assets/README.txt`](assets/README.txt).

## Deploy (pick one)
1. **Netlify Drop** *(easiest)* — drag this whole folder onto <https://app.netlify.com/drop>. Instant URL.
2. **GitHub Pages** — push the folder to a repo, then Settings → Pages → Branch: `main` / root.
3. **Vercel** — import the repo, Framework Preset = **Other**, no build command.

### Custom domain (ygportfolio.xyz)
After deploying, add the domain in your host's dashboard (Netlify: Domain settings → Add custom domain; Vercel: Project → Domains) and point your registrar's DNS at the host's records.

## AI Assistant widget (the floating blob)

A floating gradient-blob chat helper (bottom-right) answers visitors' questions about Yuchen using **only** the knowledge base — via the Claude API through a serverless function, so the API key is never in the browser. It follows the site language for its UI and replies in whatever language the visitor types.

```
assistant.css        blob, hint bubble, chat panel (self-contained; tokens match the site)
assistant.js         widget logic: open/close, bilingual hints, chat, typing dots, starter chips
api/chat.js          serverless function — calls the Claude Messages API (key stays server-side)
api/knowledge.js     the facts the assistant is allowed to use (keep in sync with the site)
.env.example         ANTHROPIC_API_KEY + MODEL
```

It's **self-contained**: delete `assistant.*` and `/api` and the rest of the site still works. Without a backend (e.g. on Netlify Drop / GitHub Pages) the blob still appears and shows a friendly "email me instead" fallback — the live AI chat needs a serverless host.

### Make the chat live — deploy on Vercel (recommended)
1. Push the repo to GitHub and **import it on Vercel** (Framework Preset = **Other**, no build command). Vercel serves `/api/chat.js` as a serverless function automatically.
2. In **Project → Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` — your key from <https://console.anthropic.com>
   - `MODEL` — `claude-haiku-4-5` (fast + cheap; swap to `claude-sonnet-4-6` for richer answers)
3. Redeploy. The blob now answers from the knowledge base.

**Test locally with a real backend:** `npm i -g vercel`, put your key in a local `.env` (copy `.env.example`), then run `vercel dev` — it serves both the static site and `/api/chat`. (The bundled `node server.js` is static-only, so the blob shows the offline fallback there.)

### Netlify equivalent
Netlify functions live in a different folder and use a different handler signature. Create `netlify/functions/chat.js`:
```js
const mod = require("../../api/chat.js"); // reuse the same logic via a tiny adapter
exports.handler = async (event) => {
  const reqLike = {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
    socket: {},
  };
  return await new Promise((resolve) => {
    const res = {
      statusCode: 200, _body: "", _headers: {},
      setHeader(k, v) { this._headers[k] = v; },
      status(c) { this.statusCode = c; return this; },
      json(o) { resolve({ statusCode: this.statusCode, headers: { "content-type": "application/json", ...this._headers }, body: JSON.stringify(o) }); return this; },
    };
    mod(reqLike, res);
  });
};
```
Set the same env vars in **Site settings → Environment variables**. (On Vercel, no adapter is needed — `api/chat.js` works as-is.)

### Tuning the assistant
- **Facts:** edit `api/knowledge.js` — the assistant only answers from there. Keep it in sync with the site.
- **Tone / rules:** the system prompt is `SYSTEM_INSTRUCTIONS` at the top of `api/chat.js`.
- **Cost/safety:** caps input length, keeps the last 8 turns, best-effort rate-limits ~20 msgs/min per IP, same-origin only, and prompt-caches the static knowledge prefix.
- **Blob image (optional):** the blob is drawn in pure CSS by default. To use the provided PNG instead, drop it at `assets/blob-assistant.png` and set the `.asst__blob-shape` background to it.

## Notes
- Fonts load from Fontshare (Clash Display, Switzer, Sentient) + Google (Fraunces fallback) — needs internet on first load.
- Motion respects `prefers-reduced-motion`. Images lazy-load. Targets Lighthouse 95+.
