<script lang="ts" setup>
import * as v from "valibot";

const schema = v.object({
  password: v.pipe(
    v.string(),
    v.minLength(4, "The name must be 4 or more characters long.")
  ),
  newPassword: v.pipe(
    v.string(),
    v.minLength(4, "The name must be 4 or more characters long.")
  ),
});

const toast = useToast();

const credentials = reactive({
  password: "",
  newPassword: "",
});

async function onUpdete() {
  try {
    const { csrfToken } = await useRequestFetch()("/api/csrf-token");
    await useRequestFetch()("/api/settings/password", {
      headers: {
        "X-CSRF-Token": csrfToken || "",
      },
      method: "POST",
      body: credentials,
    });
    toast.add({
      title: "Success",
      description: "Your action was completed successfully.",
      color: "success",
    });
    credentials.password = "";
    credentials.newPassword = "";
  } catch (error) {
    toast.add({
      title: "Error",
      description: error.response?._data.message,
      color: "error",
    });
  }
}
</script>

<template>
  <div class="flex-1 lg:max-w-2xl">
    <UForm
      :schema="schema"
      :state="credentials"
      class="space-y-4"
      @submit="onUpdete"
    >
      <UFormField label="Password" name="password">
        <UInput v-model="credentials.password" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="New Password" name="newPassword">
        <UInput v-model="credentials.newPassword" size="xl" class="w-full" />
      </UFormField>

      <UButton type="submit" size="xl"> Save </UButton>
    </UForm>
  </div>
</template>
