import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import angular from "@analogjs/astro-angular"

// https://astro.build/config
export default defineConfig({
  site: "https://astro-sphere-demo.vercel.app",
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
