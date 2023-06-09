import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Teams from "./components/Teams";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Admin from "./components/Admin";
import NotAccess from "./components/NotAccess";
import { useSelector } from "react-redux";
import { useState } from "react";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import SuperAdmin from "./components/SuperAdmin";

// import Protected from "./components/ProtectedRoute";

var USER_TYPE = {
  EMPLOYEE: "employee",
  TEAM_LEADER: "teamleader",
  ADMIN: "admin",
  TEAM_LEADER_2: "market team",
  TEAMS: [],
  SUPER_ADMIN: "superadmin",
};

function App() {
  const UUU = useSelector((state) => state.authReducer.authData);

  // console.log(UUU);

  // const arrayOfTeamsName = [];

  let CURRENT_USER = null;
  if (UUU) {
    CURRENT_USER = UUU.role;
    // console.log(CURRENT_USER);
  }

  // const addNamesInArray = () => {
  //   allTeamMembers?.forEach((each) => {
  //     USER_TYPE.TEAMS.push(each.role);
  //     // console.log("attakjhd");
  //   });

  //   localStorage.setItem("teamleaderlist", JSON.stringify(USER_TYPE.TEAMS));
  // };

  // useEffect(() => {
  //   addNamesInArray();
  // }, [allTeamMembers]);

  // let stringifiedTodoList = localStorage.getItem("teamleaderlist");
  // let parsedTodoList = JSON.parse(stringifiedTodoList);

  // console.log(parsedTodoList);

  // useEffect(() => {
  //   // login admin fetch all teams api start

  //   const fetchAllTeam = () => {
  //     const adminrole = { role: "admin" };

  //     const getAllTeamsByAdmin = async () => {
  //       const API = axios.create({ baseURL: "http://localhost:5000" });

  //       // API.post("/team/user", adminrole)
  //       //   .then((res) => {
  //       //     setAllTeamMembers(res.data);
  //       //   })

  //       //   .catch((e) => {
  //       //     console.log(e);
  //       //   });

  //       // =========================================================

  //       //const id = "645dc464cdd5dfd4dea8ba4f";

  //       // cloud admin id 64631c576371d794c57a3f27

  //       // await API.get("team/admin/team/646350516371d794c57a4005")
  //       await API.get(`team/admin/team/${UUU._id}`)
  //         .then((res) => {
  //           // setTeamUserList(res.data);
  //           setAllTeamMembers(res.data);
  //         })

  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     };
  //     getAllTeamsByAdmin();
  //   };

  //   fetchAllTeam();
  //   // login admin fetch all teams api end
  // }, []);

  // addNamesInArray();

  // console.log(USER_TYPE.TEAMS);

  // console.log(CURRENT_USER);
  // console.log(USER_TYPE.TEAMS);

  // console.log(USER_TYPE.TEAMS.includes(CURRENT_USER));

  //console.log(USER_TYPE.TEAMS);

  // let stringifiedTodoList = localStorage.getItem("teamleaderlist");
  // let parsedTodoList = JSON.parse(stringifiedTodoList);

  //console.log(parsedTodoList);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            UUU ? (
              CURRENT_USER === USER_TYPE.EMPLOYEE ? (
                <Navigate to="/employee" />
              ) : CURRENT_USER === USER_TYPE.TEAM_LEADER ? (
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
          path="/superadmin"
          element={
            UUU ? (
              CURRENT_USER === USER_TYPE.SUPER_ADMIN ? (
                <SuperAdmin />
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
              CURRENT_USER === USER_TYPE.TEAM_LEADER ||
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
