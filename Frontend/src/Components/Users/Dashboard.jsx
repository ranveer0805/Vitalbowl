import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaApple, FaBreadSlice, FaCheese, FaFire } from "react-icons/fa";
import MealChart from "../Meals/MealChart";
import MealList from "../Meals/MealList";
import { listMealsAPI } from "../../services/meals/mealService";

const Dashboard = () => {
  const { data } = useQuery({ queryKey: ["list-meals"], queryFn: listMealsAPI });
  const meals = Array.isArray(data?.meals) ? data.meals : [];

  const totals = meals.reduce(
    (acc, m) => {
      acc.protein += Number(m?.protein || 0);
      acc.carbs += Number(m?.carbs || 0);
      acc.fat += Number(m?.fat || 0);
      acc.calories += Number(m?.calories || 0);
      return acc;
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );

  const stats = [
    { label: "Total Protein", value: `${totals.protein}g`, icon: FaApple, color: "text-green-600" },
    { label: "Total Carbs", value: `${totals.carbs}g`, icon: FaBreadSlice, color: "text-yellow-600" },
    { label: "Total Fat", value: `${totals.fat}g`, icon: FaCheese, color: "text-orange-600" },
    { label: "Total Calories", value: `${totals.calories}`, icon: FaFire, color: "text-red-600" },
  ];

  return (
    <div className="p-6 space-y-6 bg-avocadoLightGreen text-avocadoDarkBrown min-h-screen animate-fadeIn">
      <motion.h1
        className="text-3xl font-extrabold text-center text-avocadoDarkGreen mb-6 drop-shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        VitalBowl Dashboard
      </motion.h1>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-avocadoCream/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-avocadoLightGreen/50 hover:shadow-avocadoGreen/30 transition-all duration-500 transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <stat.icon className={`text-3xl ${stat.color}`} />
              <div>
                <p className="text-sm font-medium text-avocadoGreen">{stat.label}</p>
                <p className="text-2xl font-bold text-avocadoDarkBrown">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Meal Overview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <MealChart />
      </motion.div>

      {/* Meal List */}
      <motion.div
        className="bg-avocadoCream/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-avocadoLightGreen/50 hover:shadow-avocadoGreen/20 transition-shadow duration-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-avocadoDarkGreen mb-4 text-center">Recent Meals</h2>
        <MealList />
      </motion.div>
    </div>
  );
};

export default Dashboard;
