import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "netlify",
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  plugins: [{ src: "~/plugins/primevue" }],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "",
      },
      bodyAttrs: {
        class: "",
      },
    },
    pageTransition: { name: "fade", mode: "out-in" },
  },
});
