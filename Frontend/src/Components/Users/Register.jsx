// import { useMutation } from "@tanstack/react-query";
// import { useFormik } from "formik";
// import React, { useEffect } from "react";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { registerAPI } from "../../services/users/userServices";
// import AlertMessage from "../Alert/AlertMessage";

// //! Validations
// const validationSchema = Yup.object({
//   username: Yup.string().required("Username is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm your password"),
// });

// const RegistrationForm = () => {
//   const navigate = useNavigate();

//   const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
//     mutationFn: registerAPI,
//     mutationKey: ["register"],
//   });

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       mutateAsync(values)
//         .then(() => console.log("Registration Success"))
//         .catch((e) => console.log(e));
//     },
//   });

//   // Redirect on successful registration after 2 seconds
//   useEffect(() => {
//     if (isSuccess) {
//       const timer = setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [isSuccess, navigate]);

//   return (
//     <div className="relative bg-yellow-100 min-h-screen flex items-center justify-center px-4 overflow-hidden text-yellow-900">
//       {/* Honeycomb animated background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#fcd34d_20%,transparent_21%)] [background-size:40px_40px] opacity-20 animate-honeycomb"></div>

//       <form
//         onSubmit={formik.handleSubmit}
//         className="relative max-w-md w-full bg-yellow-50 p-8 rounded-3xl shadow-2xl border border-yellow-400 z-10 space-y-6"
//       >
//         <h2 className="text-3xl font-extrabold text-yellow-700 text-center drop-shadow-md">
//           Sign Up
//         </h2>

//         {isLoading && <AlertMessage type="loading" message="Registering..." />}
//         {isError && (
//           <AlertMessage type="error" message={error.response?.data?.message} />
//         )}
//         {isSuccess && (
//           <AlertMessage
//             type="success"
//             message="Registration Success! Redirecting..."
//           />
//         )}

//         {/* Username */}
//         <div className="relative">
//           <FaUser className="absolute top-3 left-3 text-yellow-700" />
//           <input
//             type="text"
//             placeholder="Username"
//             {...formik.getFieldProps("username")}
//             className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
//           />
//           {formik.touched.username && formik.errors.username && (
//             <span className="text-xs text-red-500">{formik.errors.username}</span>
//           )}
//         </div>

//         {/* Email */}
//         <div className="relative">
//           <FaEnvelope className="absolute top-3 left-3 text-yellow-700" />
//           <input
//             type="email"
//             placeholder="Email"
//             {...formik.getFieldProps("email")}
//             className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
//           />
//           {formik.touched.email && formik.errors.email && (
//             <span className="text-xs text-red-500">{formik.errors.email}</span>
//           )}
//         </div>

//         {/* Password */}
//         <div className="relative">
//           <FaLock className="absolute top-3 left-3 text-yellow-700" />
//           <input
//             type="password"
//             placeholder="Password"
//             {...formik.getFieldProps("password")}
//             className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
//           />
//           {formik.touched.password && formik.errors.password && (
//             <span className="text-xs text-red-500">{formik.errors.password}</span>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="relative">
//           <FaLock className="absolute top-3 left-3 text-yellow-700" />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             {...formik.getFieldProps("confirmPassword")}
//             className="pl-10 pr-4 py-2 w-full rounded-lg border border-yellow-400 bg-yellow-100 text-yellow-900 focus:border-yellow-500 focus:ring-yellow-500"
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <span className="text-xs text-red-500">
//               {formik.errors.confirmPassword}
//             </span>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-full shadow-lg transition transform hover:-translate-y-1"
//         >
//           Join the Hive 🐝
//         </button>
//       </form>

//       <style>{`
//         @keyframes honeycomb-move {
//           0% { background-position: 0 0; }
//           50% { background-position: 20px 20px; }
//           100% { background-position: 0 0; }
//         }
//         .animate-honeycomb {
//           animation: honeycomb-move 10s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RegistrationForm;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock, FaUser, FaLeaf, FaAppleAlt, FaUtensils, FaDrumstickBite, FaBreadSlice, FaFireAlt, FaCalendarAlt } from "react-icons/fa";
import { registerAPI } from "../../services/users/userServices";
import { loginAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

//! Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(false);

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        localStorage.setItem('newUserEmail', values.email);
        setShowConfetti(true);
        setTimeout(() => navigate("/user-details"), 1500); // Delay to show confetti
      } catch (e) {
        console.error(e);
      }
    },
  });

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#ECFDF5_20%,transparent_21%)] [background-size:40px_40px] opacity-10 animate-vital pointer-events-none z-0"></div>
      {/* Enhanced floating vitality elements with float animation */}
      <FaLeaf className="absolute top-16 left-16 text-emerald-300 opacity-30 animate-float" style={{ animationDelay: '0s' }} />
      <FaUser className="absolute top-32 right-20 text-blue-300 opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      <FaUtensils className="absolute bottom-20 left-20 text-lime-400 opacity-25 animate-float" style={{ animationDelay: '2s' }} />
      <FaEnvelope className="absolute bottom-32 right-24 text-teal-400 opacity-25 animate-float" style={{ animationDelay: '3s' }} />
      <FaDrumstickBite className="absolute top-48 left-32 text-red-300 opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      <FaBreadSlice className="absolute top-20 left-1/2 text-yellow-300 opacity-25 animate-float" style={{ animationDelay: '5s' }} />
      <FaFireAlt className="absolute bottom-40 right-1/3 text-red-300 opacity-20 animate-float" style={{ animationDelay: '6s' }} />
      <FaCalendarAlt className="absolute top-1/3 left-10 text-green-300 opacity-25 animate-float" style={{ animationDelay: '7s' }} />
      <FaLeaf className="absolute bottom-1/4 right-10 text-emerald-400 opacity-30 animate-float" style={{ animationDelay: '8s' }} />
      <FaUser className="absolute top-2/3 right-1/4 text-blue-400 opacity-20 animate-float" style={{ animationDelay: '9s' }} />
      <FaUtensils className="absolute top-10 right-10 text-lime-300 opacity-25 animate-float" style={{ animationDelay: '10s' }} />
      <FaEnvelope className="absolute bottom-10 left-1/3 text-teal-400 opacity-20 animate-float" style={{ animationDelay: '11s' }} />
      <FaBreadSlice className="absolute top-1/4 right-1/2 text-yellow-400 opacity-25 animate-float" style={{ animationDelay: '12s' }} />
      <FaFireAlt className="absolute bottom-1/3 left-20 text-red-400 opacity-20 animate-float" style={{ animationDelay: '13s' }} />
      <FaCalendarAlt className="absolute top-3/4 left-1/4 text-green-400 opacity-25 animate-float" style={{ animationDelay: '14s' }} />
      <FaLeaf className="absolute top-1/4 left-1/4 text-emerald-200 opacity-25 animate-float" style={{ animationDelay: '15s' }} />
      <FaUser className="absolute bottom-1/2 right-1/4 text-blue-200 opacity-15 animate-float" style={{ animationDelay: '16s' }} />
      <FaUtensils className="absolute top-3/4 right-1/3 text-lime-200 opacity-20 animate-float" style={{ animationDelay: '17s' }} />
      <FaEnvelope className="absolute bottom-3/4 left-1/2 text-teal-200 opacity-15 animate-float" style={{ animationDelay: '18s' }} />
      <FaBreadSlice className="absolute top-1/2 left-3/4 text-yellow-200 opacity-20 animate-float" style={{ animationDelay: '19s' }} />
      <FaFireAlt className="absolute bottom-1/4 right-3/4 text-red-200 opacity-15 animate-float" style={{ animationDelay: '20s' }} />
      <FaCalendarAlt className="absolute top-2/3 left-1/3 text-green-200 opacity-20 animate-float" style={{ animationDelay: '21s' }} />
      <FaLeaf className="absolute bottom-2/3 right-1/2 text-emerald-300 opacity-25 animate-float" style={{ animationDelay: '22s' }} />
      <FaUser className="absolute top-1/3 right-2/3 text-blue-300 opacity-20 animate-float" style={{ animationDelay: '23s' }} />
      <FaUtensils className="absolute bottom-1/3 left-2/3 text-lime-300 opacity-25 animate-float" style={{ animationDelay: '24s' }} />
      <FaEnvelope className="absolute top-3/4 left-1/2 text-teal-300 opacity-20 animate-float" style={{ animationDelay: '25s' }} />
      <FaBreadSlice className="absolute bottom-1/2 right-1/3 text-yellow-300 opacity-25 animate-float" style={{ animationDelay: '26s' }} />
      <FaFireAlt className="absolute top-1/4 right-1/4 text-red-300 opacity-20 animate-float" style={{ animationDelay: '27s' }} />
      <FaCalendarAlt className="absolute bottom-3/4 left-1/4 text-green-300 opacity-25 animate-float" style={{ animationDelay: '28s' }} />
      <FaLeaf className="absolute top-2/3 right-1/3 text-emerald-400 opacity-30 animate-float" style={{ animationDelay: '29s' }} />
      <FaUser className="absolute bottom-1/4 left-3/4 text-blue-400 opacity-20 animate-float" style={{ animationDelay: '30s' }} />

      <form
        onSubmit={formik.handleSubmit}
        className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-avocadoLightGreen space-y-6 animate-fadeIn hover:shadow-avocadoGreen/20 transition-shadow duration-500"
      >
        <div className="text-center animate-slideInUp">
          <FaUser className="mx-auto text-5xl text-avocadoGreen mb-2 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-avocadoDarkBrown drop-shadow-md inline-block animate-typing">
            Join VitalBowl
          </h2>
          <p className="text-sm text-avocadoGreen mt-1 animate-fadeIn" style={{ animationDelay: '0.5s' }}>Start your journey to better health</p>
        </div>

        {isLoading && <AlertMessage type="loading" message="Registering..." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || "Registration failed"} />
        )}
        {isSuccess && <AlertMessage type="success" message="Registration Success! Redirecting..." />}

        {/* Username */}
        <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.1s' }}>
          <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown">
            <FaUser className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Username
          </label>
          <div className="relative group">
            <input type="text" placeholder="e.g., VitalUser" {...formik.getFieldProps("username")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
          </div>
          {formik.touched.username && formik.errors.username && <p className="text-red-500 text-xs animate-shake">{formik.errors.username}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.2s' }}>
          <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown">
            <FaEnvelope className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Email
          </label>
          <div className="relative group">
            <input type="email" placeholder="e.g., user@vitalbowl.com" {...formik.getFieldProps("email")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
          </div>
          {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs animate-shake">{formik.errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.3s' }}>
          <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown">
            <FaLock className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Password
          </label>
          <div className="relative group">
            <input type="password" placeholder="At least 6 characters" {...formik.getFieldProps("password")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
          </div>
          {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs animate-shake">{formik.errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          <label className="flex items-center gap-2 font-medium text-avocadoDarkBrown">
            <FaLock className="text-avocadoGreen transition-colors duration-300 hover:text-avocadoDarkGreen" /> Confirm Password
          </label>
          <div className="relative group">
            <input type="password" placeholder="Confirm your password" {...formik.getFieldProps("confirmPassword")} className="w-full p-3 pl-10 rounded-lg border border-avocadoGreen focus:ring-4 focus:ring-avocadoGreen/50 focus:border-avocadoGreen transition-all duration-300 bg-white hover:shadow-md" />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-avocadoGreen transition-colors duration-300 group-hover:text-avocadoDarkGreen" />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-xs animate-shake">{formik.errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-avocadoGreen to-avocadoLightGreen hover:from-avocadoDarkGreen hover:to-avocadoGreen text-white font-bold py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse">
          Join VitalBowl 🥗
        </button>
      </form>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-confetti"
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
      `}</style>
    </div>
  );
};

export default Register;
