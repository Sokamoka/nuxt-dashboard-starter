<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
  pageRoles: ['ADMIN', 'EDITOR']
})
  
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}

const { data: users } = await useAsyncData('users', () => useRequestFetch()('/api/users'))
</script>

<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <button @click="logout">Logout</button>

    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
