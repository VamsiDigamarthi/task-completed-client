import React from "react";
import { Navigate } from "react-router-dom";
function Protected({ children }) {
  const x = localStorage.getItem("user");
  // console.log(x);
  if (!x) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default Protected;
