import type { UseFetchOptions } from 'nuxt/app'

export function useSafeFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {},
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$safeFetch as typeof $fetch,
  })
}
