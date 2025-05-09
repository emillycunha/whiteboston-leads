<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 w-full max-w-md rounded-xl shadow-2xl border border-gray-200">
      <h1 class="text-2xl font-bold mb-6 text-center">Get Your Free Welcome Guide</h1>

      <form @submit.prevent="onSubmit" name="cp-welcome-guide">
        <!-- honeypot -->
        <p class="hidden">
          <label>
            Don’t fill this out if you're human:
            <input name="bot-field" type="text" />
          </label>
        </p>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium">Name</label>
          <InputText v-model="name" name="name" class="w-full" required />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium">Email</label>
          <InputText v-model="email" name="email" type="email" class="w-full" required />
        </div>
        <div class="mb-6 flex items-center">
          <Checkbox v-model="subscribe" inputId="subscribe" name="subscribe" binary class="mr-4" />
          <label for="subscribe" class="text-sm">I agree to receive the Cody Posey and Abrahams Real Estate TIES Team newsletter</label>
        </div>

        <Button label="Get the Guide" type="submit"></Button>
      </form>

      <!-- Option 1: In-page second screen -->
      <div v-if="submitted" class="mt-6 text-center">
        <h2 class="text-xl font-bold mb-4">Here’s Your Guide</h2>
        <a href="https://drive.google.com/file/d/12uXFLup8e7YwiCnpB0IvZtOY-bdDbKoU/view" target="_blank" class="inline-block px-4 py-2 bg-green-600 text-white rounded mr-2">Open Guide</a>
        <a href="https://drive.google.com/uc?export=download&id=12uXFLup8e7YwiCnpB0IvZtOY-bdDbKoU" target="_blank" class="inline-block px-4 py-2 bg-blue-600 text-white rounded">Download PDF</a>
      </div>

      <!-- Option 2: Modal popup -->
      <Dialog header="" v-model:visible="showModal" modal @hide="resetForm">
        <p class="mb-8 text-xl text-center">Click below to open or download your Welcome Guide:</p>
        <div class="flex flex-col justify-center gap-6">
          <Button label="Open Guide" icon="pi pi-folder-open" class="w-full" @click="openGuide" />
          <Button label="Download PDF" icon="pi pi-download" class="w-full" @click="downloadGuide" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const name = ref("");
const email = ref("");
const bot = ref("");
const subscribe = ref(true);
const submitted = ref(false);
const showModal = ref(false);

// these URLs can also come back from your function if you generate tokens
const openUrl = "https://drive.google.com/file/d/12uXFLup8e7YwiCnpB0IvZtOY-bdDbKoU/view";
const downloadUrl = "https://drive.google.com/uc?export=download&id=12uXFLup8e7YwiCnpB0IvZtOY-bdDbKoU";

// your form POST→Netlify Function
async function onSubmit() {
  const body = new URLSearchParams({
    name: name.value,
    email: email.value,
    "bot-field": bot.value,
    subscribe: subscribe.value ? "yes" : "no",
  }).toString();

  const res = await fetch("/.netlify/functions/notify-lead", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    console.error(await res.text());
    return;
  }

  // Option A: show inline
  //submitted.value = true;

  // Option B: show popup
  showModal.value = true;
}

function openGuide() {
  window.open(openUrl, "_blank");
}

function downloadGuide() {
  window.open(downloadUrl, "_blank");
}

function resetForm() {
  name.value = "";
  email.value = "";
  bot.value = "";
  subscribe.value = true;
  submitted.value = false;
}
</script>

<style>
.p-dialog-mask {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
</style>
