<script lang="ts" setup>
import * as v from "valibot";
import type { DBUser } from "~/shared/lib/users";

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, "The name must be 2 or more characters long.")
  ),
  email: v.pipe(v.string(), v.email("Invalid email")),
  roles: v.pipe(v.array(v.string()), v.nonEmpty("Please select a role")),
});

const route = useRoute();
const { fetch } = useUserSession();

const { data: userData } = await useValidateFetch<DBUser>(
  `/api/users/${route.params.id}`,
  {
    onSuccess: fetch,
  }
);
const userName = computed(() => {
  return new Map<string, string>().set(String(route.params.id || ''), userData.value?.name ?? '');
});

const RolesItems = Object.values(Roles);

const credentials = reactive({
  name: userData.value?.name ?? "",
  email: userData.value?.email ?? "",
  roles: userData.value?.roles ?? [],
});

function onUpdete() {}
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
