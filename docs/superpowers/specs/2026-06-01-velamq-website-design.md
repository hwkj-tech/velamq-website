# HanNet Website Design Spec

## Goal

Build a React + Vite company website for 南京瀚网科技有限公司, using `瀚网科技` as the primary brand and presenting VelaMQ and VelaMQ Bench as separate product lines, with GitHub Pages automatic deployment.

## Source Design

- Stitch project: `14630401735232463479`
- Stitch screen: `a721a9e3eb914e0295dd509295fd1142`
- Screen title: `VelaMQ Homepage - Desktop`

## Positioning

瀚网科技 is presented as an infrastructure company focused on IoT real-time messaging, high-concurrency connected devices, low-latency routing, rule-engine data processing, benchmark tooling, high-availability clusters, observable operations, and edge-cloud collaboration.

The page can be inspired by the EMQX product category, but it must use original visual design and original copy.

## Brand Architecture

- Company display brand: `瀚网科技`.
- Company legal name: `南京瀚网科技有限公司`.
- Company logo: independent abstract `H` plus network nodes, not the VelaMQ product mark.
- Product line 1: `VelaMQ`, a cloud-native MQTT messaging platform.
- Product line 2: `VelaMQ Bench`, an MQTT / IoT messaging platform performance testing and benchmarking tool.

## Information Architecture

The homepage contains:

1. Header with `瀚网科技`, the independent company logo, navigation, GitHub link, and contact CTA.
2. Hero section with the H1 `构建可靠的物联网实时消息基础设施`.
3. Architecture visual showing devices, product nodes, message fabric, data sinks, and observability.
4. Product section titled `产品矩阵`, featuring `VelaMQ` and `VelaMQ Bench`.
5. Capabilities section titled `为海量设备连接而设计`.
6. Reliability section titled `从单节点到多区域集群的稳定消息底座`.
7. Solutions section titled `覆盖关键物联网实时数据场景`.
8. Developer section titled `开发者可以快速开始`.
9. Final CTA and footer for 南京瀚网科技有限公司.

## Visual System

- Palette: graphite, white, light neutral surfaces, teal, cyan, and restrained amber.
- Typography: Chinese-first system sans, with Inter-like Latin fallback and monospaced technical labels.
- Components: 6px to 8px radius, 1px borders, no nested cards, no decorative orbs, no purple/blue gradient theme.
- Visuals: code-native SVG logo and CSS technical diagrams, not stock photos.
- Motion: restrained signal pulses on the logo and architecture diagram, disabled under reduced-motion preferences.
- Layout: full production homepage with varied section rhythm and a visible next-section hint below the hero.

## Implementation Requirements

- Create `/Users/lulu/Work/yunliu-tech/website` as a standalone React + Vite + TypeScript app.
- Use focused React components and data modules instead of a monolithic page.
- Add tests for required copy, navigation, capabilities, solution content, and developer resource links.
- Configure Vite with relative asset paths for GitHub Pages compatibility.
- Add `.github/workflows/deploy.yml` using GitHub Pages actions.
- Include a `.nojekyll` file in `public`.

## Acceptance Checks

- `npm test -- --run` passes.
- `npm run build` passes.
- `npm run lint` passes.
- Local browser smoke test renders desktop and mobile first view without framework overlay, blank screen, console errors, or obvious clipping.
