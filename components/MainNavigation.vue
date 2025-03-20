<script setup>
const { loggedIn, user, clear } = useUserSession();

console.log(loggedIn.value);

const items = computed(() => [
  [
    {
      label: "Index",
      to: "/",
    },
    {
      label: "Dashboard",
      to: "/dashboard",
    },
  ],
  [
    ...(loggedIn.value
      ? [
          {
            label: user.value.name,
            slot: "user",
            children: [
              {
                label: "Settings",
                icon: "i-lucide-box",
              },
              {
                label: "Log out",
                icon: "i-lucide-box",
                onSelect: async () => {
                  await clear();
                  navigateTo("/login");
                },
              },
            ],
          },
        ]
      : [
          {
            label: "Sign In",
            to: "/login",
          },
          {
            label: "Sign Up",
            to: "/register",
          },
        ]),
  ],
]);
</script>

<template>
  <nav class="px-4 border-b border-neutral-200">
    <UNavigationMenu
      color="neutral"
      content-orientation="vertical"
      :items="items"
      class="w-full"
    >
      <template #user-leading>
        <UAvatar :alt="user?.name" size="md" />
      </template>
    </UNavigationMenu>
  </nav>
  <!-- <nav class="flex gap-5 bg-slate-200 p-5">
    <NuxtLink to="/" >Index</NuxtLink>
    <AuthState v-slot="{ loggedIn, clear }">
      <NuxtLink v-if="loggedIn" to="/dashboard" >Dashboard</NuxtLink>
      <button v-if="loggedIn" @click="clear">Logout</button>
      <NuxtLink v-else to="/login">Login</NuxtLink>
    </AuthState>
  </nav> -->
</template>
