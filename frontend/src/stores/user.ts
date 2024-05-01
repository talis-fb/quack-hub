import type { IUserData, IUserEntity } from '@/entites/IUser'
import { userService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// TODO: Ver se move para o authStore

export const useUser = defineStore('user', () => {
  const user = ref<IUserEntity | null>(null)

  async function getProfile(id: number) {
    const res = await userService.getUserById(id)

    user.value = res
  }

  async function update(id: number, data: IUserData) {
    if (!user.value) return

    const res = await userService.updateUser(user.value.id, data)

    user.value = res
  }

  async function follow() {
    if (!user.value) return

    await userService.follow(user.value.id)

    await getProfile(user.value.id);

    
  }

  async function unFollow() {
    if (!user.value) return

    await userService.unFollow(user.value.id)

    await getProfile(user.value.id);
  }

  return { user, getProfile, update, follow, unFollow }
})
