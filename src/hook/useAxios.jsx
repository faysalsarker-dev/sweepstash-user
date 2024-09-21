import axios from "axios";

const axiosCommon = axios.create({
  // baseURL: import.meta.env.VITE_SERVER_API,
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  return axiosCommon;
};

export default useAxios;
