export function useValidateFetch<T>(url: string) {
  return useFetch<T>(url, {
    async onRequest({ request, options }) {
      console.log("[fetch request]", request, options);

      const { csrfToken } = await $fetch('/api/csrf-token')
      options.headers.set("X-CSRF-Token", csrfToken || "");
      // options.query = options.query || {};
      // options.query.t = new Date();
    },
    async onResponseError({ response }) {
      console.log(response);
      if (response.status === 403) {
        return navigateTo("/login");
      }
    },
  });
}
