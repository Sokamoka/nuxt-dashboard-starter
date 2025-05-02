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
      try {
        const data = await useRequestFetch()("/api/csrf-token");
        options.headers.set("X-CSRF-Token", (data.csrfToken as string) ?? "");
      } catch (error) {
        if (error.status === 401) {
          return navigateTo("/login");
        }
      }
    },
    onResponse({ response }) {
      // console.log('onResponse:', options)
      options.onSuccess?.(response);
    },
    onResponseError({ response }) {
      console.info('onResponseError', response);
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
