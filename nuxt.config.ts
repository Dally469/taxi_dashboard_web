// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.BASE_URL,
      imageURL: process.env.IMAGE_URL,
    },
    googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID_LOCAL,
  },

  googleSignIn: {
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID_LOCAL,
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "nuxt-vue3-google-signin",
    "@nuxtjs/google-fonts",
  ],
  css: ["@/assets/styles/css/main.css"],
 
  pinia: {
    autoImports: ["defineStore"],
  },
  imports: {
    dirs: ["./stores"],
  },
  googleFonts: {
    families: {
      Poppins: [200, 400, 700],
    },
  },
});
