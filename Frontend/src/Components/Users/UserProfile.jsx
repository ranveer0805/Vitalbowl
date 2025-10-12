import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUserCircle, FaCalendarAlt, FaVenusMars, FaRulerVertical, FaWeight, FaUtensils, FaEdit, FaTrash } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi"; // Added icon for BMI display
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";
import { deleteProfileAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ get user info from redux or fallback to localStorage
  const { user } = useSelector((state) => state.auth) || {};
  const initialUserInfo = user || JSON.parse(localStorage.getItem("userInfo"));
  const [displayUser, setDisplayUser] = useState(initialUserInfo);

  // New state for controlling delete confirmation modal visibility
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setDisplayUser(initialUserInfo);
  }, [initialUserInfo]);

  // Delete profile mutation
  const {
    mutateAsync: deleteProfile,
    isPending: deletePending,
    isError: deleteError,
    error: deleteErrorMsg,
    isSuccess: deleteSuccess,
  } = useMutation({
    mutationFn: deleteProfileAPI,
    mutationKey: ["delete-profile"],
    onSuccess: () => {
      dispatch(logoutAction());
      localStorage.removeItem("userInfo");
      navigate("/");
    },
  });

  // Function to calculate BMI from height (cm) and weight (kg)
  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  // Function to classify BMI value according to the chart
  const getBMIClassification = (bmi) => {
    if (!bmi) return "";
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return "Under Weight";
    if (bmiNum >= 18.5 && bmiNum <= 24.9) return "Normal Weight";
    if (bmiNum >= 25 && bmiNum <= 29.9) return "Over Weight";
    if (bmiNum >= 30 && bmiNum <= 34.9) return "Obesity Class 1";
    if (bmiNum >= 35 && bmiNum <= 39.9) return "Obesity Class 2";
    if (bmiNum >= 40) return "Obesity Class 3";
    return "";
  };

  const bmiValue = calculateBMI(displayUser?.height, displayUser?.weight);
  const bmiClassification = getBMIClassification(bmiValue);

  // Handler for confirming delete profile
  const handleConfirmDelete = () => {
    deleteProfile({ token: displayUser?.token });
    setShowDeleteConfirm(false);
  };

  // Handler for canceling delete profile
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-avocadoCream flex flex-col items-center px-4 py-10 overflow-hidden text-avocadoDarkBrown animate-fadeIn">
      {/* VitalBowl animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#ECFDF5_20%,transparent_21%)] [background-size:40px_40px] opacity-10 animate-vital"></div>

      <div className="relative w-full max-w-3xl bg-[#dbe9c6] backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-avocadoLightGreen z-10 space-y-8 animate-slideInUp">
        {/* Profile Picture Placeholder */}
        <div className="flex justify-center animate-slideInUp" style={{ animationDelay: '0.2s' }}>
          <FaUserCircle size={80} className="text-avocadoGreen rounded-full bg-white p-2 shadow-lg border-4 border-avocadoLightGreen" />
        </div>

        <h1 className="text-3xl font-extrabold text-avocadoDarkGreen text-center drop-shadow-md animate-slideInUp" style={{ animationDelay: '0.3s' }}>
          Your VitalBowl Profile 🥗
        </h1>

        {/* ------------------ Display User Info ------------------ */}
        {displayUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen flex items-center gap-3 hover:shadow-lg transition-shadow duration-300">
              <FaUserCircle className="text-avocadoGreen text-xl" />
              <div>
                <p className="text-sm text-avocadoDarkBrown font-semibold">Username</p>
                <p className="text-lg text-avocadoDarkGreen">{displayUser.username || "No Name"}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen flex items-center gap-3 hover:shadow-lg transition-shadow duration-300">
              <FaEnvelope className="text-avocadoGreen text-xl" />
              <div>
                <p className="text-sm text-avocadoDarkBrown font-semibold">Email</p>
                <p className="text-lg text-avocadoDarkGreen">{displayUser.email || "No Email"}</p>
              </div>
            </div>
            {displayUser.age && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen flex items-center gap-3 hover:shadow-lg transition-shadow duration-300">
                <FaCalendarAlt className="text-avocadoGreen text-xl" />
                <div>
                  <p className="text-sm text-avocadoDarkBrown font-semibold">Age</p>
                  <p className="text-lg text-avocadoDarkGreen">{displayUser.age}</p>
                </div>
              </div>
            )}
            {displayUser.gender && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen flex items-center gap-3 hover:shadow-lg transition-shadow duration-300">
                <FaVenusMars className="text-avocadoGreen text-xl" />
                <div>
                  <p className="text-sm text-avocadoDarkBrown font-semibold">Gender</p>
                  <p className="text-lg text-avocadoDarkGreen">{displayUser.gender}</p>
                </div>
              </div>
            )}
            {displayUser.height && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen flex items-center gap-3 hover:shadow-lg transition-shadow duration-300">
                <FaRulerVertical className="text-avocadoGreen text-xl" />
                <div>
                  <p className="text-sm text-avocadoDarkBrown font-semibold">Height</p>
                  <p className="text-lg text-avocadoDarkGreen">{displayUser.height} cm</p>
                </div>
              </div>
            )}
            {displayUser.weight && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen flex items-center gap-3 hover:shadow-lg transition-shadow duration-300">
                <FaWeight className="text-avocadoGreen text-xl" />
                <div>
                  <p className="text-sm text-avocadoDarkBrown font-semibold">Weight</p>
                  <p className="text-lg text-avocadoDarkGreen">{displayUser.weight} kg</p>
                </div>
              </div>
            )}
            {displayUser.diet && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen flex items-center gap-3 hover:shadow-lg transition-shadow duration-300">
                <FaUtensils className="text-avocadoGreen text-xl" />
                <div>
                  <p className="text-sm text-avocadoDarkBrown font-semibold">Diet</p>
                  <p className="text-lg text-avocadoDarkGreen">{displayUser.diet}</p>
                </div>
              </div>
            )}
            {bmiValue && (
              <div className="bg-white p-4 rounded-lg shadow-md border border-avocadoLightGreen hover:shadow-lg transition-shadow duration-300 md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <GiWeightLiftingUp className="text-avocadoGreen text-xl" />
                  <div>
                    <p className="text-sm text-avocadoDarkBrown font-semibold">BMI</p>
                    <p className="text-lg text-avocadoDarkGreen">{bmiValue} {bmiClassification && `(${bmiClassification})`}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      bmiClassification === "Normal Weight" ? "bg-green-500" :
                      bmiClassification === "Under Weight" ? "bg-blue-500" :
                      bmiClassification === "Over Weight" ? "bg-yellow-500" :
                      bmiClassification.includes("Obesity") ? "bg-red-500" : "bg-gray-400"
                    }`}
                    style={{ width: `${Math.min(Math.max((parseFloat(bmiValue) - 15) / (40 - 15) * 100, 0), 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}

        {deletePending && <AlertMessage type="loading" message="Deleting profile..." />}
        {deleteError && (
          <AlertMessage
            type="error"
            message={deleteErrorMsg?.response?.data?.message || "Error deleting profile"}
          />
        )}
        {deleteSuccess && (
          <AlertMessage type="success" message="Profile deleted successfully!" />
        )}

        {/* ------------------ Update Profile Button ------------------ */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => navigate("/update-profile")}
            className="flex-1 bg-avocadoGreen hover:bg-avocadoDarkGreen text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaEdit /> Update Profile
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaTrash /> Delete Profile
          </button>
        </div>

        {/* Custom Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 space-y-6 text-avocadoDarkBrown border border-avocadoLightGreen mx-4 animate-fadeInScale">
              <h2 className="text-2xl font-extrabold text-center">Confirm Delete Profile</h2>
              <p className="text-md text-avocadoGreen">
                Are you sure you want to delete your profile? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-6 mt-6">
                <button
                  onClick={handleCancelDelete}
                  className="px-6 py-3 rounded-lg bg-avocadoLightGreen text-avocadoDarkBrown font-semibold hover:bg-avocadoGreen transition-shadow shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-shadow shadow-md hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeInScale {
            animation: fadeInScale 0.3s ease forwards;
          }
        `}</style>

      </div>

      {/* VitalBowl animation CSS */}
      <style>{`
        @keyframes vital-move {
          0% { background-position: 0 0; }
          50% { background-position: 20px 20px; }
          100% { background-position: 0 0; }
        }
        .animate-vital {
          animation: vital-move 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
