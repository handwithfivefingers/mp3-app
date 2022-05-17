import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_DEV_API,
  baseURL: "http://localhost:3003",
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  withCredentials: true,
  credentials: 'include',
});

instance.interceptors.request.use((req) => {
  //   const { authReducer } = store.getState();
  //   if (authReducer.token) {
  //     req.headers.Authorization = `Bearer ${authReducer.token}`;
  //   }
  return req;
});

export default instance;
