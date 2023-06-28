export const isAuthenticated = () => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("csrfToken");
  }

  if (token) {
    return true;
  }
  return false;
};
