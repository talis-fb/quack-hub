<script setup script="ts">
import { Ellipsis } from 'lucide-vue-next'
</script>
<template>
  <main class="flex flex-1 relative">
    <section class="w-8/12 relative rounded-md">
      <figure
        class="m-3 bg-[url('@/assets//wallpaper-default-user.jpg')] h-48 bg-cover rounded-lg"
      ></figure>

      <figure class="ml-6 mt-3 absolute top-28 flex flex-col items-center justify-center">
        <img class="max-h-36 rounded-full" src="@/assets/user-icon.jpg" alt="user-icon" />
        <figcaption class="text-lg">User Name</figcaption>
      </figure>

      <button class="absolute right-5">
        <Ellipsis />
      </button>

      <section class="min-h-36 mt-32 pl-6 border-b-2 border-slate-400">
        <p>Cidade, estado, pais + Informações de contato</p>
        <p class="mt-6"><span>Seguidores</span> | <span>Seguindo</span></p>
      </section>

      <section class="m-5">
        <h2 class="text-2xl">Sobre</h2>
        <p>Informações do usuario</p>
      </section>

      <section class="m-5">
        <h2 class="text-2xl">Atividades</h2>
        <p>Projetos em que participou</p>
      </section>

      <section class="m-5">
        <h2 class="text-2xl">Formação acadêmica</h2>
        <p>Informações do usuario</p>
      </section>
    </section>

    <aside class="flex flex-col gap-6">
      <div>
        <h2 class="text-2xl">As pessoas também visualizam</h2>
        <p>Coisas que as pessoas vizualizam aqui</p>
      </div>
      <div>
        <h2 class="text-2xl">Projetos em destaque</h2>
        <p>A listagem dos projetos em destaque aqui</p>
      </div>
    </aside>
  </main>
</template>

<style></style>
