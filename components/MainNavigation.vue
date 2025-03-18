
<script setup>

</script>

<template>
  <nav>
    <NuxtLink to="/" >Index</NuxtLink>
    <AuthState v-slot="{ loggedIn, clear }">
      <NuxtLink v-if="loggedIn" to="/dashboard" >Dashboard</NuxtLink>
      <button v-if="loggedIn" @click="clear">Logout</button>
      <NuxtLink v-else to="/login">Login</NuxtLink>
    </AuthState>
  </nav>
</template>
