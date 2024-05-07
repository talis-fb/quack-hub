<script setup lang="ts">
// Types
import type { IPostData, IPostEntityWithUser } from '@/entites/IPost'

// Services
import { postService } from '@/services'

// App components
import AppDialog from '@/components/AppDialog.vue'
import PostItem from '@/components/PostItem.vue'
import PostForm from '@/components/PostForm.vue'

// Shadcn-vue components
import { Alert, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'

// Vue imports
import { ref } from 'vue'

const posts = ref<IPostEntityWithUser[]>([])

const { toast } = useToast()

const createPost = async (data: IPostData) => {
  try {
    const res = await postService.create(data)

    posts.value.push(res)

    toast({
      title: 'Postagem',
      description: 'Postagem criada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao criar postagem',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

const fetchPosts = async () => {
  const res = await postService.search()

  // await new Promise((resolve) => setTimeout(resolve, 1500))
  posts.value = res
}

await fetchPosts()
</script>

<template>
  <div>
    <div class="p-3">
      <AppDialog>
        <template #trigger>
          <Button> Criar postagem </Button>
        </template>
        <template #title> Criar postagem </template>
        <template #description>
          Crie postagens e interaja com outros usuários do Quackhub!</template
        >
        <template #main>
          <PostForm @create="createPost" />
        </template>
      </AppDialog>
    </div>

    <div v-if="posts.length" v-for="post in posts">
      <PostItem :post="post" />
    </div>
    <div v-else class="p-3">
      <Alert>
        <AlertTitle>Nenhum postagem encontrada. Seja o primeiro a criar uma postagem!</AlertTitle>
      </Alert>
    </div>
  </div>
</template>
<style scoped></style>
