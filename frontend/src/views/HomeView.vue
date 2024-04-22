<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue'
import { Image } from 'lucide-vue-next'
import { Presentation } from 'lucide-vue-next'
import { NotebookPen } from 'lucide-vue-next'
import { ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <div class="flex-1 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-6 gap-6">
    <aside class="bg-secondary p-6 flex flex-col items-center gap-4 rounded-md">
      <div class="flex flex-col items-center border-b-2 border-slate-300 text-lg pb-6">
        <img class="h-14 rounded-full" src="@/assets/user-icon.jpg" />
        <p>User name</p>
      </div>
      <p>Lista de amigos</p>
    </aside>

    <main class="bg-secondary flex flex-col lg:col-span-3 rounded-md">
      <section class="flex justify-between gap-2text-lg">
        <!-- <figure class="flex gap-1 items-center">
          <Image />
          <figcaption>Mídia</figcaption>
        </figure> -->

        <div
          class="transition delay-50 p-5 cursor-pointer hover:bg-black/40 flex-1 flex gap-1 items-center justify-center"
        >
          <NotebookPen />
          <span>Postagens</span>
        </div>

        <div
          class="transition delay-50 p-5 cursor-pointer hover:bg-black/40 flex-1 flex gap-1 items-center justify-center"
        >
          <Presentation />
          <span>Projetos</span>
        </div>
      </section>

      <Separator class="h-[1px] bg-white" />

      <section class="flex-1 flex gap-6 p-8 text-lg rounded-lg">Posts aqui</section>
    </main>

    <aside class="bg-secondary flex flex-col md:col-start-2 lg:col-start-5">
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
