<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
  pageRoles: ["ADMIN", "EDITOR"],
});

const { user, session, clear } = useUserSession();

// async function logout() {
//   await clearSession()
//   await navigateTo('/login')
// }

const { data: users, error } = await useAsyncData("users", () =>
  useRequestFetch()("/api/users")
);

console.log(error.value);
if (error.value?.statusCode === 401) {
  await clear();
  navigateTo("/login");
}
</script>

<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <!-- <button @click="logout">Logout</button> -->

    <ul>
      <li v-for="{ name, id } in users" :key="id">
        {{ name }}
      </li>
    </ul>

    <pre>{{ session }}</pre>
  </div>
</template>
