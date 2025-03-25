<script lang="ts" setup>
interface Props {
  title: string;
  subtitle?: string;
  hasSeparator?: boolean;
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  hasSeparator: true,
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold tracking-tight" v-text="title" />
    <p v-if="subtitle" class="text-slate-500" v-text="subtitle" />
  </div>

  <USeparator v-if="hasSeparator" class="my-4" />
</template>
