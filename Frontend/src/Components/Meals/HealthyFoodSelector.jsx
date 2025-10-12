import React from "react";
import { FaAppleAlt, FaLeaf, FaDrumstickBite, FaBreadSlice, FaCheese } from "react-icons/fa";

const HealthyFoodSelector = ({ onSelect, mealType }) => {
  // Define food items per meal type
  const foodDataByMealType = {
    Breakfast: [
      {
        category: "Fruits",
        icon: <FaAppleAlt className="text-avocadoGreen" />,
        items: [
          { name: "Apple", calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
          { name: "Banana", calories: 89, carbs: 23, protein: 1.1, fat: 0.3 },
          { name: "Orange", calories: 47, carbs: 12, protein: 0.9, fat: 0.1 },
          { name: "Berries", calories: 57, carbs: 14, protein: 0.7, fat: 0.3 },
        ],
      },
      {
        category: "Grains",
        icon: <FaBreadSlice className="text-avocadoGreen" />,
        items: [
          { name: "Oats", calories: 379, carbs: 66, protein: 17, fat: 7 },
          { name: "Brown Rice", calories: 111, carbs: 23, protein: 2.7, fat: 0.9 },
          { name: "Whole Wheat Bread", calories: 247, carbs: 41, protein: 13, fat: 4 },
          { name: "Quinoa", calories: 368, carbs: 64, protein: 14, fat: 6 },
        ],
      },
      {
        category: "Dairy & Nuts",
        icon: <FaCheese className="text-avocadoGreen" />,
        items: [
          { name: "Greek Yogurt", calories: 59, carbs: 4, protein: 10, fat: 0.4 },
          { name: "Almonds", calories: 579, carbs: 22, protein: 21, fat: 50 },
        ],
      },
    ],
    Lunch: [
      {
        category: "Proteins",
        icon: <FaDrumstickBite className="text-avocadoGreen" />,
        items: [
          { name: "Chicken Breast", calories: 165, carbs: 0, protein: 31, fat: 3.6 },
          { name: "Salmon", calories: 206, carbs: 0, protein: 22, fat: 13 },
          { name: "Turkey", calories: 135, carbs: 0, protein: 30, fat: 1 },
          { name: "Tofu", calories: 76, carbs: 2, protein: 8, fat: 4.8 },
        ],
      },
      {
        category: "Vegetables",
        icon: <FaLeaf className="text-avocadoGreen" />,
        items: [
          { name: "Broccoli", calories: 34, carbs: 7, protein: 2.8, fat: 0.4 },
          { name: "Spinach", calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4 },
          { name: "Carrots", calories: 41, carbs: 10, protein: 0.9, fat: 0.2 },
          { name: "Kale", calories: 49, carbs: 9, protein: 3.3, fat: 0.9 },
        ],
      },
      {
        category: "Grains",
        icon: <FaBreadSlice className="text-avocadoGreen" />,
        items: [
          { name: "Brown Rice", calories: 111, carbs: 23, protein: 2.7, fat: 0.9 },
          { name: "Quinoa", calories: 368, carbs: 64, protein: 14, fat: 6 },
        ],
      },
    ],
    "Evening Snack": [
      {
        category: "Fruits",
        icon: <FaAppleAlt className="text-avocadoGreen" />,
        items: [
          { name: "Banana", calories: 89, carbs: 23, protein: 1.1, fat: 0.3 },
          { name: "Apple", calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
          { name: "Orange", calories: 47, carbs: 12, protein: 0.9, fat: 0.1 },
          { name: "Grapes", calories: 69, carbs: 18, protein: 0.7, fat: 0.2 },
          { name: "Berries", calories: 57, carbs: 14, protein: 0.7, fat: 0.3 },
        ],
      },
      {
        category: "Dairy & Nuts",
        icon: <FaCheese className="text-avocadoGreen" />,
        items: [
          { name: "Almonds", calories: 579, carbs: 22, protein: 21, fat: 50 },
          { name: "Greek Yogurt", calories: 59, carbs: 4, protein: 10, fat: 0.4 },
          { name: "Cheese", calories: 402, carbs: 3, protein: 7, fat: 33 },
          { name: "Walnuts", calories: 654, carbs: 14, protein: 15, fat: 65 },
          { name: "Milk", calories: 61, carbs: 5, protein: 3, fat: 3 },
        ],
      },
    ],
    Dinner: [
      {
        category: "Proteins",
        icon: <FaDrumstickBite className="text-avocadoGreen" />,
        items: [
          { name: "Salmon", calories: 206, carbs: 0, protein: 22, fat: 13 },
          { name: "Chicken Breast", calories: 165, carbs: 0, protein: 31, fat: 3.6 },
          { name: "Beef", calories: 250, carbs: 0, protein: 26, fat: 17 },
          { name: "Eggs", calories: 155, carbs: 1, protein: 13, fat: 11 },
        ],
      },
      {
        category: "Vegetables",
        icon: <FaLeaf className="text-avocadoGreen" />,
        items: [
          { name: "Spinach", calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4 },
          { name: "Broccoli", calories: 34, carbs: 7, protein: 2.8, fat: 0.4 },
          { name: "Carrots", calories: 41, carbs: 10, protein: 0.9, fat: 0.2 },
          { name: "Tomatoes", calories: 18, carbs: 4, protein: 0.9, fat: 0.2 },
        ],
      },
      {
        category: "Grains",
        icon: <FaBreadSlice className="text-avocadoGreen" />,
        items: [
          { name: "Brown Rice", calories: 111, carbs: 23, protein: 2.7, fat: 0.9 },
          { name: "Quinoa", calories: 368, carbs: 64, protein: 14, fat: 6 },
        ],
      },
    ],
    "Morning Snack": [
      {
        category: "Fruits",
        icon: <FaAppleAlt className="text-avocadoGreen" />,
        items: [
          { name: "Banana", calories: 89, carbs: 23, protein: 1.1, fat: 0.3 },
          { name: "Apple", calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
          { name: "Orange", calories: 47, carbs: 12, protein: 0.9, fat: 0.1 },
          { name: "Grapes", calories: 69, carbs: 18, protein: 0.7, fat: 0.2 },
          { name: "Berries", calories: 57, carbs: 14, protein: 0.7, fat: 0.3 },
        ],
      },
      {
        category: "Dairy & Nuts",
        icon: <FaCheese className="text-avocadoGreen" />,
        items: [
          { name: "Almonds", calories: 579, carbs: 22, protein: 21, fat: 50 },
          { name: "Greek Yogurt", calories: 59, carbs: 4, protein: 10, fat: 0.4 },
          { name: "Cheese", calories: 402, carbs: 3, protein: 7, fat: 33 },
          { name: "Walnuts", calories: 654, carbs: 14, protein: 15, fat: 65 },
          { name: "Milk", calories: 61, carbs: 5, protein: 3, fat: 3 },
        ],
      },
    ],
    Brunch: [
      {
        category: "Proteins",
        icon: <FaDrumstickBite className="text-avocadoGreen" />,
        items: [
          { name: "Chicken Breast", calories: 165, carbs: 0, protein: 31, fat: 3.6 },
          { name: "Salmon", calories: 206, carbs: 0, protein: 22, fat: 13 },
          { name: "Turkey", calories: 135, carbs: 0, protein: 30, fat: 1 },
          { name: "Eggs", calories: 155, carbs: 1, protein: 13, fat: 11 },
        ],
      },
      {
        category: "Grains",
        icon: <FaBreadSlice className="text-avocadoGreen" />,
        items: [
          { name: "Oats", calories: 379, carbs: 66, protein: 17, fat: 7 },
          { name: "Brown Rice", calories: 111, carbs: 23, protein: 2.7, fat: 0.9 },
          { name: "Quinoa", calories: 368, carbs: 64, protein: 14, fat: 6 },
          { name: "Barley", calories: 354, carbs: 73, protein: 12, fat: 2 },
        ],
      },
      {
        category: "Dairy & Nuts",
        icon: <FaCheese className="text-avocadoGreen" />,
        items: [
          { name: "Greek Yogurt", calories: 59, carbs: 4, protein: 10, fat: 0.4 },
          { name: "Almonds", calories: 579, carbs: 22, protein: 21, fat: 50 },
        ],
      },
    ],
  };

  const foodData = foodDataByMealType[mealType] || [];

  return (
    <div className="w-full max-w-md bg-[#dbe9c9] p-6 rounded-3xl shadow-2xl border border-avocadoGreen/50 space-y-6 animate-slideInRight animate-slideOutLeft">
      <h3 className="text-xl font-bold text-center text-black">Healthy Food Selector</h3>
      <p className="text-sm text-center text-black">Select a food item to auto-fill nutritional data (per 100g)</p>
      <div className="space-y-4">
        {foodData.length === 0 ? (
          <p className="text-center text-black">Please select a meal type to see options.</p>
        ) : (
          foodData.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold text-black">
                {cat.icon} {cat.category}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => onSelect(item)}
                    className="p-3 bg-white rounded-lg border border-avocadoGreen cursor-pointer transition-transform duration-300 hover:scale-105"
                  >
                    <h5 className="font-medium text-avocadoDarkBrown">{item.name}</h5>
                    <div className="text-xs text-avocadoGreen space-y-1">
                      <p>Calories: {item.calories}</p>
                      <p>Carbs: {item.carbs}g | Protein: {item.protein}g | Fat: {item.fat}g</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthyFoodSelector;
