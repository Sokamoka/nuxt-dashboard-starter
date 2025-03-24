export default defineNuxtPlugin((nuxtApp) => {

  const $safeFetch = $fetch.create({
    onResponse() {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }) {
      console.log('response:', response)
      if (response.status === 401) {
        return nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })
  return {
    provide: {
      safeFetch: $safeFetch,
    },
  }
})
