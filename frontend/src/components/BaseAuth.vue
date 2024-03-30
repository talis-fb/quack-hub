<script setup lang="ts"></script>

<template>
  <div class="flex flex-1 flex-col md:flex-row">
    <aside class="flex-1 bg-muted flex justify-center items-center">
      <img class="max-h-48 md:max-h-full" src="@/assets/logo.png" alt="quackhub-logo" />
    </aside>
    <main class="relative flex flex-col justify-center items-center flex-1 p-5">
      <slot name="main"></slot>
    </main>
  </div>
</template>
