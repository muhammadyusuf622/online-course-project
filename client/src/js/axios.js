
const customAxios = axios.create({
  baseURL: "http://143.198.199.219:3550/api",
  timeout: 10000,
  withCredentials: true,
});

customAxios.interceptors.response.use(
  response => response,
  error => {
    console.error("Axios error: ", error.message);
    return Promise.reject(error);
  }
);

export default customAxios;