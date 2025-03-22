<script lang="ts" setup>
const open = defineModel<boolean>()
</script>

<template>
  <USlideover
    v-model:open="open"
    side="left"
    title="Mobile Navigation"
    description="Sidebar for mobile navigation"
  >
    <template #content>
      <SidebarNavigation class="h-full" />
    </template>
  </USlideover>
</template>
