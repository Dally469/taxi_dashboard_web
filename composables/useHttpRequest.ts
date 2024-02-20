import { useUserStore } from "~/stores/users/user";

export const useHttpRequest = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl;
  const userStore = useUserStore();

  return {
    async request(url: RequestInfo, params?: any): Promise<any> {
      if (!params) {
        params = {};
      }
      params.headers = { Authorization: "Bearer " + userStore.token };
      const promise = new Promise((resolve, reject) => {
        resolve($fetch(baseUrl + url, params));
      });
      promise.catch((res) => {
        if (res.status == 401) {
          navigateTo({ path: "/auth/login" });
        } else {
          return res.data;
        }
      });
      return promise;
    },
  };
};
