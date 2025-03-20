<script setup lang="ts">
import * as v from "valibot";
// import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  password: v.pipe(v.string(), v.minLength(4, "Must be at least 4 characters")),
});

// type Schema = v.InferOutput<typeof schema>

const { fetch: refreshSession } = useUserSession();
const credentials = reactive({
  email: "",
  password: "",
});
async function login() {
  $fetch("/api/login", {
    method: "POST",
    body: credentials,
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession();
      await navigateTo("/dashboard");
    })
    .catch(() => alert("Bad credentials"));
}
</script>

<template>
  <div class="p-8">
    <UCard class="max-w-80 m-auto">
      <template #header>
        <h1 class="text-xl font-bold">Sign in</h1>
      </template>

      <UForm
        :schema="schema"
        :state="credentials"
        class="space-y-4"
        @submit="login"
      >
        <ul>
          <li>admin</li>
          <li>editor</li>
        </ul>

        <UFormField label="Email" name="email">
          <UInput v-model="credentials.email" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="credentials.password"
            size="xl"
            type="password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" size="xl"> Login </UButton>
      </UForm>
    </UCard>
  </div>
</template>
