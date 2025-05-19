import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// ✅ PrimeVue Components
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Checkbox from "primevue/checkbox";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      DEFAULT: "{emerald.800}",
      50: "{emerald.50}",
      100: "{emerald.100}",
      200: "{emerald.200}",
      300: "{emerald.300}",
      400: "{emerald.400}",
      500: "{emerald.800}",
      600: "{emerald.900}",
      700: "{emerald.700}",
      800: "{emerald.800}",
      900: "{emerald.900}",
      950: "{emerald.950}",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}",
        },
      },
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  console.log("✅ PrimeVue plugin is being initialized...");

  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: MyPreset,
      options: { darkModeSelector: ".app-dark" },
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  });

  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
});
