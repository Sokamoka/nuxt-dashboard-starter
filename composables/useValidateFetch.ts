export function useValidateFetch<T>(url: string, options?: unknown) {
  return useFetch<T>(url, {
    async onRequest({ options }) {
      const data = await useRequestFetch()("/api/csrf-token");
      options.headers.set("X-CSRF-Token", (data.csrfToken as string) ?? "");
    },
    async onResponseError({ response }) {
      console.info(response);
      if (response.status === 401) {
        return navigateTo("/login");
      }
    },
    ...(options || {}),
  });
}
