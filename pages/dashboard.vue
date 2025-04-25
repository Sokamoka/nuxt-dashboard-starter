<script setup lang="ts">
import { listUsers } from "~/shared/abilities";
import type { DBUser } from "~/shared/lib/users";

const UCheckbox = resolveComponent("UCheckbox");
const UButton = resolveComponent("UButton");

definePageMeta({
  middleware: ["authenticated"],
  pageRoles: [Roles.Admin],
});

const { user } = useUserSession();

const modal = useConfirmModal();

const { data: users } = await useValidateFetch<DBUser[]>("/api/users");
// const { data: users } = await useSafeFetch<DBUser>('/api/users')

// const { $safeFetch } = useNuxtApp()
// const { data: users } = await useAsyncData('users', () => $safeFetch('/api/users'))

// const { data: users, error } = await useAsyncData<DBUser[]>("users", () =>
//   useRequestFetch()("/api/users")
// );

// console.log(error.value);
// if (error.value?.statusCode === 401) {
//   await clear();
//   navigateTo("/login");
// }

const columns = [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "email",
  },
  {
    accessorKey: "roles",
  },
  {
    accessorKey: "id",
    header: "Delete",
    cell: ({ row }) => {
      console.log(row.getValue("id"));
      return h(UButton, {
        icon: "i-lucide-x",
        variant: "ghost",
        size: "xs",
        color: "error",
        onClick: () => onDelete(row.getValue("id")),
      });
    },
  },
];

async function onDelete(id: string) {
  const { result } = await modal.open();
  if (!(await result)) return;
  console.log(id);
}
</script>

<template>
  <div>
    <MainTitle title="User Administration" />
    <h1>Welcome {{ user?.name }}</h1>

    <Can
      :ability="[listUsers]"
      :args="[[Roles.Admin]]"
      as="p"
      data-attrs="create-and-edit-product"
    >
      I can edit a product and create a new category.
    </Can>

    <!-- <ul>
      <li v-for="{ name, id } in users" :key="id">
        {{ name }}
      </li>
    </ul> -->

    <!-- <pre>{{ session }}</pre> -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <UTable :data="users" :columns="columns" class="flex-1" />
    </UCard>
  </div>
</template>
