import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: "static",
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  plugins: [{ src: "~/plugins/primevue", mode: "client" }],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "",
      },
      title: "White Boston Leads", // or whatever your project is
      meta: [{ name: "description", content: "Download guides and connect with real estate experts." }],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
      ],

      bodyAttrs: {
        class: "",
      },
    },
    pageTransition: { name: "fade", mode: "out-in" },
  },
});
