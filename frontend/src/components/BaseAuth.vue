<script setup lang="ts"></script>

<template>
  <div class="flex flex-1 flex-col md:flex-row">
    <aside class="flex-1 bg-muted flex justify-center items-center bg-[url('...')] md:bg-[url('@/assets/authQuack.png')] bg-center">
      <img class="max-h-full md:invisible visible" src="@/assets/authQuack.png" alt="quackhub-logo" />
    </aside>
    <main class="relative flex flex-col justify-center items-center flex-1 p-5">
      <slot name="main"></slot>
    </main>
  </div>
</template>
