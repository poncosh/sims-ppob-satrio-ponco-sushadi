import { axiosInstance } from "../utils/axios";

export const useApiPrivate = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers[
          "Authorization"
        ] = `Bearer ${localStorage.SIMS_PPOB_TOKEN}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use((response) => response);

  return axiosInstance;
};

export const useApi = () => {
  return axiosInstance;
};
