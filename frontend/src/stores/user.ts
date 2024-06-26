import type { IInputUserData, IUserEntity } from '@/entites/IUser'
import { userService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// TODO: Ver se move para o authStore

export const useUserStore = defineStore('user', () => {
  const user = ref<IUserEntity | null>(null)

  function setUser(data: IUserEntity) {
    user.value = data
  }

  async function getProfile(id: number) {
    const res = await userService.getUserById(id)

    user.value = res
  }

  async function update(id: number, data: IInputUserData) {
    if (!user.value) return

    const res = await userService.updateUser(user.value.id, data)

    user.value = res
  }

  async function follow() {
    if (!user.value) return

    await userService.follow(user.value.id)

    await getProfile(user.value.id)
  }

  async function unFollow() {
    if (!user.value) return

    await userService.unFollow(user.value.id)

    await getProfile(user.value.id)
  }

  return { user, setUser, update, follow, unFollow }
})
