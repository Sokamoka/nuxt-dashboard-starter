import type { UseFetchOptions } from "nuxt/app";
import type { IFetchError, FetchResponse } from "ofetch";

export default function <ResT, ErrorT = unknown>(
  url: string | (() => string),
  options: UseFetchOptions<ResT, ErrorT> & {
    onError?: (response: FetchResponse<ErrorT> | undefined) => void;
    onSuccess?: (response: unknown) => void;
  } = {}
) {
  return useFetch(url, {
    async onRequest({ options }) {
      try {
        const data = await useRequestFetch()("/api/csrf-token");
        options.headers.set("X-CSRF-Token", (data.csrfToken as string) ?? "");
      } catch (error) {
        if ((error as { status: number }).status === 401) {
          return navigateTo("/login");
        }
      }
    },
    onResponse({ response }) {
      if (response._data.error) return;
      // console.log('onResponse:', options)
      options.onSuccess?.(response);
    },
    onResponseError({ response }: IFetchError<FetchResponse<ErrorT>>) {
      // console.info("onResponseError", response);
      if (response?.status === 401) {
        return navigateTo("/login");
      }
      if (response?.status === 403) {
        return navigateTo("/403");
      }
      options.onError?.(response as FetchResponse<ErrorT> | undefined);
    },
    ...options,
  });
}
