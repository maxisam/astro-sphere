import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import angular from "@analogjs/astro-angular"

const site = process.env.ASTRO_SITE ?? "https://astro-sphere-demo.vercel.app"
const baseInput = process.env.ASTRO_BASE ?? "/"
const base = baseInput.endsWith("/") ? baseInput : `${baseInput}/`

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [
    mdx(),
    sitemap(),
    angular({
      vite: {
        transformFilter: (_code, id) => id.endsWith(".component.ts"),
      },
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})
