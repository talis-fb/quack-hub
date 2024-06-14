<script setup lang="ts">
// Services
import { announcementService } from '@/services'

// Vue imports
import { ref } from 'vue'

// Types
import { AnnoucementStatus, type IAnnouncementEntity } from '@/entites/IAnnouncement'

interface IAnnouncementListProps {
  status: AnnoucementStatus
}

const props = defineProps<IAnnouncementListProps>()

const announcements = ref<IAnnouncementEntity[]>([])

async function fetchAnnouncements() {
  const status = props.status == AnnoucementStatus.PROGRESS ? 'Em andamento' : 'Encerrados'

  const res = await announcementService.getAnnouncements(undefined, status)

  announcements.value = res
}

function redirectTo(url: string) {
  window.open(url, '_blank')
}

await fetchAnnouncements()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-for="announcement in announcements">
      <div
        @click="() => redirectTo(announcement.url)"
        class="group cursor-pointer hover:bg-black/40 p-4 gap-1"
      >
        <div
          class="ms-4 w-fit min-h-6 min-w-[80%] p-1 rounded-t-lg"
          :class="props.status == AnnoucementStatus.PROGRESS ? 'bg-blue-600' : 'bg-red-600'"
        >
          <p class="text-sm font-bold">
            {{ announcement.announcementInfo }}
          </p>
        </div>

        <div
          class="flex flex-col bg-secondary p-3 rounded-md gap-3 shadow-lg group-hover:shadow-primary/70"
        >
          <p
            class="text-lg font-bold"
            :class="props.status == AnnoucementStatus.PROGRESS ? 'text-blue-300' : 'text-red-300'"
          >
            {{ announcement.title }}
          </p>
          <p class="text-sm text-secondary-foreground">
            {{ announcement.date }}
          </p>
          <p
            v-if="announcement.type"
            class="self-start bg-primary text-primary-foreground text-sm p-2 rounded-full"
          >
            {{ announcement.type }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
