<script setup lang="ts">
import { listUsers } from "~/shared/abilities";
import type { DBUser } from "~/shared/lib/users";
import type { TableColumn } from "@nuxt/ui";
import type { AvailableRouterMethod } from "nitropack";

const UCheckbox = resolveComponent("UCheckbox");
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");

definePageMeta({
  middleware: ["authenticated"],
  pageRoles: [Roles.Admin],
});

const table = useTemplateRef("table");
const modal = useConfirmModal();
const toast = useToast();
const { fetch } = useUserSession();

const method = ref<AvailableRouterMethod<string>>("get");
const deletePayload = shallowRef<string[] | null>(null);

const {
  data: users,
  error,
  execute,
} = await useValidateFetch<DBUser[], ErrorData>("/api/users", {
  method,
  body: deletePayload,
  onSuccess: () => {
    if (method.value === "get") return;
    toast.add({
      title: "Success",
      description: "Your action was completed successfully.",
      color: "success",
    });
    fetch();
  },
});

const columns: TableColumn<DBUser>[] = [
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
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      const roles: DBUser["roles"] = row.getValue("roles");
      return roles.map((item) => {
        const color = {
          ADMIN: "error" as const,
          EDITOR: "warning" as const,
        }[item as string];
        return h(
          UBadge,
          { class: "capitalize", variant: "subtle", color },
          () => item
        );
      });
    },
  },
  {
    accessorKey: "id",
    header: "Edit",
    cell: ({ row }) => {
      return h(UButton, {
        icon: "i-lucide-pencil",
        variant: "ghost",
        size: "xs",
        color: "neutral",
        onClick: () => onEdit(row.getValue("id")),
      });
    },
  },
  {
    accessorKey: "id",
    header: "Delete",
    cell: ({ row }) => {
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

const columnFilters = ref([
  {
    id: "name",
    value: "",
  },
]);

async function onEdit(id: string) {
  await navigateTo(`/users/${id}`);
}

async function onDelete(id: string) {
  const instance = modal.open({
    title: `Are you sure you want to delete user?`,
    message: "This action cannot be undone.",
  });
  if (!(await instance.result)) return;
  console.log(id);
  deleteService([id]);
}

async function onDeleteSelected() {
  const rows = table.value?.tableApi?.getFilteredSelectedRowModel()?.rows ?? [];
  const instance = modal.open({
    title: `Are you sure you want to delete ${rows.length} users?`,
    message: "This action cannot be undone.",
  });
  if (!(await instance.result)) return;
  const ids = rows.map((row) => (row.original as DBUser).id);
  console.log(ids);
  deleteService(ids);
}

function deleteService(keys: string[]) {
  method.value = "delete";
  deletePayload.value = keys;
  execute();
}
</script>

<template>
  <div>
    <MainTitle
      title="User Administration"
      subtitle="You can edit or delete user"
    />

    <Can
      :ability="[listUsers]"
      :args="[[[Roles.Admin]]]"
      as="p"
      data-attrs="delete-and-edit-users"
      class="py-2 text-xs"
    >
      <UIcon name="i-lucide-lightbulb" class="size-3 mr-2" />I can delete and
      edit users.
    </Can>

    <pre>{{ error }}</pre>

    <div class="pb-3">
      <UButton
        v-if="
          (table?.tableApi?.getFilteredSelectedRowModel()?.rows?.length ?? 0) >
          0
        "
        color="error"
        @click="onDeleteSelected"
      >
        Delete
      </UButton>
      <UInput
        v-else
        :model-value="table?.tableApi?.getColumn('name')?.getFilterValue() as string"
        class="max-w-sm"
        placeholder="Filter names..."
        @update:model-value="
          table?.tableApi?.getColumn('name')?.setFilterValue($event)
        "
      />
    </div>
    <UCard :ui="{ body: 'p-0 sm:p-0' }">
      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        :data="users"
        :columns="columns"
        class="flex-1"
      />
    </UCard>
  </div>
</template>
