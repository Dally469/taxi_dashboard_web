import { useUserStore } from "./../stores/users/user";
export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();
  if (!userStore.user) {
    await userStore.fetchCustomer("profile/1");
  }
});
