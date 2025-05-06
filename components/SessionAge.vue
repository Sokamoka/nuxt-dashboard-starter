<script setup lang="ts">
const time = ref<Date | undefined>(undefined);
const config = useRuntimeConfig();
const interval = ref(config.public.sessionMaxAge);

const { session } = useUserSession();

const formatted = useDateFormat(time, "HH:mm:ss");

const { resume } = useIntervalFn(
  () => {
    console.log('INTERVAL-FN')
    const loggedInAt = session.value?.loggedInAt ?? 0;
    time.value = new Date(Number(loggedInAt) + interval.value - +new Date());
  },
  1000,
  { immediate: false }
);

watch(
  session,
  (session) => {
    console.log("SESSION-UPDATED-AGE", session);
    resume();
  },
  { immediate: true }
);
</script>

<template>
  <div>{{ formatted }}</div>
</template>
