<script setup lang="ts">
import WalpaperDefaultUser from '@/assets/wallpaper-default-user.svg'

import { Ellipsis } from 'lucide-vue-next'
</script>
<template>
  <main class="flex flex-1 flex-col md:flex-row p-3 gap-5">
    <section class="flex-1 relative rounded-md">
      <section>
        <figure>
          <img class="w-full h-[200px] object-cover" :src="WalpaperDefaultUser" alt="" />
        </figure>

        <figure class="ml-6 mt-3 absolute top-28 flex flex-col items-center justify-center">
          <img class="max-h-36 rounded-full" src="@/assets/user-icon.jpg" alt="user-icon" />
          <figcaption class="text-lg">User Name</figcaption>
        </figure>

        <button class="absolute right-5">
          <Ellipsis />
        </button>

        <div class="min-h-36 mt-32 pl-6 border-b-2 border-slate-400">
          <p>Cidade, estado, pais + Informações de contato</p>
          <p class="mt-6"><span>Seguidores</span> | <span>Seguindo</span></p>
        </div>
      </section>

      <section>
        <div class="m-5">
          <h2 class="text-2xl">Sobre</h2>
          <p>Informações do usuario</p>
        </div>

        <div class="m-5">
          <h2 class="text-2xl">Atividades</h2>
          <p>Projetos em que participou</p>
        </div>

        <div class="m-5">
          <h2 class="text-2xl">Formação acadêmica</h2>
          <p>Informações do usuario</p>
        </div>
      </section>
    </section>

    <aside class="flex flex-col gap-6">
      <section>
        <h2 class="text-2xl">As pessoas também visualizam</h2>
        <p>Coisas que as pessoas vizualizam aqui</p>
      </section>
      <section>
        <h2 class="text-2xl">Projetos em destaque</h2>
        <p>A listagem dos projetos em destaque aqui</p>
      </section>
    </aside>
  </main>
</template>

<style></style>
