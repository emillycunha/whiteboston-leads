import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: true,
  plugins: [{ src: "~/plugins/primevue", mode: "client" }],
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
  nitro: {
    preset: "netlify",
  },
});
