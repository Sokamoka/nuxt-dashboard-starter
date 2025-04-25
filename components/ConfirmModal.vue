<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :title="title"
    :description="message"
    :dismissible="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton label="Cancel" color="neutral" variant="outline" @click="emit('close', false)" />
        <UButton color="error" label="Confirm" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
