<script setup lang="ts">
// Shadcn-vue components
import Separator from '@/components/ui/separator/Separator.vue'
// Icons

import { Presentation, NotebookPen, ChevronDown } from 'lucide-vue-next'



</script>

<template>
  <div class="flex-1 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-6 gap-6">
    <aside class="border p-6 flex flex-col items-center gap-4 rounded-md">
      <div class="flex flex-col items-center border-b-2 border-slate-300 text-lg pb-6">
        <img class="h-14 rounded-full" src="@/assets/user-icon.jpg" />
        <p>User name</p>
      </div>
      <p>Lista de amigos</p>
      <!-- <ProjectsList /> -->
    </aside>

    <main class="border flex flex-col lg:col-span-3 rounded-md">
      <section class="flex justify-between gap-2 text-lg">
        <RouterLink
          v-slot="{ isExactActive }"
          :to="{ name: 'posts' }"
          class="border transition delay-50 p-5 cursor-pointer hover:bg-black/40 flex-1 flex gap-1 items-center justify-center"
        >
          <div
            class="pb-3 flex space-x-1 border-b-2"
            :class="isExactActive ? 'border-primary' : 'border-transparent'"
          >
            <NotebookPen />
            <span>Postagens</span>
          </div>
        </RouterLink>

        <RouterLink
          v-slot="{ isExactActive }"
          :to="{ name: 'projects' }"
          class="border transition delay-50 p-5 cursor-pointer hover:bg-black/40 flex-1 flex gap-1 items-center justify-center"
        >
          <div
            class="pb-3 flex space-x-1 border-b-2"
            :class="isExactActive ? 'border-primary' : 'border-transparent'"
          >
            <Presentation />
            <span>Projetos</span>
          </div>
        </RouterLink>
      </section>

      <Separator class="h-[1px] bg-white" />

      <section class="flex-1 flex gap-6 text-lg rounded-lg">
        <RouterView />
      </section>
    </main>

    <aside class="border flex flex-col md:col-start-2 lg:col-start-5">
      <section class="text-lg p-12 rounded-md">
        <h1 class="text-xl mb-2">QuackHub Notícias</h1>
        <ul>
          <li>Noticia 01</li>
          <li>Noticia 02</li>
          <li>Noticia 03</li>
        </ul>
        <div class="flex items-center">
          <input type="checkbox" id="expandir-mais-home-aside" class="hidden" />
          <label for="expandir-mais-home-aside" class="cursor-pointer flex items-center">
            Expandir mais <ChevronDown class="transition-transform h-6 w-6 transform rotate-0" />
          </label>
        </div>
      </section>
    </aside>
  </div>
</template>
<style>
#expandir-mais-home-aside:checked + label .transition-transform {
  @apply transform rotate-180;
}
</style>
