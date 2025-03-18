export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();
  if (!to.meta?.pageRoles.includes(user.value?.role)) return "/login";

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo("/login");
  }
});
