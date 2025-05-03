<script setup lang="ts">
const config = useRuntimeConfig();
const open = ref(false);
const interval = ref(config.public.sessionMaxAge * 1000);

const { session, clear } = useUserSession();

const { start } = useTimeoutFn(
  () => {
    open.value = true;
  },
  interval,
  { immediate: false }
);

watch(session, (session) => {
  console.log("SESSION-UPDATED", session);
  start();
});

function onClose() {
  open.value = false;
  clear();
  navigateTo("/login");
}
</script>

<template>
  <UModal
    v-model:open="open"
    :close="{ class: 'hidden' }"
    title="Session is Expired"
    :dismissible="false"
    :ui="{ footer: 'justify-end', content: 'max-w-sm' }"
  >
    <template #body> Restart </template>
    <template #footer>
      <UButton color="primary" size="xl" label="Restart" @click="onClose" />
    </template>
  </UModal>
</template>
