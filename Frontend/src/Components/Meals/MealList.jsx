// src/Components/Meals/MealList.jsx
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { listMealsAPI, deleteMealAPI } from "../../services/meals/mealService";
import { ClipLoader } from "react-spinners";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";

const MealList = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    searchFood: "",
  });

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["list-meals"],
    queryFn: listMealsAPI,
  });

  const { mutateAsync: deleteMeal, isLoading: isDeleting } = useMutation({
    mutationFn: deleteMealAPI,
    mutationKey: ["delete-meal"],
  });

  const handleDelete = async (id) => {
    try {
      await deleteMeal(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const meals = Array.isArray(data?.meals) ? data.meals : [];

  // Filtering logic
  const filteredMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.date);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    if (startDate && mealDate < startDate) return false;
    if (endDate && mealDate > endDate) return false;
    if (filters.type && meal.type !== filters.type) return false;
    if (
      filters.searchFood &&
      !meal.food.toLowerCase().includes(filters.searchFood.toLowerCase())
    )
      return false;

    return true;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-avocadoCream p-6 text-avocadoDarkBrown flex flex-col items-center animate-fadeIn">
      <div className="w-full max-w-3xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-avocadoDarkBrown animate-slideInUp">My Meals</h2>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-avocadoLightGreen"
            placeholder="Start Date"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-avocadoLightGreen"
            placeholder="End Date"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-avocadoLightGreen"
          >
            <option value="">All Types</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Brunch">Brunch</option>
            <option value="Morning Snack">Morning Snack</option>
            <option value="Evening Snack">Evening Snack</option>
          </select>
          <input
            type="text"
            name="searchFood"
            value={filters.searchFood}
            onChange={handleFilterChange}
            className="p-2 rounded-lg border border-avocadoLightGreen"
            placeholder="Search Food"
          />
        </div>

        {isLoading || isFetching ? (
          <div className="flex justify-center"><ClipLoader color="#4CAF50" size={50} /></div>
        ) : isError ? (
          <AlertMessage type="error" message={error?.message || "Failed to load meals"} />
        ) : (
          <ul className="space-y-4">
            {filteredMeals.map((meal, idx) => (
              <li key={meal._id} className="flex justify-between items-center bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-avocadoLightGreen animate-slideInUp" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div className="flex flex-col">
                  <span className="text-avocadoDarkBrown font-medium">{meal.food}</span>
                  <p className="text-avocadoGreen text-sm italic">{meal.type}</p>
                  {meal.description && <p className="text-avocadoGreen text-xs mt-1 italic">{meal.description}</p>}
                  <p className="text-avocadoGreen text-xs mt-1">
                    {meal.calories} kcal | {meal.protein}g Protein | {meal.carbs}g Carbs | {meal.fat}g Fat
                  </p>
                  <p className="text-avocadoGreen text-xs">{new Date(meal.date).toLocaleDateString()}</p>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/update-meal/${meal._id}`}>
                    <button className="bg-avocadoGreen text-avocadoDarkBrown p-2 rounded-full shadow hover:bg-avocadoDarkGreen hover:-translate-y-1 transition">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="bg-gradient-to-r from-red-500 to-rose-500 text-white p-2 rounded-full shadow hover:from-red-600 hover:to-rose-600 hover:-translate-y-1 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isDeleting && (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#EF4444" size={30} />
            <span className="ml-2 text-red-500">Deleting...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealList;
