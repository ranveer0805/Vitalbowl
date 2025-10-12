// frontend/src/services/meals/mealService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/meals";
const authHeaders = () => {
  const user = JSON.parse(localStorage.getItem("vitalbowl_user") || "null");
  return { headers: { Authorization: `Bearer ${user?.token || ""}` } };
};

export const listMealsAPI = async () => {
  const res = await axios.get(API_URL, authHeaders());
  return res.data; // backend returns array of meals
};

export const fetchMealByIdAPI = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, authHeaders());
  return res.data;
};

export const addMealAPI = async (mealData) => {
  const res = await axios.post(API_URL, mealData, authHeaders());
  return res.data;
};

export const updateMealAPI = async ({ id, ...mealData }) => {
  const res = await axios.put(`${API_URL}/${id}`, mealData, authHeaders());
  return res.data;
};

export const deleteMealAPI = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return res.data;
};



