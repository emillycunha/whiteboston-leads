<template>
  <div class="nuxt-app bg-surface-0 dark:bg-surface-900">
    <!-- Wrap transition contents inside a single div -->
    <transition name="fade" mode="out-in">
      <div>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </transition>
  </div>
</template>

<script setup></script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
