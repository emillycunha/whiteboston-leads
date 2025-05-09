<template>
  <div class="p-6 max-w-xl mx-auto mt-20 text-center">
    <h1 class="text-2xl font-bold mb-4">Thanks for Submitting!</h1>
    <p class="mb-6">Click below to open or download your guide.</p>

    <div class="flex justify-center gap-4">
      <a href="https://drive.google.com/file/d/12uXFLup8e7YwiCnpB0IvZtOY-bdDbKoU/view" target="_blank" rel="noopener">
        <Button label="Open Guide" icon="pi pi-folder-open" />
      </a>

      <a href="https://drive.google.com/uc?export=download&id=12uXFLup8e7YwiCnpB0IvZtOY-bdDbKoU" target="_blank" rel="noopener">
        <Button label="Download" icon="pi pi-download" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { createError } from "h3";

const route = useRoute();
const token = route.params.slug;

const { data, error } = await useFetch(`/api/validate-token?token=${token}`);

if (error.value) {
  throw createError({ statusCode: 403, statusMessage: "Access denied" });
}
</script>

<style></style>
