// export const getUserFromStorage = () => {
//   const token = JSON.parse(localStorage.getItem("userInfo") || null);
//   return token?.token;
// };

export const getUserFromStorage = () => {
  const user = localStorage.getItem("vitalbowl_user");
  return user ? JSON.parse(user) : null;
};
