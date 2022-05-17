import axios from "./../../config/axios";

const api_path = {};

export const UploadService = {
  uploadCloud: (form) => {
    return axios.post(`/api/upload/cloud`, form , { headers: {
    }});
    // return axios.post("/api/upload/cloud", form);
  },
  createSong: (form) => {
    return axios.post(`/api/create-song`, form);
    // return axios.post("/api/create-song", form);
  },
};
