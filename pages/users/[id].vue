<script lang="ts" setup>
import * as v from "valibot";
import type { DBUser } from "~/shared/lib/users";
import type { AvailableRouterMethod } from "nitropack";

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, "The name must be 2 or more characters long.")
  ),
  email: v.pipe(v.string(), v.email("Invalid email")),
  roles: v.pipe(v.array(v.string()), v.nonEmpty("Please select a role")),
});

const route = useRoute();
const toast = useToast();
const { fetch } = useUserSession();

const method = ref<AvailableRouterMethod<string>>("get");

const credentials = reactive<Partial<DBUser>>({
  name: "",
  email: "",
  roles: [],
});

const { data: userData, execute } = await useValidateFetch<DBUser>(
  `/api/users/${route.params.id}`,
  {
    method,
    body: computed(() => (method.value === "post" ? credentials : null)),
    onSuccess: () => {
      if (method.value === "get") return;
      toast.add({
        title: "Success",
        description: "Your action was completed successfully.",
        color: "success",
      });
      fetch();
    },
    onError: (error) => {
      toast.add({
        title: "Error",
        description: error?._data?.message,
        color: "error",
      });
    },
  }
);

const userName = computed(() => {
  return new Map<string, string>().set(
    String(route.params.id || ""),
    userData.value?.name ?? ""
  );
});

credentials.name = userData.value?.name ?? "";
credentials.email = userData.value?.email ?? "";
credentials.roles = userData.value?.roles ?? [];

const RolesItems = Object.values(Roles);

async function onUpdete() {
  method.value = "post";
  await execute();
  method.value = "get";
}
</script>
<template>
  <div>
    <MainTitle
      title="User Administration"
      subtitle="You can edit user"
      :replacement="userName"
    />

    <UForm
      :schema="schema"
      :state="credentials"
      class="max-w-2xl space-y-4"
      @submit="onUpdete"
    >
      <UFormField label="Name" name="name">
        <UInput v-model="credentials.name" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="credentials.email" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Roles" name="roles">
        <USelect
          v-model="credentials.roles"
          :items="RolesItems"
          size="xl"
          multiple
          class="w-full"
        />
      </UFormField>

      <UButton type="submit" size="xl"> Save </UButton>
    </UForm>
  </div>
</template>
