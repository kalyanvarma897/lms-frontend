export const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  navigate("/auth/login"); 
};