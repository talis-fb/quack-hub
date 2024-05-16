<script setup lang="ts">
// Services
import { announcementService } from '@/services'

// Vue imports
import { ref } from 'vue'

// Types
import { AnnoucementType, type IAnnouncementEntity } from '@/entites/IAnnouncement'

interface IAnnouncementListProps {
  type: AnnoucementType
}

const props = defineProps<IAnnouncementListProps>()

const announcements = ref<IAnnouncementEntity[]>([])

async function fetchAnnouncements() {
  const res = await announcementService.getAnnouncements()

  announcements.value = res
}

// function redirectToNew(url: string) {
//   // window.location.href = url
//   window.open(url, '_blank')
// }

await fetchAnnouncements()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-for="announcement in announcements">
      <div class="cursor-pointer hover:bg-black/40 p-4 gap-1">
        <div
          class="ms-4 w-fit p-1 rounded-t-lg"
          :class="props.type == AnnoucementType.PROGRESS ? 'bg-blue-600' : 'bg-red-600'"
        >
          <p class="text-sm font-bold">
            {{ announcement.announcementInfo }}
          </p>
        </div>

        <div class="flex flex-col bg-secondary p-3 rounded-md gap-3">
          <p
            class="text-lg font-bold"
            :class="props.type == AnnoucementType.PROGRESS ? 'text-blue-300' : 'text-red-300'"
          >
            {{ announcement.title }}
          </p>
          <p class="text-sm text-secondary-foreground">
            {{ announcement.date }}
          </p>
          <p class="self-start bg-primary text-primary-foreground text-sm p-2 rounded-full">
            {{ announcement.type }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
