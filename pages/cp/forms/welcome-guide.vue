<template>
  <div class="p-6 max-w-xl mx-auto mt-20 shadow-md rounded-lg bg-white">
    <h1 class="text-2xl font-bold mb-6">Get Your Free Welcome Guide</h1>

    <form name="cp-welcome-guide" method="POST" data-netlify="true" action="/cp/forms/welcome-guide-download">
      <input type="hidden" name="form-name" value="cp-welcome-guide" />

      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium">Name</label>
        <InputText name="name" class="w-full" required />
      </div>

      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium">Email</label>
        <InputText name="email" type="email" class="w-full" required />
      </div>

      <Button label="Get the Guide" type="submit" class="w-full" />
    </form>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
