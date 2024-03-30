<script setup lang="ts">
  import { Image } from 'lucide-vue-next';
  import { Presentation } from 'lucide-vue-next';
  import { NotebookPen } from 'lucide-vue-next';
  import { ChevronDown } from 'lucide-vue-next';
</script>

<template>
  <main class="flex md:flex-row md:justify-between flex-col mt-6 gap-12">
    <aside class="ml-28 p-4 flex flex-col items-center gap-4 border-2 border-slate-300 rounded-md">
      <section class="flex flex-col items-center border-b-2 border-slate-300 text-lg pb-6">
        <img class="h-14 rounded-full" src="@/assets/user-icon.jpg" />
        <p>User name</p>
      </section>
      <p>Lista de amigos</p>
    </aside>

    <section>
      <div class="flex gap-6 p-8 text-lg border-2 border-slate-300 rounded-lg">
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
      </div>
    </section>

    <aside class="flex flex-col mr-28">
      <section class="text-lg p-4 border-2 border-slate-300 rounded-md">
        <h1 class="text-xl mb-2">QuackHub Notícias</h1>
        <ul>
          <li>Noticia 01</li>
          <li>Noticia 02</li>
          <li>Noticia 03</li>
        </ul>
        <div class="flex items-center">Expandir mais <ChevronDown /></div>
      </section>
    </aside>
  </main>
</template>
