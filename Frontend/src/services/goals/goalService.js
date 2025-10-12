// frontend/src/services/goals/goalService.js
import axios from "axios";

const API_URL = "https://vitalbowl-backend.onrender.com/api/goals";
const authHeaders = () => {
  const user = JSON.parse(localStorage.getItem("vitalbowl_user") || "null");
  return { headers: { Authorization: `Bearer ${user?.token || ""}` } };
};

// list all goals (returns array)
export const listGoalsAPI = async () => {
  const res = await axios.get(API_URL, authHeaders());
  return res.data; // backend returns array of goals
};

// fetch single goal by id
export const fetchGoalByIdAPI = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, authHeaders());
  return res.data;
};

// add
export const addGoalAPI = async (goalData) => {
  const res = await axios.post(API_URL, goalData, authHeaders());
  return res.data;
};

// update full goal
export const updateGoalAPI = async ({ id, ...goalData }) => {
  const res = await axios.put(`${API_URL}/${id}`, goalData, authHeaders());
  return res.data;
};

// update status only
export const updateGoalStatusAPI = async ({ goalId, status }) => {
  const res = await axios.put(`${API_URL}/status/${goalId}`, { status }, authHeaders());
  return res.data;
};

// delete
export const deleteGoalAPI = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeaders());
  return res.data;
};
