import axios from "axios";
import useAuth from "./useAuth/useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {
    const intercept = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axiosSecure.interceptors.request.eject(intercept);
  }, [user]);

  return axiosSecure;
};

/* const useAxiosSecure = () => {
  const { user } = useAuth();
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}; */

export default useAxiosSecure;
