<script lang="ts" setup>
import * as v from "valibot";
import type { DBUser } from "~/shared/lib/users";

type AvailableRouterMethod = "GET" | "POST" | "PUT" | "DELETE"; // Define the type

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, "The name must be 2 or more characters long.")
  ),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

const { fetch } = useUserSession();
const toast = useToast();

const method = ref<AvailableRouterMethod>("GET");

const credentials = reactive({
  name: "",
  email: "",
});

const { data: userData, execute } = await useValidateFetch<
  DBUser,
  { message: string }
>("/api/settings/profile", {
  method,
  body: computed(() => (method.value === "POST" ? credentials : null)),
  onSuccess: () => {
    if (method.value === "GET") return;
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
});

credentials.name = userData.value?.name || "";
credentials.email = userData.value?.email || "";

async function onUpdete() {
  method.value = "POST";
  await execute();
  method.value = "GET";
  // const { error } = await useValidateFetch<DBUser>("/api/settings/profile", {
  //   method: "POST",
  //   body: credentials,
  // });
  // try {
  // const { csrfToken } = await useRequestFetch()("/api/csrf-token");
  // await useRequestFetch()("/api/settings/profile", {
  //   headers: {
  //     "X-CSRF-Token": csrfToken || ''
  //   },
  //   method: "POST",
  //   body: credentials,
  // });
  // toast.add({
  //   title: "Success",
  //   description: "Your action was completed successfully.",
  //   color: "success",
  // });
  // fetch();
  // } catch (error) {
  // console.log(error.response);
  // toast.add({
  //   title: "Error",
  //   description: error.response?._data.message,
  //   color: "error",
  // });
  // } finally {
  // method.value = "GET";
  // }
}
</script>

<template>
  <div class="flex-1 lg:max-w-2xl">
    <div>
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
