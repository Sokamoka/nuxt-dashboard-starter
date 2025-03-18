
<script setup>

</script>

<template>
  <nav class="flex gap-5 bg-slate-200 p-5">
    <NuxtLink to="/" >Index</NuxtLink>
    <AuthState v-slot="{ loggedIn, clear }">
      <NuxtLink v-if="loggedIn" to="/dashboard" >Dashboard</NuxtLink>
      <button v-if="loggedIn" @click="clear">Logout</button>
      <NuxtLink v-else to="/login">Login</NuxtLink>
    </AuthState>
  </nav>
</template>
