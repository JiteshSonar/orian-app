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

  getAssetDetail: (id) =>
    apiCall("/api/user/get-asset-detail/" + id, { method: "GET" }),

  addAsset: (data) => apiCall("/api/user/asset", { method: "POST", data }),

  getEmployees: () => apiCall("/api/user/employ", { method: "GET" }),

  getEmployDetail: (id) =>
    apiCall("/api/user/get-employe/" + id, { method: "GET" }),

  getSkills: () => apiCall("/api/user/skills", { method: "GET" }),
};
