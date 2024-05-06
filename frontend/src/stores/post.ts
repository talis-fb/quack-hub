import type { ICommentData, ICommentEntity } from '@/entites/IComment'
import type { IPostEntityWithUser } from '@/entites/IPost'
import { postService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const post = ref<IPostEntityWithUser | null>(null)
  const comments = ref<ICommentEntity[]>([])

  function setPost(data: IPostEntityWithUser) {
    post.value = data
  }

  async function fetchComments(postId: number) {
    const res = await postService.getCommentsByPostId(postId)

    // await new Promise((resolve) => setTimeout(resolve, 1500))

    comments.value = res
  }

  async function createComment(data: ICommentData) {
    const res = await postService.createComment(data)

    comments.value.push(res)
  }

  return {
    post,
    comments,
    setPost,
    fetchComments,
    createComment
  }
})
