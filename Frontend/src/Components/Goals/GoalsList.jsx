// src/Components/Goals/GoalList.jsx
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { listGoalsAPI, deleteGoalAPI, updateGoalStatusAPI } from "../../services/goals/goalService";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AlertMessage from "../Alert/AlertMessage";
import { FaEdit, FaTrash, FaBullseye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const GoalsList = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["list-goals"],
    queryFn: listGoalsAPI,
  });

  const goals = data || [];

  const { mutateAsync: deleteGoal, isLoading: isDeleting } = useMutation({ mutationFn: deleteGoalAPI });
  const { mutateAsync: updateStatus } = useMutation({ mutationFn: ({ goalId, status }) => updateGoalStatusAPI({ goalId, status }) });

  const onDelete = async (id) => { await deleteGoal(id); refetch(); };
  const setStatus = async (goalId, status) => { await updateStatus({ goalId, status }); refetch(); };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const noGoalsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } },
  };

  if (isLoading || isFetching) return <div className="flex justify-center mt-8"><ClipLoader color="#7A9A2E" size={40} /></div>;
  if (isError) return <AlertMessage type="error" message={error?.message || "Failed to load goals"} />;

  return (
    <motion.div
      className="p-6 flex justify-center text-avocadoDarkBrown bg-avocadoCream min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-3xl p-6 rounded-3xl shadow-2xl border border-avocadoLightGreen/50"
        style={{ backgroundColor: '#E0E9C6' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-extrabold text-avocadoDarkBrown mb-6 text-center drop-shadow-md"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Your Goals
        </motion.h2>

        <AnimatePresence>
          <motion.ul
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {goals.length ? goals.map((g) => {
              const progressWidth = g.status === "Completed" ? "100%" : g.status === "Ongoing" ? "50%" : "0%";
              return (
                <motion.li
                  key={g._id}
                  className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md border border-avocadoLightGreen"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(122, 154, 46, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex-1 space-y-1 p-4 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <FaBullseye className="text-avocadoGreen" />
                      <h3 className="font-semibold text-avocadoDarkBrown">{g.title}</h3>
                    </div>
                    <p className="text-avocadoGreen text-sm">{g.description}</p>
                    <p className="text-avocadoGreen text-xs">{g.duration}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-avocadoCream rounded-full h-2 mt-2">
                      <motion.div
                        className="bg-avocadoGreen h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: progressWidth }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      ></motion.div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      {["Ongoing", "Completed", "Failed"].map((status) => (
                        <motion.button
                          key={status}
                          onClick={() => setStatus(g._id, status)}
                          className={`px-2 py-1 rounded font-medium transition-all duration-300 ${
                            g.status === status
                              ? status === "Ongoing" ? "bg-orange-500 text-white hover:bg-orange-600" : status === "Completed" ? "bg-avocadoGreen text-white hover:bg-avocadoDarkGreen" : "bg-red-500 text-white hover:bg-red-600"
                              : "bg-avocadoCream border border-avocadoLightGreen text-avocadoDarkBrown hover:bg-avocadoCream"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {status}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end ml-4 space-y-2">
                    <Link to={`/update-goal/${g._id}`}>
                      <motion.button
                        className="bg-avocadoGreen text-white p-2 rounded-full shadow hover:bg-avocadoDarkBrown transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEdit />
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => onDelete(g._id)}
                      className="bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.li>
              );
            }) : (
              <motion.p
                className="text-center text-avocadoGreen"
                variants={noGoalsVariants}
                initial="hidden"
                animate="visible"
              >
                No goals found.
              </motion.p>
            )}
          </motion.ul>
        </AnimatePresence>

        {isDeleting && (
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ClipLoader color="#EF4444" size={28} />
            <span className="ml-2 text-red-500">Deleting...</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GoalsList;

