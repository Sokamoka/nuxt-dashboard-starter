<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
  pageRoles: [Roles.Admin, Roles.Editor],
});

const { user } = useUserSession();
</script>

<template>
  <div>
    <MainTitle :title="`Welcome ${user?.name}`" />
  </div>
</template>
