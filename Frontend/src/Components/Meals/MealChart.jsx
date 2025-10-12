import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { listMealsAPI } from "../../services/meals/mealService";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

const MealChart = () => {
  const { data } = useQuery({ queryKey: ["list-meals"], queryFn: listMealsAPI });
  const [chartType, setChartType] = useState("donut");
  const types = ["donut", "bar", "line"];
  const labelsMap = { donut: "Donut", bar: "Bar", line: "Line" };

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

  const hasData = totals.protein > 0 || totals.carbs > 0 || totals.fat > 0 || totals.calories > 0;

  const donutData = {
    labels: ["Protein", "Carbs", "Fat", "Calories"],
    datasets: [
      { label: "Nutrition", data: [totals.protein, totals.carbs, totals.fat, totals.calories], backgroundColor: ["#3B7A57", "#A3C293", "#2E8B57", "#4B8B3B"], borderWidth: 1, hoverOffset: 6 },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4B8B3B',
        },
      },
    },
  };

  const barData = {
    labels: ["Total"],
    datasets: [
      { label: "Protein", data: [totals.protein], backgroundColor: "#3B7A57" },
      { label: "Carbs", data: [totals.carbs], backgroundColor: "#A3C293" },
      { label: "Fat", data: [totals.fat], backgroundColor: "#2E8B57" },
      { label: "Calories", data: [totals.calories], backgroundColor: "#4B8B3B" },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4B8B3B',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Nutrients',
          color: '#4B8B3B',
        },
        ticks: {
          color: '#4B8B3B',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4B8B3B',
        },
      },
    },
  };

  const lineData = useMemo(() => {
    const grouped = {};
    meals.forEach((m) => {
      const key = new Date(m.date).toISOString().split("T")[0];
      if (!grouped[key]) grouped[key] = { protein: 0, carbs: 0, fat: 0, calories: 0 };
      grouped[key].protein += Number(m.protein || 0);
      grouped[key].carbs += Number(m.carbs || 0);
      grouped[key].fat += Number(m.fat || 0);
      grouped[key].calories += Number(m.calories || 0);
    });
    const keys = Object.keys(grouped).sort();
    return {
      labels: keys.map((d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })),
      datasets: [
        { label: "Protein", data: keys.map((d) => grouped[d].protein), borderColor: "#3B7A57", backgroundColor: "#3B7A57", tension: 0.4 },
        { label: "Carbs", data: keys.map((d) => grouped[d].carbs), borderColor: "#A3C293", backgroundColor: "#A3C293", tension: 0.4 },
        { label: "Fat", data: keys.map((d) => grouped[d].fat), borderColor: "#2E8B57", backgroundColor: "#2E8B57", tension: 0.4 },
        { label: "Calories", data: keys.map((d) => grouped[d].calories), borderColor: "#4B8B3B", backgroundColor: "#4B8B3B", tension: 0.4 },
      ],
    };
  }, [meals]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4B8B3B',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4B8B3B',
        },
      },
      x: {
        ticks: {
          color: '#4B8B3B',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-avocadoCream rounded-3xl shadow-2xl border border-avocadoLightGreen text-avocadoDarkBrown mb-10 animate-slideInUp">
      <h2 className="text-2xl font-bold text-center mb-6 text-avocadoDarkBrown">Meal Overview</h2>
      <div className="w-72 mb-6 mx-auto flex gap-1 bg-avocadoLightGreen p-1 rounded-full">
        {types.map((type) => (
          <button key={type} onClick={() => setChartType(type)} className={`relative flex-1 py-2 rounded-full font-semibold text-center ${chartType===type ? "text-avocadoDarkBrown" : "text-avocadoGreen"}`}>
            {chartType === type && <span className="absolute inset-0 bg-avocadoGreen rounded-full shadow-md" />}
            <span className="relative z-10">{labelsMap[type]}</span>
          </button>
        ))}
      </div>
      <div className="w-full h-[350px]">
        {hasData ? (
          <>
            {chartType === "donut" && <Doughnut data={donutData} options={donutOptions} />}
            {chartType === "bar" && <Bar data={barData} options={barOptions} />}
            {chartType === "line" && <Line data={lineData} options={lineOptions} />}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-avocadoGreen">
            <p>No meal data available. Add some meals to see charts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealChart;
