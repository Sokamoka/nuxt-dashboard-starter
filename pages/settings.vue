<script lang="ts" setup>
const route = useRoute();

const items = ref([
  {
    label: "Profile",
    to: "/settings/profile",
  },
  {
    label: "Password",
    to: "/settings/password",
  },
]);

const title = computed(() =>
  items.value.find((item) => item.to === route.path)
);
</script>

<template>
  <div class="h-full">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">{{ title?.label }}</h2>
    </div>

    <USeparator class="my-4" />

    <div class="flex space-x-12">
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-48"
      />
      <NuxtPage :page-key="(route) => route.fullPath" />
    </div>
  </div>
</template>
