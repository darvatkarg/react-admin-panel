import axios from "axios";
import getAccessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
// const token = accessToken;

//apply base url for axios
const API_URL = "http://localhost:8000/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});

// console.log("Token value", accessToken);

// axiosApi.defaults.headers.common["Authorization"] = accessToken;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

axiosApi.interceptors.request.use((config) => {
  config.headers.Authorization = getAccessToken()
  return config
})

export async function get(url, headers = {}) {
  return await axiosApi
    .get(url, { ...headers })
    .then((response) => response.data);
}

export async function post(url, data, headers = {}) {
  return axiosApi
    .post(url, { ...data }, { ...headers })
    .then((response) => response.data);
}

export async function put(url, data, headers = {}) {
  return axiosApi
    .put(url, { ...data }, { ...headers })
    .then((response) => response.data);
}

export async function del(url, headers = {}) {
  return await axiosApi
    .delete(url, { ...headers })
    .then((response) => response.data);
}
