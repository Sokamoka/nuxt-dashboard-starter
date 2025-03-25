export function useValidateFetch<T>(url: string) {
  return useFetch<T>(url, {
    async onResponseError({ response }) {
      console.log(response);
      if (response.status === 403) {
        return navigateTo("/login");
      }
    },
  });
}
