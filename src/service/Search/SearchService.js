import axios from "./../../config/axios";
const api_path = {
  fetchData: "/api/search",
};

export const SearchService = {
  getData: (form) => {
    // return axios.post(`/search`, form);
    return axios.post(api_path.fetchData, form);
  },
};
