import axios from "axios";

const BASE_URL = "https://vitalbowl-backend.onrender.com/api/users"; // updated to match backend

//! Login
export const loginAPI = async ({ email, password }) => {
  const res = await axios.post(`${BASE_URL}/login`, { email, password });
  return res.data;
};

//! Register
export const registerAPI = async ({ username, email, password }) => {
  const res = await axios.post(`${BASE_URL}/register`, { username, email, password });
  return res.data;
};

//! Change Password
export const changePasswordAPI = async ({ newPassword, token }) => {
  const res = await axios.put(
    `${BASE_URL}/change-password`,
    { newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

//! Update Profile
export const updateProfileAPI = async (data) => {
  const { token, ...body } = data;
  const res = await axios.put(
    `${BASE_URL}/update-profile`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const updateUserDetailsAPI = async ({ age, gender, height, weight, diet, token }) => {
  const res = await axios.put(
    `${BASE_URL}/update-details`,
    { age, gender, height, weight, diet },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const updateUserDetailsByEmailAPI = async ({ email, age, gender, height, weight, diet }) => {
  const res = await axios.put(`${BASE_URL}/update-details-by-email`, { email, age, gender, height, weight, diet });
  return res.data;
};

export const deleteProfileAPI = async ({ token }) => {
  const res = await axios.delete(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchUserStatsAPI = async () => {
  const user = JSON.parse(localStorage.getItem("vitalbowl_user") || "null");
  const res = await axios.get("https://vitalbowl-backend.onrender.com/api/users/stats", {
    headers: { Authorization: `Bearer ${user?.token || ""}` },
  });
  return res.data; // { totalMeals, totalCalories, activeGoals }
};
