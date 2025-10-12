import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUserCircle, FaCalendarAlt, FaVenusMars, FaRulerVertical, FaWeight, FaUtensils, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateProfileAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { updateUserAction } from "../../redux/slice/authSlice";

const UserUpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ get user info from redux or fallback to localStorage
  const { user } = useSelector((state) => state.auth) || {};
  const initialUserInfo = user || JSON.parse(localStorage.getItem("vitalbowl_user"));
  const [displayUser, setDisplayUser] = useState(initialUserInfo);

  useEffect(() => {
    setDisplayUser(initialUserInfo);
  }, [initialUserInfo]);

  // Update profile mutation
  const {
    mutateAsync: updateProfile,
    isPending: profilePending,
    isError: profileError,
    error: profileErrorMsg,
    isSuccess: profileSuccess,
  } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update-profile"],
  });

  // Formik for profile update (pre-filled with current user info)
  const profileFormik = useFormik({
    initialValues: {
      username: displayUser?.username || "",
      email: displayUser?.email || "",
      age: displayUser?.age || "",
      gender: displayUser?.gender || "",
      height: displayUser?.height || "",
      weight: displayUser?.weight || "",
      diet: displayUser?.diet || "",
    },
    enableReinitialize: true, // ✅ makes sure values update if displayUser changes
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      age: Yup.number().required("Age is required").min(1).max(120),
      gender: Yup.string().required("Gender is required"),
      height: Yup.number().required("Height is required").min(50).max(250),
      weight: Yup.number().required("Weight is required").min(20).max(300),
      diet: Yup.string().required("Diet is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await updateProfile({ ...values, token: displayUser?.token });
        const updatedInfo = { ...displayUser, ...response.updatedUser };
        setDisplayUser(updatedInfo);
        dispatch(updateUserAction(updatedInfo));
        localStorage.setItem("vitalbowl_user", JSON.stringify(updatedInfo));
        navigate("/profile"); // Navigate back to profile page after update
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="relative w-full min-h-screen bg-avocadoCream flex flex-col items-center px-4 py-10 overflow-hidden text-avocadoDarkBrown animate-fadeIn">
      {/* VitalBowl animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#E6E2C3_20%,transparent_21%)] [background-size:40px_40px] opacity-10 animate-vital pointer-events-none z-0"></div>

      <div className="relative w-full max-w-3xl bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-avocadoLightGreen z-10 space-y-8 animate-slideInUp">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="bg-avocadoGreen hover:bg-avocadoDarkGreen text-white p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <FaArrowLeft />
          </button>
          <h1 className="flex-1 text-center text-3xl font-extrabold text-avocadoDarkGreen drop-shadow-md animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Update Profile 🥗
          </h1>
        </div>

        {/* ------------------ Update Profile Form ------------------ */}
        <div className="space-y-4 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          {profilePending && <AlertMessage type="loading" message="Updating profile..." />}
          {profileError && (
            <AlertMessage
              type="error"
              message={profileErrorMsg?.response?.data?.message || "Error"}
            />
          )}
          {profileSuccess && (
            <AlertMessage type="success" message="Profile updated successfully!" />
          )}

          <form onSubmit={profileFormik.handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">Username</label>
              <div className="flex items-center border border-avocadoGreen rounded-lg bg-avocadoCream py-2 px-3 focus-within:ring-2 focus-within:ring-avocadoGreen">
                <FaUserCircle className="text-avocadoGreen mr-2" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  {...profileFormik.getFieldProps("username")}
                  className="flex-1 bg-avocadoCream outline-none text-avocadoDarkBrown placeholder-avocadoGreen"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">Email Address</label>
              <div className="flex items-center border border-avocadoGreen rounded-lg bg-avocadoCream py-2 px-3 focus-within:ring-2 focus-within:ring-avocadoGreen">
                <FaEnvelope className="text-avocadoGreen mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  {...profileFormik.getFieldProps("email")}
                  className="flex-1 bg-avocadoCream outline-none text-avocadoDarkBrown placeholder-avocadoGreen"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">Age</label>
              <div className="flex items-center border border-avocadoGreen rounded-lg bg-avocadoCream py-2 px-3 focus-within:ring-2 focus-within:ring-avocadoGreen">
                <FaCalendarAlt className="text-avocadoGreen mr-2" />
                <input
                  type="number"
                  placeholder="Enter your age"
                  {...profileFormik.getFieldProps("age")}
                  className="flex-1 bg-avocadoCream outline-none text-avocadoDarkBrown placeholder-avocadoGreen"
                />
              </div>
              {profileFormik.touched.age && profileFormik.errors.age && (
                <span className="text-xs text-red-500">{profileFormik.errors.age}</span>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">Gender</label>
              <div className="flex items-center border border-avocadoGreen rounded-lg bg-avocadoCream py-2 px-3 focus-within:ring-2 focus-within:ring-avocadoGreen">
                <FaVenusMars className="text-avocadoGreen mr-2" />
                <select
                  {...profileFormik.getFieldProps("gender")}
                  className="flex-1 bg-avocadoCream outline-none text-avocadoDarkBrown"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {profileFormik.touched.gender && profileFormik.errors.gender && (
                <span className="text-xs text-red-500">{profileFormik.errors.gender}</span>
              )}
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">Height (cm)</label>
              <div className="flex items-center border border-avocadoGreen rounded-lg bg-avocadoCream py-2 px-3 focus-within:ring-2 focus-within:ring-avocadoGreen">
                <FaRulerVertical className="text-avocadoGreen mr-2" />
                <input
                  type="number"
                  placeholder="Enter your height in cm"
                  {...profileFormik.getFieldProps("height")}
                  className="flex-1 bg-avocadoCream outline-none text-avocadoDarkBrown placeholder-avocadoGreen"
                />
              </div>
              {profileFormik.touched.height && profileFormik.errors.height && (
                <span className="text-xs text-red-500">{profileFormik.errors.height}</span>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">Weight (kg)</label>
              <div className="flex items-center border border-avocadoGreen rounded-lg bg-avocadoCream py-2 px-3 focus-within:ring-2 focus-within:ring-avocadoGreen">
                <FaWeight className="text-avocadoGreen mr-2" />
                <input
                  type="number"
                  placeholder="Enter your weight in kg"
                  {...profileFormik.getFieldProps("weight")}
                  className="flex-1 bg-avocadoCream outline-none text-avocadoDarkBrown placeholder-avocadoGreen"
                />
              </div>
              {profileFormik.touched.weight && profileFormik.errors.weight && (
                <span className="text-xs text-red-500">{profileFormik.errors.weight}</span>
              )}
            </div>

            {/* Diet */}
            <div>
              <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">Diet Preference</label>
              <div className="flex items-center border border-avocadoGreen rounded-lg bg-avocadoCream py-2 px-3 focus-within:ring-2 focus-within:ring-avocadoGreen">
                <FaUtensils className="text-avocadoGreen mr-2" />
                <select
                  {...profileFormik.getFieldProps("diet")}
                  className="flex-1 bg-avocadoCream outline-none text-avocadoDarkBrown"
                >
                  <option value="">Select Diet</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>
              {profileFormik.touched.diet && profileFormik.errors.diet && (
                <span className="text-xs text-red-500">{profileFormik.errors.diet}</span>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-avocadoGreen to-avocadoLightGreen hover:from-avocadoDarkGreen hover:to-avocadoGreen text-white font-bold py-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

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

export default UserUpdateProfile;
