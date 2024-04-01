<script setup lang="ts">
import { Image } from 'lucide-vue-next'
import { Presentation } from 'lucide-vue-next'
import { NotebookPen } from 'lucide-vue-next'
import { ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <div class="p-2 flex md:flex-row md:justify-center flex-col mt-6 gap-6">
    <aside class="p-12 flex flex-col items-center gap-4 border-2 border-slate-300 rounded-md">
      <div class="flex flex-col items-center border-b-2 border-slate-300 text-lg pb-6">
        <img class="h-14 rounded-full" src="@/assets/user-icon.jpg" />
        <p>User name</p>
      </div>
      <p>Lista de amigos</p>
    </aside>

    <main>
      <section class="flex gap-6 p-8 text-lg border-2 border-slate-300 rounded-lg">
        <figure class="flex gap-1 items-center">
          <Image />
          <figcaption>Mídia</figcaption>
        </figure>

        <figure class="flex gap-1 items-center">
          <Presentation />
          <figcaption>Projetos</figcaption>
        </figure>

        <figure class="flex gap-1 items-center">
          <NotebookPen />
          <figcaption>Criar postagem</figcaption>
        </figure>
      </section>

      <section class="mt-8 flex gap-6 p-8 text-lg border-2 border-slate-300 rounded-lg">
        Posts aqui
      </section>
    </main>

    <aside class="flex flex-col md:mr-24">
      <section class="text-lg p-12 border-2 border-slate-300 rounded-md">
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
