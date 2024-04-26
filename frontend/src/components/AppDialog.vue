<script setup lang="ts">
// Shadcn-vue components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogScrollContent
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot name="trigger"></slot>
    </DialogTrigger>
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>
          <slot name="title"></slot>
        </DialogTitle>
        <DialogDescription>
          <slot name="description"></slot>
        </DialogDescription>
      </DialogHeader>
      <slot name="main"></slot>
      <!-- <DialogFooter> </DialogFooter> -->
    </DialogScrollContent>
  </Dialog>
</template>

<style scoped></style>
