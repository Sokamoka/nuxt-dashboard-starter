<script lang="ts" setup>
import type { DBTasks } from '~/shared/lib/tasks';

// await new Promise((resolve) => setTimeout(resolve, 2000))
const { data: tasks } = await useValidateFetch<DBTasks[]>('/api/tasks')
</script>

<template>
  <div>
    <MainTitle title="Tasks" />

    <div class="mb-4">
      <UButton>Button</UButton>
    </div>
    <UCard :ui="{ body: 'p-0 sm:p-0'}">
      <UTable :data="tasks" class="flex-1" />
    </UCard>
  </div>
</template>
