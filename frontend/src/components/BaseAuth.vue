<script setup lang="ts"></script>

<template>
  <div class="flex flex-1 flex-col md:flex-row">
    <aside class="
      flex-1 bg-muted md:flex hidden justify-center items-center
      bg-[url('...')] md:bg-[url('@/assets/authQuack.png')] bg-center
      ">
    </aside>
    <img class="md:hidden block h-[22rem]" src="@/assets/authQuack.png" alt="quackhub-logo" />
    <main class="relative flex flex-col justify-center items-center flex-1 p-5">
      <slot name="main"></slot>
    </main>
  </div>
</template>
