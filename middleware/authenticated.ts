import isAllowed from "~/shared/is-allowed";

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();
  if (!loggedIn.value) return navigateTo("/login");
  if (!isAllowed(to.meta?.pageRoles as string[], user.value?.roles ?? []))
    return navigateTo("/403");
});
