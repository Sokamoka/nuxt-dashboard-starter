<script lang="ts" setup>
import type { BreadcrumbItem } from "@nuxt/ui";

interface Props {
  title: string;
  subtitle?: string;
  hasSeparator?: boolean;
  replacement?: MaybeRef<Map<string, string>>;
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: "",
  hasSeparator: true,
  replacement: () => ref(new Map<string, string>()),
});

const route = useRoute();

const items = computed<BreadcrumbItem[]>(() => {
  const [_, __, ...splitted] = route.fullPath.split("/");
  const rest = splitted.map((routeName) => ({
    label: toValue(props.replacement).has(routeName)
      ? toValue(props.replacement).get(routeName)
      : routeName,
  }));
  return [
    {
      label: "Home",
      icon: "i-lucide-house",
      to: "/",
    },
    ...rest,
  ];
});
</script>

<template>
  <div>
    <UBreadcrumb :items="items" class="mb-4" />
    <h2 class="text-2xl font-bold tracking-tight" v-text="title" />
    <p v-if="subtitle" class="text-slate-500" v-text="subtitle" />
  </div>

  <USeparator v-if="hasSeparator" class="my-4" />
</template>
