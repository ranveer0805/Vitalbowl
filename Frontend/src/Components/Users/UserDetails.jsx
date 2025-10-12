import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaVenusMars, FaRulerVertical, FaWeight, FaUtensils } from "react-icons/fa";
import { updateUserDetailsAPI, updateUserDetailsByEmailAPI } from "../../services/users/userServices";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

//! Validations
const validationSchema = Yup.object({
  age: Yup.number().required("Age is required").min(1).max(120),
  gender: Yup.string().required("Gender is required"),
  height: Yup.number().required("Height is required").min(50).max(250),
  weight: Yup.number().required("Weight is required").min(20).max(300),
  diet: Yup.string().required("Diet preference is required"),
});

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutateAsync: updateWithToken, isLoading: loadingToken, isError: errorToken, error: errToken } = useMutation({
    mutationFn: updateUserDetailsAPI,
    mutationKey: ["update-details"],
  });

  const { mutateAsync: updateWithEmail, isLoading: loadingEmail, isError: errorEmail, error: errEmail } = useMutation({
    mutationFn: updateUserDetailsByEmailAPI,
    mutationKey: ["update-details-email"],
  });

  const isLoading = loadingToken || loadingEmail;
  const isError = errorToken || errorEmail;
  const error = errToken || errEmail;

  const formik = useFormik({
    initialValues: {
      age: "",
      gender: "",
      height: "",
      weight: "",
      diet: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (user?.token) {
          // Logged in user (e.g., incomplete profile)
          await updateWithToken({ ...values, token: user.token });
          dispatch(logoutAction());
          setShowSuccess(true);
          setTimeout(() => navigate("/login"), 7000);
        } else {
          // New user after registration
          const email = localStorage.getItem('newUserEmail');
          if (!email) {
            alert("No email found. Please register again.");
            navigate("/register");
            return;
          }
          await updateWithEmail({ email, ...values });
          localStorage.removeItem('newUserEmail');
          setShowSuccess(true);
          setTimeout(() => navigate("/login"), 7000);
        }
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    if (user?.detailsCompleted) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-avocadoCream flex justify-center items-center">
        <div className="text-center">
          <FaUser className="mx-auto text-6xl text-avocadoGreen mb-4" />
          <h2 className="text-3xl font-bold text-avocadoDarkBrown mb-2">Details Saved Successfully!</h2>
          <p className="text-avocadoGreen">Please log in to continue to your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-avocadoCream flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg relative z-10">
        <div className="text-center mb-6">
          <FaUser className="mx-auto text-4xl text-avocadoGreen mb-2" />
          <h2 className="text-2xl font-bold text-avocadoDarkBrown">Complete Your Profile</h2>
          <p className="text-avocadoGreen">Please provide your details</p>
        </div>

        {isLoading && <AlertMessage type="loading" message="Saving details..." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || "Failed to save details"} />
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">
              <FaUser className="inline mr-1 text-avocadoGreen" /> Age
            </label>
            <input
              type="number"
              {...formik.getFieldProps("age")}
              className="w-full p-3 border border-avocadoGreen rounded-lg focus:ring-2 focus:ring-avocadoGreen focus:border-avocadoGreen"
              placeholder="Enter your age"
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.age}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">
              <FaVenusMars className="inline mr-1 text-avocadoGreen" /> Gender
            </label>
            <select
              {...formik.getFieldProps("gender")}
              className="w-full p-3 border border-avocadoGreen rounded-lg focus:ring-2 focus:ring-avocadoGreen focus:border-avocadoGreen"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.gender}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">
              <FaRulerVertical className="inline mr-1 text-avocadoGreen" /> Height (cm)
            </label>
            <input
              type="number"
              {...formik.getFieldProps("height")}
              className="w-full p-3 border border-avocadoGreen rounded-lg focus:ring-2 focus:ring-avocadoGreen focus:border-avocadoGreen"
              placeholder="Enter your height"
            />
            {formik.touched.height && formik.errors.height && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.height}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">
              <FaWeight className="inline mr-1 text-avocadoGreen" /> Weight (kg)
            </label>
            <input
              type="number"
              {...formik.getFieldProps("weight")}
              className="w-full p-3 border border-avocadoGreen rounded-lg focus:ring-2 focus:ring-avocadoGreen focus:border-avocadoGreen"
              placeholder="Enter your weight"
            />
            {formik.touched.weight && formik.errors.weight && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.weight}</p>
            )}
          </div>

          {/* Diet */}
          <div>
            <label className="block text-sm font-medium text-avocadoDarkBrown mb-1">
              <FaUtensils className="inline mr-1 text-avocadoGreen" /> Diet Preference
            </label>
            <select
              {...formik.getFieldProps("diet")}
              className="w-full p-3 border border-avocadoGreen rounded-lg focus:ring-2 focus:ring-avocadoGreen focus:border-avocadoGreen"
            >
              <option value="">Select Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
            {formik.touched.diet && formik.errors.diet && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.diet}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-avocadoGreen hover:bg-avocadoDarkGreen text-white font-bold py-3 rounded-lg transition-colors"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
