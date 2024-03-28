<script>
 import { Ellipsis } from 'lucide-vue-next';
</script>
<template>
    <div class="bg-slate-500 flex relative">
        <div class="ml-16 w-7/12 relative rounded-md">
            <div class="bg-blue-500 min-h-36 m-3">
                background
            </div>
            
            <div class="absolute top-12 flex flex-col items-center justify-center">
                <img class="max-h-36" src="../assets//user-icon.png" alt="user-icon" />
                <h1 class="text-lg">User Name</h1>
            </div>
            
            <div>
                <Ellipsis />
            </div>
            
            <div class="min-h-36 mt-24 pl-6">
                <p>Cidade, estado, pais + Informações de contato</p>
                <p class="mt-6"><span>Seguidores</span> <span>Seguindo</span></p>      
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
        <div class="flex flex-col gap-6">
            <div>
                <h2 class="text-2xl">As pessoas também visualizam</h2>
            </div>
            <div>
                <h2 class="text-2xl">Projetos em destaque</h2>
            </div>
        </div>
    </div>
</template>