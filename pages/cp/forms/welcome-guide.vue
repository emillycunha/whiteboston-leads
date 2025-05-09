<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 w-full max-w-md rounded-xl shadow-2xl border border-gray-200">
      <h1 class="text-2xl font-bold mb-6 text-center">Get Your Free Welcome Guide</h1>

      <form action="/.netlify/functions/form-handler" method="post" name="cp-welcome-guide">
        <!-- Honeypot field (invisible to users) -->
        <p class="hidden">
          <label>
            Don’t fill this out if you're human:
            <input name="bot-field" type="text" />
          </label>
        </p>

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
  </div>
</template>

<script setup></script>

<style></style>
