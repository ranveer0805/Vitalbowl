// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getUserFromStorage } from "../../utils/getUserFromStorage";

// const AuthRoute = ({ children }) => {
//   const token = getUserFromStorage();

//   if (token) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default AuthRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const AuthRoute = ({ children }) => {
  const user = getUserFromStorage();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthRoute;
