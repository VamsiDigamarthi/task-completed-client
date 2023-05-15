import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Teams from "./components/Teams";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Admin from "./components/Admin";
import NotAccess from "./components/NotAccess";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

// import Protected from "./components/ProtectedRoute";

var USER_TYPE = {
  EMPLOYEE: "employee",
  TEAM_LEADER: "software team",
  ADMIN: "admin",
  TEAM_LEADER_2: "market team",
  TEAMS: [],
};

function App() {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [allTeamMembers, setAllTeamMembers] = useState([]);

  // console.log(UUU);

  // const arrayOfTeamsName = [];

  let CURRENT_USER = null;
  if (UUU) {
    CURRENT_USER = UUU.role;
    // console.log(CURRENT_USER);
  }

  const addNamesInArray = () => {
    allTeamMembers?.forEach((each) => {
      USER_TYPE.TEAMS.push(each.role);
      // console.log("attakjhd");
    });
  };

  useEffect(() => {
    addNamesInArray();
  }, [allTeamMembers]);

  useEffect(() => {
    // login admin fetch all teams api start

    const fetchAllTeam = () => {
      const adminrole = { role: "admin" };

      const getAllTeamsByAdmin = async () => {
        const API = axios.create({ baseURL: "http://localhost:5000" });

        // API.post("/team/user", adminrole)
        //   .then((res) => {
        //     setAllTeamMembers(res.data);
        //   })

        //   .catch((e) => {
        //     console.log(e);
        //   });

        // =========================================================

        //const id = "645dc464cdd5dfd4dea8ba4f";

        await API.get("team/admin/team/645dc464cdd5dfd4dea8ba4f")
          .then((res) => {
            // setTeamUserList(res.data);
            setAllTeamMembers(res.data);
          })

          .catch((e) => {
            console.log(e);
          });
      };
      getAllTeamsByAdmin();
    };

    fetchAllTeam();
    // login admin fetch all teams api end
  }, []);

  addNamesInArray();

  // console.log(USER_TYPE.TEAMS);

  // console.log(CURRENT_USER);
  // console.log(USER_TYPE.TEAMS);

  // console.log(USER_TYPE.TEAMS.includes(CURRENT_USER));

  console.log(allTeamMembers);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            UUU ? (
              CURRENT_USER === USER_TYPE.EMPLOYEE ? (
                <Navigate to="/employee" />
              ) : USER_TYPE.TEAMS.includes(CURRENT_USER) ? (
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

        {/* <Route
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
        /> */}

        <Route
          path="/teams"
          element={
            UUU ? (
              USER_TYPE.TEAMS.includes(CURRENT_USER) ||
              CURRENT_USER === USER_TYPE.ADMIN ? (
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
