<script setup script="ts">
import { Ellipsis } from 'lucide-vue-next'
</script>
<template>
  <div class="flex relative">
    <div class="ml-16 w-8/12 relative rounded-md">
      <div
        class="m-3 bg-[url('../assets//wallpaper-default-user.jpg')] h-48 bg-cover rounded-lg"
      ></div>

      <div class="ml-6 mt-3 absolute top-28 flex flex-col items-center justify-center">
        <img class="max-h-36 rounded-full" src="@/assets/user-icon.jpg" alt="user-icon" />
        <h1 class="text-lg">User Name</h1>
      </div>

      <div class="absolute right-5">
        <Ellipsis />
      </div>

      <div class="min-h-36 mt-32 pl-6 border-b-2 border-slate-400">
        <p>Cidade, estado, pais + Informações de contato</p>
        <p class="mt-6"><span>Seguidores</span> | <span>Seguindo</span></p>
      </div>

      <div class="m-5">
        <h2 class="text-2xl">Sobre</h2>
        Informações do usuario
      </div>

      <div class="m-5">
        <h2 class="text-2xl">Atividades</h2>
        Projetos em que participou
      </div>

      <div class="m-5">
        <h2 class="text-2xl">Formação acadêmica</h2>
        formações do usuario
      </div>
    </div>
    <div class="flex flex-col gap-6 mt-8">
      <div>
        <h2 class="text-2xl">As pessoas também visualizam</h2>
        Coisas que as pessoas vizualizam aqui
      </div>
      <div>
        <h2 class="text-2xl">Projetos em destaque</h2>
        A listagem dos projetos em destaque aqui
      </div>
    </div>
  </div>
</template>

<style></style>
