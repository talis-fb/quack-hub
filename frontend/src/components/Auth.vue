<script setup lang="ts"></script>

<template>
  <div class="flex flex-1">
    <aside class="flex-1 bg-muted"></aside>
    <main class="flex flex-col justify-center items-center flex-1 p-5">
      <slot name="main"></slot>
    </main>
  </div>
</template>
