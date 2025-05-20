<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 w-full max-w-md rounded-xl shadow-2xl border border-gray-200">
      <h1 class="text-2xl font-bold mb-6 text-center">Get Your Buyer's Guide</h1>

      <form @submit.prevent="onSubmit" name="da-buyers-guide">
        <!-- honeypot -->
        <p class="hidden">
          <label>
            Don’t fill this out if you're human:
            <input name="bot-field" type="text" />
          </label>
        </p>

        <div class="mb-4 flex gap-4">
          <div class="w-1/2">
            <label class="block mb-2 text-sm font-medium">
              First Name
              <span class="text-red-500">*</span>
            </label>
            <InputText v-model="firstName" name="firstName" class="w-full" required />
          </div>

          <div class="w-1/2">
            <label class="block mb-2 text-sm font-medium">Last Name</label>
            <InputText v-model="lastName" name="lastName" class="w-full" />
          </div>
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Phone</label>
          <InputText v-model="phone" name="phone" class="w-full" />
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium">
            Email
            <span class="text-red-500">*</span>
          </label>
          <InputText v-model="email" name="email" type="email" class="w-full" required />
        </div>

        <div class="mb-6 flex items-center">
          <Checkbox v-model="subscribe" inputId="subscribe" name="subscribe" binary class="mr-4" />
          <label for="subscribe" class="text-sm">I agree to receive the Abrahams Real Estate TIES Team newsletter.</label>
        </div>

        <Button label="Get the Guide" type="submit" class="bg-green-800 border-none" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const email = ref("");
const bot = ref("");
const subscribe = ref(false);

async function onSubmit() {
  const body = new URLSearchParams({
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    email: email.value,
    "bot-field": bot.value,
    subscribe: subscribe.value ? "yes" : "no",
  }).toString();

  const res = await fetch("/.netlify/functions/da-notify-lead", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    console.error(await res.text());
    return;
  }

  window.location.href = "/realestate/da/thank-you";
}

useHead({
  title: "Download TIES Team’s Buyer's Guide",
  meta: [{ name: "description", content: "Get your free buyer's guide from the TIES Team." }],
});
</script>
