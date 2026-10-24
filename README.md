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

## Link previews

Open Graph and Twitter metadata select `static/assets/ruby-fizz-social.jpg`, a 1200 × 630 can-focused image, for shared links (including iMessage).

The public URL defaults to `https://code-in-color.github.io/dr-lin-tea`. When moving to a custom domain, set `PUBLIC_SITE_URL` in the build environment (or copy `.env` to `.env` and update it) and rebuild. Include the project path for GitHub Pages, and use the domain root for a custom domain. This setting controls preview/canonical URLs, not the deployment base path.

Regenerate the preview with `python3 scripts/prepare-social.py` (requires Pillow). Messaging apps may cache previews for previously shared URLs.
