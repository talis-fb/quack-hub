import type { ICommentData, ICommentEntityWithUserAndPostId } from '@/entites/IComment'
import type { IPostData, IPostEntityWithUser } from '@/entites/IPost'
import { postService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const post = ref<IPostEntityWithUser | null>(null)
  const comments = ref<ICommentEntityWithUserAndPostId[]>([])

  function setPost(data: IPostEntityWithUser) {
    post.value = data
  }

  async function fetchComments(postId: number) {
    const res = await postService.getCommentsByPostId(postId)

    // await new Promise((resolve) => setTimeout(resolve, 1500))

    comments.value = res
  }

  async function updatePost(postId: number, data: IPostData) {
    const res = await postService.update(postId, data)

    console.log({ res })
    post.value = res
  }

  async function createComment(data: ICommentData) {
    const res = await postService.createComment(data)

    comments.value.push(res)
  }

  async function deleteComment(commentId: number) {
    const res = await postService.deleteComment(commentId)

    comments.value = comments.value.filter((comment) => comment.id !== res.id)
  }

  async function updateComment(commentId: number, data: Partial<ICommentData>) {
    const res = await postService.updateComment(commentId, data)

    comments.value = comments.value.map((comment) => {
      if (comment.id === res.id) {
        return res
      }

      return comment
    })
  }

  return {
    post,
    comments,
    setPost,
    updatePost,
    fetchComments,
    createComment,
    deleteComment,
    updateComment
  }
})
