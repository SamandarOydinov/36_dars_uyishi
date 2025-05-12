import axios from "axios";

const instance = axios.create({
  baseURL: "https://680a2b981f1a52874cdf723c.mockapi.io",
  //   baseURL: import.meta.env.VITE_BASE_URL,
});

export default instance;
