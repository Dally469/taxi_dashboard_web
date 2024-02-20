import { defineStore } from "pinia";

import type { UserProfile } from "~/types/profile";
import type { Login, User } from "~/types/user";

export const useUserStore = defineStore("user", () => {
  const user = ref();
  const token = useCookie("MY_COOKIE", {
    maxAge: 60 * 60,
  });

  const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: any) => (user.value = data);
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl;

  const signIn = async (data: Login, url: any) => {
    try {
      const res = await $fetch<User>(baseUrl + url, {
        method: "POST",
        body: data,
      });
      setToken(res.user_data.token);
      await fetchCustomer("profile/" + res.user_data.id);
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };

  const signInWithGoogle = async (data: string) => {
    try {
      setToken(data);
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };

  const fetchCustomer = async (url: any) => {
    if (token.value) {
      try {
        const res = await $fetch<UserProfile>(baseUrl + url);
        setUser(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    setToken();
    setUser();
    navigateTo("/auth/login", { replace: true });
  };

  return {
    user,
    token,
    signIn,
    signInWithGoogle,
    fetchCustomer,
    logout,
    setUser,
    setToken,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
