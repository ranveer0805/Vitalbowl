import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addMealAPI } from "../../services/meals/mealService";
import AlertMessage from "../Alert/AlertMessage";
import { FaAppleAlt, FaDrumstickBite, FaFireAlt, FaBreadSlice, FaCalendarAlt, FaUtensils, FaLeaf, FaEdit } from "react-icons/fa";
import HealthyFoodSelector from "./HealthyFoodSelector";

const validationSchema = Yup.object({
  type: Yup.string()
    .oneOf(["Breakfast","Brunch","Lunch","Evening Snack","Dinner","Morning Snack"])
    .required("Meal type is required"),
  food: Yup.string().required("Food intake is required"),
  description: Yup.string().nullable(),
  fat: Yup.number().min(0, "Invalid").required("Fat is required"),
  protein: Yup.number().min(0, "Invalid").required("Protein is required"),
  carbs: Yup.number().min(0, "Invalid").required("Carbs are required"),
  calories: Yup.number().min(0, "Invalid").required("Calories are required"),
  date: Yup.date().required("Date is required"),
});

const MealForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("");

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: addMealAPI,
    mutationKey: ["add-meal"],
  });

  const formik = useFormik({
    initialValues: { type: "", food: "", description: "", fat: "", protein: "", carbs: "", calories: "", date: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        setShowConfetti(true);
        queryClient.invalidateQueries({ queryKey: ["list-meals"] });
        setTimeout(() => navigate("/dashboard"), 1500); // Delay to show confetti
      } catch (err) {
        console.error(err);
      }
    },
  });

  // Update selectedMealType when formik type changes
  useEffect(() => {
    setSelectedMealType(formik.values.type);
  }, [formik.values.type]);

  // Handle selection from HealthyFoodSelector to autofill form fields
  const handleSelect = (item) => {
    formik.setFieldValue("food", item.name);
    formik.setFieldValue("calories", item.calories);
    formik.setFieldValue("carbs", item.carbs);
    formik.setFieldValue("protein", item.protein);
    formik.setFieldValue("fat", item.fat);
  };

  // Confetti effect on success
  useEffect(() => {
    if (isSuccess) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-avocadoCream flex justify-center items-start p-6 relative overflow-hidden text-avocadoDarkBrown">
      {/* Enhanced VitalBowl background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#E6E2C3_20%,transparent_21%)] [background-size:40px_40px] opacity-10 animate-vital pointer-events-none z-0"></div>
      {/* Enhanced floating vitality elements with bounce animation */}
      <FaLeaf className="absolute top-16 left-16 text-avocadoGreen opacity-30 animate-bounce" style={{ animationDelay: '0s' }} />
      <FaAppleAlt className="absolute top-32 right-20 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '1s' }} />
      <FaUtensils className="absolute bottom-20 left-20 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '2s' }} />
      <FaUtensils className="absolute bottom-32 right-24 text-avocadoDarkGreen opacity-25 animate-bounce" style={{ animationDelay: '3s' }} />
      <FaDrumstickBite className="absolute top-48 left-32 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '4s' }} />
      <FaBreadSlice className="absolute top-20 left-1/2 text-avocadoDarkGreen opacity-25 animate-bounce" style={{ animationDelay: '5s' }} />
      <FaFireAlt className="absolute bottom-40 right-1/3 text-avocadoDarkGreen opacity-20 animate-bounce" style={{ animationDelay: '6s' }} />
      <FaCalendarAlt className="absolute top-1/3 left-10 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '7s' }} />
      <FaLeaf className="absolute bottom-1/4 right-10 text-avocadoGreen opacity-30 animate-bounce" style={{ animationDelay: '8s' }} />
      <FaAppleAlt className="absolute top-2/3 right-1/4 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '9s' }} />
      <FaUtensils className="absolute top-10 right-10 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '10s' }} />
      <FaDrumstickBite className="absolute bottom-10 left-1/3 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '11s' }} />
      <FaBreadSlice className="absolute top-1/4 right-1/2 text-avocadoDarkGreen opacity-25 animate-bounce" style={{ animationDelay: '12s' }} />
      <FaFireAlt className="absolute bottom-1/3 left-20 text-avocadoDarkGreen opacity-20 animate-bounce" style={{ animationDelay: '13s' }} />
      <FaCalendarAlt className="absolute top-3/4 left-1/4 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '14s' }} />
      <FaLeaf className="absolute top-1/4 left-1/4 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '15s' }} />
      <FaAppleAlt className="absolute bottom-1/2 right-1/4 text-avocadoGreen opacity-15 animate-bounce" style={{ animationDelay: '16s' }} />
      <FaUtensils className="absolute top-3/4 right-1/3 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '17s' }} />
      <FaDrumstickBite className="absolute bottom-3/4 left-1/2 text-avocadoGreen opacity-15 animate-bounce" style={{ animationDelay: '18s' }} />
      <FaBreadSlice className="absolute top-1/2 left-3/4 text-avocadoDarkGreen opacity-20 animate-bounce" style={{ animationDelay: '19s' }} />
      <FaFireAlt className="absolute bottom-1/4 right-3/4 text-avocadoDarkGreen opacity-15 animate-bounce" style={{ animationDelay: '20s' }} />
      <FaCalendarAlt className="absolute top-2/3 left-1/3 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '21s' }} />
      <FaLeaf className="absolute bottom-2/3 right-1/2 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '22s' }} />
      <FaAppleAlt className="absolute top-1/3 right-2/3 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '23s' }} />
      <FaUtensils className="absolute bottom-1/3 left-2/3 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '24s' }} />
      <FaDrumstickBite className="absolute top-3/4 left-1/2 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '25s' }} />
      <FaBreadSlice className="absolute bottom-1/2 right-1/3 text-avocadoDarkGreen opacity-25 animate-bounce" style={{ animationDelay: '26s' }} />
      <FaFireAlt className="absolute top-1/4 right-1/4 text-avocadoDarkGreen opacity-20 animate-bounce" style={{ animationDelay: '27s' }} />
      <FaCalendarAlt className="absolute bottom-3/4 left-1/4 text-avocadoGreen opacity-25 animate-bounce" style={{ animationDelay: '28s' }} />
      <FaLeaf className="absolute top-2/3 right-1/3 text-avocadoGreen opacity-30 animate-bounce" style={{ animationDelay: '29s' }} />
      <FaAppleAlt className="absolute bottom-1/4 left-3/4 text-avocadoGreen opacity-20 animate-bounce" style={{ animationDelay: '30s' }} />

      <div className="flex justify-center w-full">
        <form
          onSubmit={formik.handleSubmit}
          className="relative z-10 w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-avocadoGreen/50 space-y-6 animate-fadeIn hover:shadow-avocadoGreen/20 transition-shadow duration-500"
          style={{ backgroundColor: '#E0E9C6' }}
        >
          <div className="text-center animate-slideInUp">
            <FaUtensils className="mx-auto text-5xl text-avocadoGreen mb-2 animate-pulse" />
            <h2 className="text-3xl font-extrabold text-avocadoDarkBrown drop-shadow-md inline-block animate-typing">
              Add Meal to VitalBowl
            </h2>
            <p className="text-sm text-avocadoGreen mt-1 animate-fadeIn" style={{ animationDelay: '0.5s' }}>Nourish your body, fuel your vitality</p>
          </div>

          {isLoading && <AlertMessage type="loading" message="Adding meal..." />}
          {isError && <AlertMessage type="error" message={error?.message || "Error adding meal"} />}
          {isSuccess && <AlertMessage type="success" message="Meal added successfully!" />}

          {/* Meal Type */}
          <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown">
              <FaUtensils className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Meal Type
            </label>
            <div className="relative group">
              <select {...formik.getFieldProps("type")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md">
                <option value="">Select Meal</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Brunch">Brunch</option>
                <option value="Lunch">Lunch</option>
                <option value="Evening Snack">Evening Snack</option>
                <option value="Dinner">Dinner</option>
                <option value="Morning Snack">Morning Snack</option>
              </select>
              <FaUtensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
            </div>
            {formik.touched.type && formik.errors.type && <p className="text-red-500 text-xs animate-shake">{formik.errors.type}</p>}
          </div>

          {/* Food Intake */}
          <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown">
              <FaBreadSlice className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Food Intake
            </label>
            <div className="relative group">
              <input type="text" placeholder="e.g., Oats, Rice" {...formik.getFieldProps("food")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
              <FaBreadSlice className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
            </div>
            {formik.touched.food && formik.errors.food && <p className="text-red-500 text-xs animate-shake">{formik.errors.food}</p>}
          </div>

          {/* Nutrients */}
          <div className="bg-avocadoCream/80 p-4 rounded-2xl border border-avocadoGreen shadow-inner animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-avocadoDarkBrown mb-4 text-center">Nutritional Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown" title="Track fat for healthy energy">
                  <FaAppleAlt className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Fat (g)
                </label>
                <div className="relative group">
                  <input type="number" {...formik.getFieldProps("fat")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
                  <FaAppleAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
                </div>
              </div>

              <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.5s' }}>
                <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown" title="Protein builds and repairs tissues">
                  <FaDrumstickBite className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Protein (g)
                </label>
                <div className="relative group">
                  <input type="number" {...formik.getFieldProps("protein")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
                  <FaDrumstickBite className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
                </div>
              </div>

              <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.6s' }}>
                <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown" title="Carbs provide quick energy">
                  <FaBreadSlice className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Carbs (g)
                </label>
                <div className="relative group">
                  <input type="number" {...formik.getFieldProps("carbs")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
                  <FaBreadSlice className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
                </div>
              </div>

              <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.7s' }}>
                <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown" title="Total energy from the meal">
                  <FaFireAlt className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Calories
                </label>
                <div className="relative group">
                  <input type="number" {...formik.getFieldProps("calories")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
                  <FaFireAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.8s' }}>
            <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown">
              <FaEdit className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Description
            </label>
            <div className="relative group">
              <textarea placeholder="Add notes about this meal (optional)" {...formik.getFieldProps("description")} rows={3} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
              <FaEdit className="absolute left-3 top-4 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.9s' }}>
            <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown" title="Select the date of your meal">
              <FaCalendarAlt className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Date
            </label>
            <div className="relative group">
              <input type="date" {...formik.getFieldProps("date")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
            </div>
            {formik.touched.date && formik.errors.date && <p className="text-red-500 text-xs animate-shake">{formik.errors.date}</p>}
          </div>

          <button type="submit" className="w-full bg-avocadoGreen hover:bg-avocadoDarkGreen text-white font-bold py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Add Meal 🍲
          </button>
        </form>
      </div>

      <div className="mt-10 max-w-md mx-auto">
        {selectedMealType && (
          <HealthyFoodSelector mealType={selectedMealType} onSelect={handleSelect} />
        )}
      </div>

      {/* Confetti Effect - Moved outside form to cover screen */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-avocadoGreen to-avocadoCream rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes vital-move {
          0% { background-position: 0 0; }
          50% { background-position: 20px 20px; }
          100% { background-position: 0 0; }
        }
        .animate-vital { animation: vital-move 12s linear infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out; }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-typing {
          display: inline-block;
          overflow: hidden;
          border-right: 2px solid;
          white-space: nowrap;
          animation: typing 2s steps(20, end) forwards, blink-caret 0.75s step-end 5 forwards;
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: currentColor; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }

        @keyframes confetti {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti 3s ease-out forwards; }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight { animation: slideInRight 0.7s ease-out; }
      `}</style>
    </div>
  );
};

export default MealForm;
