import type { UseFetchOptions } from "#app";

export function useValidateFetch<T>(url: string, options?: UseFetchOptions) {
  return useFetch<T>(url, {
    async onRequest({ options }) {
      // console.log("[fetch request]", request, options);

      const { csrfToken } = await $fetch('/api/csrf-token')
      options.headers.set("X-CSRF-Token", csrfToken || "");
    },
    async onResponseError({ response }) {
      console.log(response.status);
      if (response.status === 401) {
        return navigateTo("/login");
      }
    },
    ...options,
  });
}
