import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAppleAlt, FaDrumstickBite, FaFireAlt, FaBreadSlice, FaCalendarAlt, FaUtensils, FaLeaf } from "react-icons/fa";

// Auth components
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import UserDetails from "./Components/Users/UserDetails";
import AuthRoute from "./Components/Auth/AuthRoute";

// Navbar
import PrivateNavbar from "./Components/Navbar/PrivateNavbar";
import PublicNavbar from "./Components/Navbar/PublicNavbar";

// Pages
import Dashboard from "./Components/Users/Dashboard";
import UserProfile from "./Components/Users/UserProfile";
import UserUpdateProfile from "./Components/Users/UserUpdateProfile";
import HeroSection from "./Components/Home/Home/HomePage";

// Goals
import AddGoal from "./Components/Goals/AddGoal";
import GoalsList from "./Components/Goals/GoalsList";
import UpdateGoal from "./Components/Goals/UpdateGoal";

// Meals
import MealForm from "./Components/Meals/MealForm";
import UpdateMeal from "./Components/Meals/UpdateMeal";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-avocadoCream text-avocadoDarkBrown relative overflow-hidden">
      {/* VitalBowl background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#B4C99C_20%,transparent_21%)] [background-size:40px_40px] opacity-10 animate-vital z-0"></div>
      {/* Floating vitality elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FaLeaf className="absolute top-16 left-16 text-avocadoLightGreen opacity-30 animate-float" style={{ animationDelay: '0s' }} />
        <FaAppleAlt className="absolute top-32 right-20 text-avocadoGreen opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <FaUtensils className="absolute bottom-20 left-20 text-avocadoDarkGreen opacity-25 animate-float" style={{ animationDelay: '2s' }} />
        <FaUtensils className="absolute bottom-32 right-24 text-avocadoDarkGreen opacity-25 animate-float" style={{ animationDelay: '3s' }} />
        <FaDrumstickBite className="absolute top-48 left-32 text-avocadoDarkBrown opacity-20 animate-float" style={{ animationDelay: '4s' }} />
        <FaBreadSlice className="absolute top-20 left-1/2 text-avocadoLightGreen opacity-25 animate-float" style={{ animationDelay: '5s' }} />
        <FaFireAlt className="absolute bottom-40 right-1/3 text-avocadoDarkBrown opacity-20 animate-float" style={{ animationDelay: '6s' }} />
        <FaCalendarAlt className="absolute top-1/3 left-10 text-avocadoGreen opacity-25 animate-float" style={{ animationDelay: '7s' }} />
        <FaLeaf className="absolute bottom-1/4 right-10 text-avocadoLightGreen opacity-30 animate-float" style={{ animationDelay: '8s' }} />
        <FaAppleAlt className="absolute top-2/3 right-1/4 text-avocadoGreen opacity-20 animate-float" style={{ animationDelay: '9s' }} />
        <FaUtensils className="absolute top-10 right-10 text-avocadoDarkGreen opacity-25 animate-float" style={{ animationDelay: '10s' }} />
        <FaDrumstickBite className="absolute bottom-10 left-1/3 text-avocadoDarkBrown opacity-20 animate-float" style={{ animationDelay: '11s' }} />
        <FaBreadSlice className="absolute top-1/4 right-1/2 text-avocadoLightGreen opacity-25 animate-float" style={{ animationDelay: '12s' }} />
        <FaFireAlt className="absolute bottom-1/3 left-20 text-avocadoDarkBrown opacity-20 animate-float" style={{ animationDelay: '13s' }} />
        <FaCalendarAlt className="absolute top-3/4 left-1/4 text-avocadoGreen opacity-25 animate-float" style={{ animationDelay: '14s' }} />
        <FaLeaf className="absolute top-1/4 left-1/4 text-avocadoLightGreen opacity-25 animate-float" style={{ animationDelay: '15s' }} />
        <FaAppleAlt className="absolute bottom-1/2 right-1/4 text-avocadoGreen opacity-15 animate-float" style={{ animationDelay: '16s' }} />
        <FaUtensils className="absolute top-3/4 right-3/4 text-avocadoDarkGreen opacity-20 animate-float" style={{ animationDelay: '17s' }} />
        <FaDrumstickBite className="absolute bottom-3/4 left-1/2 text-avocadoDarkBrown opacity-15 animate-float" style={{ animationDelay: '18s' }} />
        <FaBreadSlice className="absolute top-2/3 right-1/4 text-avocadoLightGreen opacity-20 animate-float" style={{ animationDelay: '19s' }} />
        <FaFireAlt className="absolute bottom-3/4 right-1/3 text-avocadoDarkBrown opacity-15 animate-float" style={{ animationDelay: '20s' }} />
        <FaCalendarAlt className="absolute top-1/4 left-1/2 text-avocadoGreen opacity-20 animate-float" style={{ animationDelay: '21s' }} />
      </div>

      <BrowserRouter>
        {user ? (
          <div className="flex relative z-10">
            <PrivateNavbar />
            <main className="flex-1 ml-64">
              <Routes>
                {/* Dashboard & Profile */}
                <Route
                  path="/dashboard"
                  element={
                    <AuthRoute>
                      <Dashboard />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <AuthRoute>
                      <UserProfile />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/update-profile"
                  element={
                    <AuthRoute>
                      <UserUpdateProfile />
                    </AuthRoute>
                  }
                />

                {/* Goals */}
                <Route
                  path="/add-goal"
                  element={
                    <AuthRoute>
                      <AddGoal />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <AuthRoute>
                      <GoalsList />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/update-goal/:id"
                  element={
                    <AuthRoute>
                      <UpdateGoal />
                    </AuthRoute>
                  }
                />

                {/* Meals */}
                <Route
                  path="/add-meal"
                  element={
                    <AuthRoute>
                      <MealForm />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/update-meal/:id"
                  element={
                    <AuthRoute>
                      <UpdateMeal />
                    </AuthRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
          </div>
        ) : (
          <>
            <PublicNavbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HeroSection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user-details" element={<UserDetails />} />

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </BrowserRouter>

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
      `}</style>
    </div>
  );
}

export default App;
