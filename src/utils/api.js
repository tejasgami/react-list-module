import axios from "axios";
import { BASE_URL } from "./constants";
import get from "lodash/get";

class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL
    });
    // Add a request interceptor
    /* eslint-disable */
    this.axios.interceptors.request.use(
      config => {
        return config;
      },
      error => Promise.reject(error)
    );
    // Add a response interceptor
    this.axios.interceptors.response.use(
      response => {
        return response;
      },
      error => Promise.reject(error)
    );
    /* eslint-enable */
  }

  doCall = async (path = "", method, body, callback) => {

    let headers = {
      "Content-Type": "application/json"
    };

    try {
      const res = await this.axios.request({
        url: path,
        method,
        data: body,
          ...headers
      });
      const errorMessage = get(res, "data.error");
      if (errorMessage) {
        throw new Error(errorMessage);
      }
      if(callback) callback(res)
      return res;
    } catch (err) {
      // common error point
      const apiError = get(err, "response.data.error");
      const error = apiError ? new Error(apiError) : err;
      throw error;
    }
  };
}

export default new Api();
