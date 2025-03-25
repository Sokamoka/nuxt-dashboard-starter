<script lang="ts" setup>
import type { DBTasks } from '~/shared/lib/tasks';

const { data: tasks } = await useValidateFetch<DBTasks[]>('/api/tasks')
// const data = ref([{ id: 0, name: 'a'},{ id: 1, name: 'b'}])
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
