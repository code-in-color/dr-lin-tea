# Dr. Lin Tea — Ruby Fizz

A minimalist, editorial landing page for Dr. Lin Tea's sparkling botanical tea, built with SvelteKit 3, Svelte 5, and `@sveltejs/adapter-static`.

## Development

Requires Node.js 22.17+ (Node 24 LTS recommended).

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Checks and production build

```sh
pnpm check
pnpm build
pnpm preview
```

The entire site is prerendered into `build/`. Deploy that directory to a static host; no Node server or SPA fallback is needed. `pnpm preview` previews the production build locally.

The package manager is pinned in `package.json`. Vercel installs with `pnpm install --frozen-lockfile`, runs `pnpm build`, and publishes `build/` using adapter-static.

## Structure

- `src/routes/+page.svelte` — landing page and reactive newsletter demo
- `src/routes/+layout.svelte` — shared layout and global stylesheet import
- `src/routes/+layout.ts` — site-wide prerendering
- `src/app.html` — HTML document and font links
- `src/app.css` — existing design, CSS animations, and native scroll snapping
- `static/assets/` — product cutout and tea photograph, served at `/assets/`
- `vite.config.ts` — SvelteKit 3 configuration and static adapter
- `scripts/prepare-*.py` — earlier image preparation utilities; source photographs must be restored before regenerating images

The ingredient and gallery markup remains commented out, matching the current page. The newsletter retains its original demo behavior and is not connected to an email provider.

Scrolling uses CSS scroll snapping and native smooth scrolling with reduced-motion support. Sections can grow beyond the viewport when necessary to keep their content accessible.
