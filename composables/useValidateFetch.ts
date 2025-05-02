import type { UseFetchOptions } from "nuxt/app";

export default function <ResT, DataT = ResT>(
  url: string | (() => string),
  options: UseFetchOptions<ResT, DataT> & {
    onError?: (response: unknown) => void;
    onSuccess?: (response: unknown) => void;
  } = {}
) {
  return useFetch(url, {
    async onRequest({ options }) {
      const data = await useRequestFetch()("/api/csrf-token");
      options.headers.set("X-CSRF-Token", (data.csrfToken as string) ?? "");
    },
    onResponse({ response }) {
      // console.log('f:', response)
      options.onSuccess?.(response);
    },
    async onResponseError({ response }) {
      console.info(response);
      if (response.status === 401) {
        return navigateTo("/login");
      }
      if (response.status === 403) {
        return navigateTo("/403");
      }
      options.onError?.(response);
    },
    ...options,
  });
}
