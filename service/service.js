import axios from "axios";
import apiCall from "./api";

export const apiService = {
  registerUser: (data) =>
    apiCall("/api/user/register", { method: "POST", data }),

  loginUser: (data) => apiCall("/api/user/login", { method: "POST", data }),

  changePassword: (data) =>
    apiCall("/api/user/changepassword", { method: "POST", data }),

  getLoggedUser: async ({ token }) => {
    try {
      const response = await apiCall("/api/user/loggeduser", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      console.error("Error fetching logged user:", error);
      throw error;
    }
  },

  getAsset: () => apiCall("/api/user/get_asset_categories", { method: "GET" }),

  //   createUser: (data) => apiCall("/users", { method: "POST", data }),
  //   updateUser: (id, data) => apiCall(`/users/${id}`, { method: "PUT", data }),
  //   deleteUser: (id) => apiCall(`/users/${id}`, { method: "DELETE" }),
};
