import axios from "axios"

export const ApiFetch = {
  get: async (url) => {
    return await fetch(url, "GET").catch((error) => {
      throw error;
    });
  },

  post: async (url, body) => {
    return await fetch(url, "POST", body).catch((error) => {
      throw error;
    });
  },

  patch: async (url, body) => {
    return await fetch(url, "PATCH", body).catch((error) => {
      throw error;
    });
  },

  put: async (url, body) => {
      return await fetch(url, "PUT", body)
          .catch((error) => {
      throw error;
    });
  },
};

function fetch(url, method, data) {
  

    return axios({
        url,
        method,
        // baseURL: process.env.VITE_BASE_URL,
        data,
        withCredentials: true,
      });
}