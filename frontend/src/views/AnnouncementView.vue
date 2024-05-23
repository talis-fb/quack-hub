<script setup lang="ts">
// App components
import AnnouncementsListFallback from '@/components/AnnouncementsListFallback.vue'
import AnnouncementsList from '@/components/AnnouncementsList.vue'

import { AnnoucementStatus } from '@/entites/IAnnouncement'
</script>

<template>
  <div class="flex-1">
    <div class="w-[1200px] max-w-[100%] mx-auto h-screen grid grid-cols-1 md:grid-cols-2 gap-7 p-8">
      <section class="max-w-[100%] flex flex-col gap-2">
        <h2 class="self-start bg-blue-600 p-2 rounded-md text-2xl font-bold tracking-wide">
          Em andamento
        </h2>
        <div class="flex-1 border rounded-md">
          <Suspense>
            <AnnouncementsList :status="AnnoucementStatus.PROGRESS" />
            <template #fallback>
              <AnnouncementsListFallback :length="5" />
            </template>
          </Suspense>
        </div>
      </section>

      <section class="max-w-[100%] flex flex-col gap-2">
        <h2 class="self-start bg-red-600 p-2 rounded-md text-2xl font-bold tracking-wide">
          Encerrados
        </h2>
        <div class="flex-1 border rounded-md">
          <Suspense>
            <AnnouncementsList :status="AnnoucementStatus.FINISHED" />
            <template #fallback>
              <AnnouncementsListFallback :length="5" />
            </template>
          </Suspense>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped></style>
