<script lang="ts" setup>
import type { DBTasks } from "~/shared/lib/tasks";

const ITEM_PER_PAGE = 10;

interface TaskResponse {
  total: number;
  rows: DBTasks[];
}

const page = ref(1);

const query = computed(() => ({ skip: (page.value - 1) * ITEM_PER_PAGE, limit: ITEM_PER_PAGE }));

const {
  status,
  data: tasks,
  error,
} = await useValidateFetch<TaskResponse>("/api/tasks", {
  query,
});
</script>

<template>
  <div>
    <MainTitle title="Tasks" />
    {{ status }}
    {{ error }}
    <div class="mb-4">
      <UButton>Button</UButton>
    </div>
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <UTable :data="tasks?.rows" class="flex-1" />
    </UCard>
    <UPagination v-model:page="page" :total="tasks?.total" class="my-3" />
  </div>
</template>
