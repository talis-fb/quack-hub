<script setup lang="ts">
// Images
import WalpaperDefaultUser from '@/assets/wallpaper-default-user.svg'

// App components
import ExperienceForm from '@/components/ExperienceForm.vue'

// Shadcn-vue components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

// Icons
import { Ellipsis, Plus, Pencil } from 'lucide-vue-next'
</script>
<template>
  <main class="flex flex-1 flex-col md:flex-row p-3 gap-5">
    <section class="flex-1 flex flex-col gap-5 relative rounded-md">
      <section class="bg-secondary rounded-md">
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

        <div class="min-h-36 mt-32 pl-6">
          <p>Cidade, estado, pais + Informações de contato</p>
          <p class="mt-6"><span>Seguidores</span> | <span>Seguindo</span></p>
        </div>
      </section>

      <section class="flex flex-col gap-3 p-5 bg-secondary rounded-md">
        <div class="flex items-center">
          <h2 class="text-2xl mr-auto">Experiências acadêmicas</h2>

          <Dialog>
            <DialogTrigger>
              <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
                <Plus class="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar experiência acadêmica</DialogTitle>
                <DialogDescription>
                  Adicione suas experiências acadêmicas para que outros usuários possam ver seu
                  perfil acadêmico.
                </DialogDescription>
              </DialogHeader>

              <ExperienceForm
                title-label="Instituição de ensino"
                title-placeholder="Ex.: UFRN"
                type="ACADEMIC"
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="icon" class="bg-transparent hover:bg-black/40">
            <Pencil class="w-5 h-5" />
          </Button>
        </div>
        <p>Informações do usuario</p>
      </section>

      <section class="flex flex-col gap-3 p-5 bg-secondary rounded-md">
        <div>
          <h2 class="text-2xl">Sobre</h2>
          <p>Informações do usuario</p>
        </div>

        <div>
          <h2 class="text-2xl">Atividades</h2>
          <p>Projetos em que participou</p>
        </div>

        <div>
          <h2 class="text-2xl">Formação acadêmica</h2>
          <p>Informações do usuario</p>
        </div>
      </section>
    </section>

    <aside class="flex flex-col gap-6 p-3 bg-secondary rounded-md">
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
