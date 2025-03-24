export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();
  if (!loggedIn.value) return navigateTo("/login");
  if (!isAllowed(to.meta?.pageRoles, user.value?.roles))
    return navigateTo("/login");
});
