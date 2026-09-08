// import axios from "axios";

// export const axiosInstance = axios.create({});

// export const apiConnector = (
//   method,
//   url,
//   bodyData,
//   headers,
//   params
// ) => {
//   return axiosInstance({
//     method,
//     url,
//     data: bodyData || null,
//     headers: headers || null,
//     params: params || null,
//   });
// };



import axios from "axios";

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiConnector = (
  method,
  url,
  bodyData,
  headers,
  params
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers: headers || null,
    params: params || null,
  });
};