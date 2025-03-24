<script setup lang="ts">
import { listUsers } from '~/shared/abilities';
import type { DBUser } from '~/shared/lib/users';

definePageMeta({
  middleware: ["authenticated"],
  pageRoles: [Roles.Admin],
});

const { user, session, clear } = useUserSession();

// async function logout() {
//   await clearSession()
//   await navigateTo('/login')
// }

// const { data: users } = await useSafeFetch<DBUser>('/api/users')

// const { $safeFetch } = useNuxtApp()
// const { data: users } = await useAsyncData('users', () => $safeFetch('/api/users'))

const { data: users, error } = await useAsyncData<DBUser[]>("users", () =>
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

    <Can
      :ability="[listUsers]"
      :args="[[Roles.Admin]]"
      as="p"
      data-attrs="create-and-edit-product"
    >
      I can edit a product and create a new category.
    </Can>

    <ul>
      <li v-for="{ name, id } in users" :key="id">
        {{ name }}
      </li>
    </ul>

    <pre>{{ session }}</pre>

    <UTable :data="users" class="flex-1" />
  </div>
</template>
