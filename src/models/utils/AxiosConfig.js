import axios from "axios";

export const AxiosConfig = {
  init() {
    axios.interceptors.response.use(
      function(response) {
        return response.data;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
  }
};
