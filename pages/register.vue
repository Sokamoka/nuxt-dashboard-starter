<script setup>
import * as v from "valibot";
// import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: "main",
});

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, "Must be at least 2 characters")),
  email: v.pipe(v.string(), v.email("Invalid email")),
  password: v.pipe(v.string(), v.minLength(4, "Must be at least 4 characters")),
});

const credentials = reactive({
  name: "",
  email: "",
  password: "",
});

async function register() {
  $fetch("/api/register", {
    method: "POST",
    body: credentials,
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await navigateTo("/dashboard");
    })
    .catch(() => alert("Bad credentials"));
}
</script>

<template>
  <div class="p-8">
    <UCard class="max-w-80 m-auto">
      <template #header>
        <h1 class="text-xl font-bold">Sign up</h1>
      </template>

      <UForm
        :schema="schema"
        :state="credentials"
        class="space-y-4"
        @submit="register"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="credentials.name" size="xl" class="w-full" />
        </UFormField>

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

        <UButton type="submit" size="xl"> Register </UButton>
      </UForm>
    </UCard>
  </div>
</template>
