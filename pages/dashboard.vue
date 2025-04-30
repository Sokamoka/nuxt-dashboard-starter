<script setup>
// const { data: usersC1 } = useNuxtData('users-1')
// console.log(usersC1.value)
const { data: users1, error } = await useAsyncData('users-1', () => $fetch('/api/users'))

</script>
<template>
  <div>
    Dashboard

    <pre>{{ error }}</pre>
    <pre>{{ users1 }}</pre>
  </div>
</template>
