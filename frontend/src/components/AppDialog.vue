<script setup lang="ts">
// Shadcn-vue components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot name="trigger"></slot>
    </DialogTrigger>
    <DialogContent>
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
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
