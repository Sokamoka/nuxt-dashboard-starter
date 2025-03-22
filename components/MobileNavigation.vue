<script lang="ts" setup>
const open = ref(true);
</script>

<template>
  <USlideover v-model:open="open" side="left" title="Mobile Navigation" description="Sidebar for mobile navigation" >
    <template #content>
      <SidebarNavigation />
    </template>
  </USlideover>
</template>
