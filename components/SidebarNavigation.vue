<script setup>
import { sidebarMenu } from '~/constants/menu';
import { listUsers } from '~/shared/abilities';

const items = sidebarMenu(await allows(listUsers, [Roles.Admin]))
</script>

<template>
  <aside class="bg-slate-100">
    <h2 class="py-4 px-2 font-bold">Dashboard Starter <sup><UBadge color="primary" variant="outline" size="xs">V1.0</UBadge></sup></h2>
    <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-full" />
    <SessionAge />
  </aside>
</template>
