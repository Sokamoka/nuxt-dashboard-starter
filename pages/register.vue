<script setup>
const credentials = reactive({
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
  <div>
    Register
    <form @submit.prevent="register">
      <input v-model="credentials.email" type="email" placeholder="Email">
      <input v-model="credentials.password" type="password" placeholder="Password">
      <button type="submit">register</button>
    </form>
  </div>
</template>
