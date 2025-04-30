<script setup>

const { data: users1, error } = await useAsyncData("users", () =>
  useRequestFetch()("/api/users")
);
</script>
<template>
  <div>
    Dashboard

    <pre>{{ error }}</pre>
    <pre>{{ users1 }}</pre>
  </div>
</template>
