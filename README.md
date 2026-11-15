# ADDIS Logistics & Supply Chain Solutions

Official bilingual (**Arabic RTL** / **English LTR**) web platform for **ADDIS Logistics & Supply Chain Solutions** (`https://addislogistics-ye.com`) — established in **2009**, operating across **150+ countries** from strategic hubs in **Sana'a, Aden, Hodeidah, and Istanbul**.

## Architecture & Highlights

- **Next.js 16 (App Router) + Static Export (`output: "export"`)**: Pre-rendered static site configured for custom-domain GitHub Pages (`public/CNAME` + `public/.nojekyll`).
- **Full-Viewport Scroll-Synced 3D Fleet (`Three.js` / `React Three Fiber`)**:
  - Uses 10 binary `.glb` 3D models in `public/models/`:
    - `cargo-plane.glb`, `cargo-ship.glb`, `cargo-ship-secondary.glb`, `port-tugboat.glb`, `shipping-container.glb`, `container-stack.glb`, `port-crane.glb`, `freight-truck.glb`, `delivery-truck.glb`, `flatbed-truck.glb`.
  - Normalized via `THREE.Box3` bounding-box scaling (`NormalizedGLBModel`) and animated in sync with global scroll progress (`0.0 -> 1.0`) plus interactive stage locks.
- **Automatic Language & RTL/LTR Layout**:
  - Detects browser language automatically (`ar` -> RTL with Cairo typography, `en` -> LTR with Plus Jakarta Sans), with manual switcher and Light/Dark semantic tokens using pure CSS logical properties (`ps-`, `pe-`, `start-`, `end-`, `text-start`, `rtl:rotate-180`).
- **Direct RFQ & Communications**:
  - Freight Quote builder and interactive CBM/Air Chargeable Weight Calculator wired directly to `mailto:info@addislogistics-ye.com`, WhatsApp (`+967 772900086`), and headquarters phone (`+967 1317338`).
- **SEO, GEO, REO & RAG Ready**:
  - Structured Schema.org JSON-LD `@graph` (`Organization`, `LocalBusiness`, `Service`, `FAQPage`) in `src/app/layout.tsx`.
  - AI & retrieval endpoints in `public/`: `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `ai.txt`, `llms.txt`, `llms-full.txt`, `rag-knowledge-base.json`, and `rag-chunks.jsonl`.

## Development & Static Build

```bash
pnpm install
pnpm dev
pnpm exec tsc --noEmit
pnpm run lint
pnpm run build
```

Static build artifacts are generated into `out/` and deployed to GitHub Pages (`addislogistics-ye.com`).

## Legacy Archive

All original assets captured from the prior deployment are preserved under `legacy-backup/` (`EXTRACTED_CONTENT.md`, `index.html`, `logo.png`, `favicon.ico`, `styles.css`, `page.js`).
