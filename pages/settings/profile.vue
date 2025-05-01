<script lang="ts" setup>
import * as v from "valibot";
import type { DBUser } from "~/shared/lib/users";

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, "The name must be 2 or more characters long.")
  ),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

const { fetch } = useUserSession();
const toast = useToast();

const { data: userData } = await useValidateFetch<DBUser>(
  "/api/settings/profile"
);

const credentials = reactive({
  name: userData.value?.name ?? "",
  email: userData.value?.email ?? "",
});

async function onUpdete() {
  try {
    await useValidateFetch<DBUser>("/api/settings/profile", {
      method: "POST",
      body: credentials,
    });
    toast.add({
      title: "Success",
      description: "Your action was completed successfully.",
      color: "success",
    });
    fetch();
  } catch {
    toast.add({
      title: "Error",
      description: "Something went wrong.",
      color: "error",
    });
  }
}
</script>

<template>
  <div class="flex-1 lg:max-w-2xl">
    <div>
      <pre class="overflow-hidden text-xs max-w-96">{{ userData }}</pre>
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

        <UButton type="submit" size="xl"> Save </UButton>
      </UForm>
    </div>
  </div>
</template>
