<template>
  <div class="min-h-svh flex">
    <SidebarNavigation />
    <main class="flex flex-1 flex-col">
      <MainNavigation />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
