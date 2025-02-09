import axios from "axios";

const BASE_URL = "http://localhost:8000";

const apiCall = async (
  endpoint,
  { method = "GET", data = null, params = {}, headers = {} } = {}
) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error.response ? error.response.data : error;
  }
};

export default apiCall;
