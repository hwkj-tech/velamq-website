# HanNet Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished React + Vite homepage for 瀚网科技, presenting VelaMQ and VelaMQ Bench as product lines and configuring GitHub Pages automatic deployment.

**Architecture:** The app is a static product homepage with reusable section components, data-driven content arrays, code-native technical diagrams, and CSS tokens based on the Stitch design system. Deployment is handled by a GitHub Actions workflow that builds `dist` and publishes it through GitHub Pages.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, lucide-react, GitHub Actions Pages.

---

## File Structure

- `src/content.ts`: all navigational labels, hero copy, capability data, solution data, architecture points, resource links, and footer content.
- `src/components/BrandMark.tsx`: 瀚网科技 company logo mark and wordmark.
- `src/components/ArchitectureVisual.tsx`: hero technical architecture visualization.
- `src/components/ClusterDiagram.tsx`: reliability section diagram.
- `src/App.tsx`: page composition and section markup.
- `src/App.css`: design tokens, layout, responsive styling, animation, and diagram styling.
- `src/index.css`: document-level reset and base font rendering.
- `src/App.test.tsx`: rendering and content tests for homepage requirements.
- `src/test/setup.ts`: Testing Library matcher setup.
- `vite.config.ts`: React plugin, GitHub Pages-compatible base, and Vitest config.
- `.github/workflows/deploy.yml`: GitHub Pages deployment.
- `public/.nojekyll`: prevents Jekyll processing.
- `README.md`: local development and deployment notes.

### Task 1: Test Harness

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`

- [ ] Add a `test` script using Vitest.
- [ ] Configure Vitest with `jsdom`, globals, and `src/test/setup.ts`.
- [ ] Write failing tests for the VelaMQ H1, navigation labels, CTAs, capability items, solution titles, resource links, and company legal name.
- [ ] Run `npm test -- --run` and verify it fails because the Vite starter page does not contain VelaMQ content.

### Task 2: Content And Components

**Files:**
- Create: `src/content.ts`
- Create: `src/components/BrandMark.tsx`
- Create: `src/components/ArchitectureVisual.tsx`
- Create: `src/components/ClusterDiagram.tsx`
- Modify: `src/App.tsx`

- [ ] Move all user-facing content into `src/content.ts`.
- [ ] Create a compact technical `BrandMark` with an accessible label.
- [ ] Build the hero architecture visual with code-native SVG/CSS blocks.
- [ ] Build the cluster reliability diagram with code-native SVG/CSS blocks.
- [ ] Compose the homepage sections in `App.tsx`.
- [ ] Run `npm test -- --run` and verify the homepage tests pass.

### Task 3: Styling

**Files:**
- Modify: `src/App.css`
- Modify: `src/index.css`

- [ ] Replace Vite template styling with Stitch-derived tokens.
- [ ] Implement desktop layout matching the Stitch structure.
- [ ] Add responsive layout for tablet/mobile.
- [ ] Use stable dimensions for diagrams, cards, buttons, and nav.
- [ ] Run `npm test -- --run` after styling changes.

### Task 4: Deployment And Docs

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `public/.nojekyll`
- Modify: `README.md`
- Modify: `index.html`

- [ ] Add the GitHub Pages workflow using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
- [ ] Set Vite `base: './'` for Pages path compatibility.
- [ ] Document local commands and GitHub Pages setup.
- [ ] Add product SEO title and description to `index.html`.

### Task 5: Verification

**Files:**
- No source edits expected unless verification finds issues.

- [ ] Run `npm test -- --run`.
- [ ] Run `npm run build`.
- [ ] Run `npm run lint`.
- [ ] Start the local dev server.
- [ ] Use the in-app Browser to verify desktop and mobile render, console health, page identity, visible copy, and CTA interaction.
