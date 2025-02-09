import axios from "axios";
import apiCall from "./api";

export const apiService = {
  registerUser: (data) =>
    apiCall("/api/user/register", { method: "POST", data }),

  loginUser: (data) => 
    apiCall("/api/user/login", { method: "POST", data }),

  changePassword: (data) =>
    apiCall("/api/user/changepassword", { method: "POST", data }),

  //   getUsers: () => apiCall("/users", { method: "GET" }),
  //   getUserById: (id) => apiCall(`/users/${id}`, { method: "GET" }),
  //   createUser: (data) => apiCall("/users", { method: "POST", data }),
  //   updateUser: (id, data) => apiCall(`/users/${id}`, { method: "PUT", data }),
  //   deleteUser: (id) => apiCall(`/users/${id}`, { method: "DELETE" }),
};
