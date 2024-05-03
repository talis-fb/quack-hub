<template>
  <div class="flex-1 flex flex-col justify-center items-center">
    <h1 class="font-bold text-3xl">Página não encontrada</h1>
    <p class="text-muted-foreground">Desculpe, a página que você procura não existe.</p>
    <p class="text-muted-foreground">
      Se você acha que é um engano, por favor contatar os desenvolvedores.
    </p>
    <img :src="NotFound" class="max-w-[500px] h-auto" />
    <Button variant="outline" @click="() => navigateToFeed()">
    
        <span class="font-bold text-lg">Voltar para seu feed </span>
    </Button>
  </div>
</template>

<script setup lang="ts">
// Images
import NotFound from '@/assets/404.png'

// Shadcn-vue components
import { Button } from '@/components/ui/button'
import { metadataRoutes } from '@/router/RoutesConfig'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToFeed = () => {
  router.push({ path: metadataRoutes.HOME.path })
}
</script>

<style scoped></style>
