import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Teams from "./components/Teams";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Admin from "./components/Admin";
import NotAccess from "./components/NotAccess";
import { useSelector } from "react-redux";

// import Protected from "./components/ProtectedRoute";

var USER_TYPE = {
  EMPLOYEE: "employee",
  TEAM_LEADER: "software team",
  ADMIN: "admin",
  TEAM_LEADER_2: "market team",
};

function App() {
  const UUU = useSelector((state) => state.authReducer.authData);

  let CURRENT_USER = null;

  if (UUU) {
    if (UUU.role === USER_TYPE.EMPLOYEE) {
      CURRENT_USER = UUU.role;
      <Navigate to="/employee" />;
    } else if (
      UUU.role === USER_TYPE.TEAM_LEADER ||
      UUU.role === USER_TYPE.TEAM_LEADER_2
    ) {
      CURRENT_USER = UUU.role;
    } else if (UUU.role === USER_TYPE.ADMIN) {
      CURRENT_USER = UUU.role;
    } else {
      console.log("nothing else");
    }
  } else {
    console.log("user not");
  }

  // const user = localStorage.getItem("profile");

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* <Route
          path="/"
          element={
            CURRENT_USER === USER_TYPE.EMPLOYEE ? (
              <Navigate to="/employee" />
            ) : (
              ""
            )
          }
        /> */}

        <Route
          path="/"
          element={
            UUU ? (
              CURRENT_USER === USER_TYPE.EMPLOYEE ? (
                <Navigate to="/employee" />
              ) : CURRENT_USER === USER_TYPE.TEAM_LEADER ||
                CURRENT_USER === USER_TYPE.TEAM_LEADER_2 ? (
                <Navigate to="/teams" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            UUU ? (
              CURRENT_USER === USER_TYPE.ADMIN ? (
                <Admin />
              ) : (
                <NotAccess />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/teams"
          element={
            UUU ? (
              CURRENT_USER === USER_TYPE.TEAM_LEADER ||
              CURRENT_USER === USER_TYPE.ADMIN ||
              CURRENT_USER === USER_TYPE.TEAM_LEADER_2 ? (
                <Teams />
              ) : (
                <NotAccess />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/employee"
          element={
            UUU ? (
              CURRENT_USER === USER_TYPE.EMPLOYEE ? (
                <Users />
              ) : (
                <NotAccess />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
