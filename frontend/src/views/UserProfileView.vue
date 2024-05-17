<script setup lang="ts">
// Vue imports
import { Suspense, computed, onBeforeMount, provide, watchEffect } from 'vue'

// Images
import DefaultUserIcon from '@/assets/DefaultUserIcon.jpg'

// App components
import ExperienceForm from '@/components/ExperienceForm.vue'
import AppDialog from '@/components/AppDialog.vue'
import ExperiencesList from '@/components/ExperiencesList.vue'
import ExperienceListFallback from '@/components/ExperienceListFallback.vue'
import ProjectsList from '@/components/ProjectsList.vue'
import ProjectsListFallback from '@/components/ProjectsListFallback.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import ProfileEdit from './ProfileEdit.vue'

// Shadcn-vue components
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

// Icons
import { Plus, Pencil } from 'lucide-vue-next'

// Types
import type { IUserEntity } from '@/entites/IUser'

// Pinia store
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useProjectsStore } from '@/stores/projects'
import { useUserStore } from '@/stores/user'
import { useExperienceStore } from '@/stores/experience'

// Configs
import { metadataRoutes } from '@/router/RoutesConfig'

// Services
import { userService } from '@/services'
import type { IInputProjectData } from '@/entites/IProject'
import type { IExperienceData } from '@/entites/IExperience'

const props = defineProps<{
  user: IUserEntity
}>()

const projectsSore = useProjectsStore()
const experienceStore = useExperienceStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const hasPermission = computed(() => {
  return user.value?.id == authStore.user.id
})

provide('hasPermissions', hasPermission)

const { user } = storeToRefs(userStore)

onBeforeMount(() => {
  userStore.setUser(props.user)
})

watchEffect(() => {
  if (props.user) {
    userStore.setUser(props.user)
  }
})

const { toast } = useToast()

const handleSubmitExperience = async (values: IExperienceData) => {
  try {
    await experienceStore.createExperience({
      ...values
    })

    toast({
      title: `Experiência ${values.type == 'ACADEMIC' ? 'acadêmica' : 'profissional'}`,
      description: 'Experiência cadastrada com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao criar a experiência',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

const handleSubmitProject = async (values: IInputProjectData) => {
  try {
    await projectsSore.createProject(values)

    toast({
      title: ``,
      description: 'Projeto cadastrado com sucesso!',
      variant: 'default',
      duration: 1000
    })
  } catch (error: any) {
    toast({
      title: 'Erro ao criar projeto',
      description: error?.message || 'Erro desconhecido, por favor contatar os desenvolvedores.',
      variant: 'destructive'
    })
  }
}

const follow = async () => {
  userStore.follow()
}

const unFollow = async () => {
  userStore.unFollow()
}

const userPhoto = computed(() => {
  if (user.value?.avatarUrl) {
    return user.value.avatarUrl
  }

  return DefaultUserIcon
})

const isFollowingTheUser = computed(() => {
  const output = user.value?.followedBy.find((follow) => follow.id == authStore.user.id)

  return !!output
})
</script>

<script lang="ts">
export default {
  beforeRouteEnter: async (to, from) => {
    try {
      const res = await userService.getUserById(+to.params.id)

      to.params = { ...to.params, user: res as any }
    } catch (error) {
      return {
        name: metadataRoutes.NOT_FOUND.name
      }
    }
  },
  beforeRouteUpdate: async (to, from) => {
    try {
      const res = await userService.getUserById(+to.params.id)

      to.params = { ...to.params, user: res as any }
    } catch (error) {
      return {
        name: metadataRoutes.NOT_FOUND.name
      }
    }
  }
}
</script>

<template>
  <main class="flex flex-1 flex-col md:flex-row p-3 gap-5">
    <section class="flex-1 flex flex-col gap-5 relative rounded-md">
      <section class="border rounded-md">
        <div class="bg-default-walpaper h-[200px]"></div>

        <div class="p-5">
          <div class="flex">
            <img
              class="mt-[-60px] w-32 rounded-full border-4 border-black"
              :src="userPhoto"
              alt="user-icon"
            />

            <div v-if="hasPermission" class="flex-1 flex justify-end">
              <Sheet>
                <SheetTrigger as-child>
                  <Button variant="outline" size="icon">
                    <Pencil class="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent class="overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Editar perfil</SheetTitle>
                    <SheetDescription>
                      Faça alterações em seu perfil aqui. Clique em salvar mudanças quando terminar.
                    </SheetDescription>
                  </SheetHeader>

                  <ProfileEdit :user="user as IUserEntity" />
                  <!-- <SheetFooter>
                    <SheetClose as-child>
                      <Button type="submit"> Save changes </Button>
                    </SheetClose>
                  </SheetFooter> -->
                </SheetContent>
              </Sheet>
            </div>
            <div v-else class="flex-1 flex justify-end">
              <Button v-if="!isFollowingTheUser" @click="follow"> Seguir </Button>
              <Button v-else @click="unFollow">Deixar de seguir</Button>
            </div>
          </div>

          <div class="mt-2">
            <p class="text-lg">{{ (user as IUserEntity).name }}</p>
            <p>Informações de contato</p>
            <p class="mt-6">
              <span class="text-xl font-bold">{{ (user as IUserEntity).followedBy.length }}</span>
              Seguidores |
              <span class="text-xl font-bold">{{ (user as IUserEntity).following.length }}</span>
              Seguindo
            </p>
          </div>
        </div>
      </section>

      <section class="flex flex-col border rounded-md">
        <header class="px-3 py-5 flex items-center">
          <h2 class="text-2xl mr-auto">Projetos cadastrados</h2>

          <AppDialog v-if="hasPermission">
            <template #trigger>
              <Button variant="outline" size="icon">
                <Plus class="w-5 h-5" />
              </Button>
            </template>
            <template #title> Adicionar projeto </template>
            <template #description>
              Adicione seus projetos para serem vistos por outros usuários e vincule-os às
              experiências acadêmicas ou profissionais.
            </template>
            <template #main>
              <div class="h-[600px]">
                <ProjectForm :handle-submit="handleSubmitProject" />
              </div>
            </template>
          </AppDialog>
        </header>

        <Separator />

        <Suspense>
          <ProjectsList :user-id="props.user.id" />
          <template #fallback>
            <ProjectsListFallback :length="5" />
          </template>
        </Suspense>
      </section>

      <section class="flex flex-col border rounded-md">
        <header class="px-3 py-5 flex items-center">
          <h2 class="text-2xl mr-auto">Experiências acadêmicas</h2>

          <AppDialog v-if="hasPermission">
            <template #trigger>
              <Button variant="outline" size="icon">
                <Plus class="w-5 h-5" />
              </Button>
            </template>
            <template #title> Adicionar experiência acadêmica </template>
            <template #description>
              Adicione suas experiências acadêmicas para que outros usuários possam ver seu perfil
              acadêmico.
            </template>
            <template #main>
              <ExperienceForm
                :handle-submit="handleSubmitExperience"
                title-label="Instituição de ensino"
                title-placeholder="Ex.: UFRN"
                type="ACADEMIC"
              />
            </template>
          </AppDialog>
        </header>

        <Separator />

        <Suspense>
          <ExperiencesList :user-id="props.user.id" type="ACADEMIC" />
          <template #fallback>
            <ExperienceListFallback :length="3" />
          </template>
        </Suspense>
      </section>

      <section class="flex flex-col border rounded-md">
        <header class="px-4 py-3 flex items-center">
          <h2 class="text-2xl mr-auto">Experiências profissionais</h2>

          <AppDialog v-if="hasPermission">
            <template #trigger>
              <Button variant="outline" size="icon">
                <Plus class="w-5 h-5" />
              </Button>
            </template>
            <template #title> Adicionar experiência profissional </template>
            <template #description>
              Adicione suas experiências profissionais para que outros usuários possam ver seu
              perfil profissional.
            </template>
            <template #main>
              <ExperienceForm
                :handle-submit="handleSubmitExperience"
                title-label="Título"
                title-placeholder="Ex.: Desenvolvedor Backend"
                type="PROFESSIONAL"
              />
            </template>
          </AppDialog>
        </header>
        <Suspense>
          <ExperiencesList :user-id="props.user.id" type="PROFESSIONAL" />

          <template #fallback>
            <ExperienceListFallback :length="3" />
          </template>
        </Suspense>
      </section>

      <section class="flex flex-col border rounded-md">
        <div class="px-4 py-3 flex items-center">
          <h2 class="text-2xl">Sobre</h2>
        </div>

        <Separator />

        <div class="px-4 py-3">
          <p>{{ (user as IUserEntity).aboutDescription }}</p>
        </div>
      </section>
    </section>

    <aside class="flex flex-col gap-6 p-3 border rounded-md">
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
