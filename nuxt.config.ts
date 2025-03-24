// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ["nuxt-auth-utils", "@nuxt/ui", "@vueuse/nuxt", "nuxt-authorization"],

  css: ["~/assets/css/main.css"],

  devServer: {
    port: 3030,
  },

  // runtimeConfig: {
  //   session: {
  //     maxAge: 0,
  //   }
  // }
});
