<script setup>
const { loggedIn, user, clear } = useUserSession();
const isSidebarVisible = useSidebarVisibility();
const isMobileSidebarVisible = useMobileSidebarVisibility();

const isLargeThenMd = useMediaQuery("(min-width: 768px)", { ssrWidth: 768 });

whenever(isLargeThenMd, () => (isMobileSidebarVisible.value = false));

const items = computed(() => [
  [
    {
      icon: "i-lucide-menu",
      onSelect: async () => {
        if (isLargeThenMd.value) {
          isSidebarVisible.value = !isSidebarVisible.value;
          return;
        }
        isMobileSidebarVisible.value = !isMobileSidebarVisible.value;
      },
    },
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
                icon: "i-lucide-settings",
                to: "/settings/profile",
              },
              {
                label: "Log out",
                icon: "i-lucide-log-out",
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
  <header class="flex px-2 border-b border-slate-300">
    <UNavigationMenu
      color="slate"
      content-orientation="vertical"
      :items="items"
      class="w-full"
    >
      <template #user-leading>
        <UAvatar :alt="user?.name" size="xs" />
      </template>
    </UNavigationMenu>
  </header>
  <!-- <nav class="flex gap-5 bg-slate-200 p-5">
    <NuxtLink to="/" >Index</NuxtLink>
    <AuthState v-slot="{ loggedIn, clear }">
      <NuxtLink v-if="loggedIn" to="/dashboard" >Dashboard</NuxtLink>
      <button v-if="loggedIn" @click="clear">Logout</button>
      <NuxtLink v-else to="/login">Login</NuxtLink>
    </AuthState>
  </nav> -->
</template>
