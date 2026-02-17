![Astro Sphere Lighthouse Score](_astrosphere.jpg)

Astro Sphere is a static, minimalist, lightweight, lightning fast portfolio and blog theme based on my personal website.

It is primarily Astro, Tailwind and Typescript, with a very small amount of Angular for stateful components.

## ✅ Quickstart

1. Install dependencies:

```bash
corepack enable
yarn install
```

2. Start the dev server:

```bash
yarn dev
```

3. Open `http://localhost:4321`

## 🔧 Requirements

- Node.js 20+ recommended
- Yarn 4 (via Corepack)

## 🧱 Stack

- Astro `^5.17.2`
- `@analogjs/astro-angular` `latest`
- Angular `latest`
- Tailwind CSS `^3.4.1`
- TypeScript `^5.3.3`
- Fuse.js `^7.0.0`

## 🧩 Architecture

- Astro pages/layouts handle routing and static content
- Angular standalone components are used as Astro islands for interactive UI
- Tailwind drives styling across Astro and Angular templates

## 🚀 Deploy your own

[![Deploy with Vercel](_deploy_vercel.svg)](https://vercel.com/new/clone?repository-url=https://github.com/markhorn-dev/astro-sphere)  [![Deploy with Netlify](_deploy_netlify.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/markhorn-dev/astro-sphere)

## 📋 Features

- ✅ 100/100 Lighthouse performance
- ✅ Responsive
- ✅ Accessible
- ✅ SEO-friendly
- ✅ Typesafe
- ✅ Minimal style
- ✅ Light/Dark Theme
- ✅ Animated UI
- ✅ Tailwind styling
- ✅ Auto generated sitemap
- ✅ Auto generated RSS Feed
- ✅ Markdown support
- ✅ MDX Support (components in your markdown)
- ✅ Searchable content (posts and projects)
- ✅ Code Blocks - copy to clipboard

## 💯 Lighthouse score
![Astro Sphere Lighthouse Score](_lighthouse.png)

## 🕊️ Lightweight
All pages under 100kb (including fonts)

## ⚡︎ Fast
Rendered in ~40ms on localhost

## 📄 Configuration

The blog posts on the demo serve as the documentation and configuration.

## 🧭 Project Structure

- `src/pages` routes and page templates
- `src/components` shared UI and Angular island components
- `src/content` blog posts and projects (Markdown/MDX)
- `public` static assets

## 💻 Commands

All commands are run from the root of the project, from a terminal:

Replace `yarn` with your package manager of choice if needed.

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `yarn install`            | Installs dependencies                            |
| `yarn dev`                | Starts local dev server at `localhost:4321`      |
| `yarn dev:network`        | Starts dev server on local network               |
| `yarn build`              | Build your production site to `./dist/`          |
| `yarn preview`            | Preview your build locally, before deploying     |
| `yarn preview:network`    | Starts preview server on local network           |
| `yarn astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help`    | Get help using the Astro CLI                     |
| `yarn lint`               | Run ESLint                                       |
| `yarn lint:fix`           | Auto-fix ESLint issues                           |

## 🗺️ Roadmap

A few features I plan to implement
- ⬜ Article Pages - Table of Contents
- ⬜ Article Pages - Share on social media

## ✨ Acknowledgement

Theme inspired by [Paco Coursey](https://paco.me/), [Lee Robinson](https://leerob.io/) and [Hayden Bleasel](https://www.haydenbleasel.com/)


## 🏛️ License

MIT

## 📝 Changelog

- 2026-02-16: Switched stateful islands from SolidJS to Angular via `@analogjs/astro-angular`.
- 2026-02-17: Upgraded Astro and official integrations to v5-compatible versions.


# 1.0.1 Update

Added ability to run dev and preview on local network.
added npm run dev:network
added npm run preview:network

Added slightly more particle density in both light and dark mode.

Added subtle dark mode star and meteor animations.

Removed eslint config

