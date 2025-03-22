<script lang="ts" setup>
const isSidebarVisible = useSidebarVisibility();
const isMobileSidebarVisible = useMobileSidebarVisibility();
</script>

<template>
  <div class="min-h-svh flex">
    <SidebarNavigation v-if="isSidebarVisible" class="hidden md:block" />
    <MobileNavigation v-if="isMobileSidebarVisible" />
    <main class="flex flex-1 flex-col">
      <MainNavigation />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
