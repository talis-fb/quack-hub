<script setup lang="ts">
// Store pinia
import { useAuthStore } from '../stores/auth'

// Views
import NonAuthUserProfileView from '@/views/NonAuthUserProfileView.vue'
import AuthUserProfileView from '@/views/AuthUserProfileView.vue'

/**
 * Recebendo o userId pelo param da rota.
 */
const props = defineProps<{
  id: string
}>()

const { user } = useAuthStore()

function getComponent() {
  if (user.id == +props.id) {
    return AuthUserProfileView
  }

  return NonAuthUserProfileView
}
</script>

<template>
  <component :is="getComponent()" :id="props.id"> </component>
</template>

<style></style>
