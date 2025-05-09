import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import "primeicons/primeicons.css";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// ✅ PrimeVue Components
import Button from "primevue/button";
import Message from "primevue/message";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Breadcrumb from "primevue/breadcrumb";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Badge from "primevue/badge";

import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{green.50}",
      100: "{green.100}",
      200: "{green.200}",
      300: "{green.300}",
      400: "{green.400}",
      500: "{green.500}",
      600: "{green.600}",
      700: "{green.700}",
      800: "{green.800}",
      900: "{green.900}",
      950: "{green.950}",
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

  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);

  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("Select", Select);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Message", Message);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Breadcrumb", Breadcrumb);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("Tag", Tag);
  nuxtApp.vueApp.component("Badge", Badge);

  nuxtApp.vueApp.directive("ripple", Ripple);
});
