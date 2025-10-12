// frontend/src/services/users/userServices.js
import axios from "axios";
import { BASE_URL } from "../../utils/url.js";

const API_URL = `${BASE_URL}/users`;

// ===== Login =====
export const loginAPI = async ({ email, password }) => {
  console.log('BASE_URL in loginAPI:', BASE_URL);
  console.log('Full login URL:', `${API_URL}/login`);
  const res = await axios.post(
    `${API_URL}/login`,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: false, // set to true if backend uses cookies
    }
  );
  return res.data;
};

// ===== Register =====
export const registerAPI = async ({ username, email, password }) => {
  const res = await axios.post(
    `${API_URL}/register`,
    { username, email, password },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    }
  );
  return res.data;
};

// ===== Change Password =====
export const changePasswordAPI = async ({ newPassword, token }) => {
  const res = await axios.put(
    `${API_URL}/change-password`,
    { newPassword },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    }
  );
  return res.data;
};

// ===== Update Profile =====
export const updateProfileAPI = async (data) => {
  const { token, ...body } = data;
  const res = await axios.put(`${API_URL}/update-profile`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: false,
  });
  return res.data;
};

// ===== Update User Details =====
export const updateUserDetailsAPI = async ({ age, gender, height, weight, diet, token }) => {
  const res = await axios.put(
    `${API_URL}/update-details`,
    { age, gender, height, weight, diet },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    }
  );
  return res.data;
};

// ===== Update User Details By Email =====
export const updateUserDetailsByEmailAPI = async ({ email, age, gender, height, weight, diet }) => {
  const res = await axios.put(
    `${API_URL}/update-details-by-email`,
    { email, age, gender, height, weight, diet },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    }
  );
  return res.data;
};

// ===== Delete Profile =====
export const deleteProfileAPI = async ({ token }) => {
  const res = await axios.delete(`${API_URL}/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: false,
  });
  return res.data;
};

// ===== Fetch User Stats =====
export const fetchUserStatsAPI = async () => {
  const user = JSON.parse(localStorage.getItem("vitalbowl_user") || "null");
  const res = await axios.get(`${API_URL}/stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token || ""}`,
    },
    withCredentials: false,
  });
  return res.data; // { totalMeals, totalCalories, activeGoals }
};
