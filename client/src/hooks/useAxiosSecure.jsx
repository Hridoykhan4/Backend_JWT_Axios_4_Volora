import axios from "axios";
import { useEffect } from "react";
import useAuthValue from "./useAuthValue";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useAuthValue();
  const nav = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logOut().then(() => {
            toast.error(err?.response?.data?.message || err.message);
            nav(`/login`);
          });
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [nav, logOut]);

  return axiosInstance;
};

export default useAxiosSecure;
