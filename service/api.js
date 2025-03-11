import axios from "axios";

const BASE_URL = "http://192.168.1.22:8000";
// const BASE_URL = "http://172.20.10.5:8000";

const apiCall = async (endpoint, options = {}) => {
  const {
    method = "GET",
    data = null,
    params = {},
    headers = {},
    token = null,
  } = options;

  const apiHeaders = {
    "Content-Type": "application/json",
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params,
      timeout: 10000,
      headers: apiHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error.response ? error.response.data : error;
  }
};

export default apiCall;
