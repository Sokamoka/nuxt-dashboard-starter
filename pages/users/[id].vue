<script lang="ts" setup>
import * as v from "valibot";
import type { DBUser } from '~/shared/lib/users';

const schema = v.object({
  name: v.pipe(v.string()),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

const { data: userData } = await useValidateFetch<DBUser>('/api/settings/profile');

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
    />

    <UForm
        :schema="schema"
        :state="credentials"
        class="space-y-4"
        @submit="onUpdete"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="credentials.name" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="credentials.email" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email">
          <USelect v-model="credentials.roles" :items="items" class="w-48" />
        </UFormField>


        <UButton type="submit" size="xl"> Save </UButton>
      </UForm>
  </div>
</template>
