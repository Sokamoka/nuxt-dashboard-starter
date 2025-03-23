<script lang="ts" setup>
import * as v from "valibot";

const schema = v.object({
  name: v.pipe(v.string()),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

const { fetch } = useUserSession();
const toast = useToast()

const { data: userData } = await useFetch(`/api/settings/profile`);

const credentials = reactive({
  name: userData.value?.name ?? "",
  email: userData.value?.email ?? "",
});

function onUpdete() {
  $fetch("/api/settings/profile", {
    method: "POST",
    body: credentials,
  })
    .then(async () => {
      toast.add({
        title: "Success",
        description: "Your action was completed successfully.",
        color: "success",
      });
      fetch();
    })
    .catch(() => alert("Bad credentials"));
}
</script>

<template>
  <div class="flex-1">
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
