<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
  pageRoles: [Roles.Admin, Roles.Editor],
});

const { user } = useUserSession();
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold tracking-tight">Welcome {{ user?.name }}</h1>
  </div>
</template>
