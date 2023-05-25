import React, { useEffect, useState } from "react";
import "./index.css";

import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";

const ProjectIdModal = ({
  setProjectModal,
  projectModal,
  teamLeaderTask,
  projectSetUserId,
}) => {
  const [inputValue, setInputValue] = useState(null);

  const [employees, setEmployees] = useState({});
  //   const editSubmitTask = (e) => {
  //     e.preventDefault();
  //     const API = axios.create({ baseURL: "http://localhost:5000" });
  //     API.put(`/tasks/${editUserTask}`, editChangeValue)
  //       .then((res) => {
  //         //console.log("edit Success");
  //         getUserTask();
  //         setEditModal(false);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };

  const projectIdAndUserId = {
    projectId: inputValue,
    id: projectSetUserId,
  };

  const editSubmitTask = (e) => {
    e.preventDefault();
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.post("/auth/project/id", projectIdAndUserId)
      .then((res) => {
        //console.log("edit Success");
        console.log(res.data);
        setProjectModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.get(`auth/project/${projectSetUserId}`)
      .then((res) => {
        setEmployees({ ...res.data });
      })

      .catch((e) => {
        console.log(e);
      });
  }, [projectModal]);

  const theme = useMantineTheme();

  //console.log(employees.project_id);

  const rrr = employees.project_id;

  //console.log(projectSetUserId);

  return (
    <>
      <Modal
        centered
        opened={projectModal}
        onClose={() => setProjectModal(false)}
        title="Project"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 2,
        }}
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "linear",
        }}
      >
        <form onSubmit={editSubmitTask}>
          <h4>All project Ids</h4>
          <div className="inp-check ">
            {teamLeaderTask.map((each) => (
              <div className="inp-div">
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  value={each.project_id}
                  type="checkbox"
                  id="inp"
                />
                <label>{each.project_id}</label>
              </div>
            ))}
          </div>
          <button className="projectIdSub" type="submit">
            submit
          </button>
        </form>
        <div>
          <h5>which project assign</h5>
          {rrr?.map((each) => (
            <li>{each}</li>
          ))}
          {/* {Array(employees).map((each) => (
            <ul>
              {each.project_id.map((each) => (
                <li>{each}</li>
              ))}
            </ul>
          ))} */}
        </div>
      </Modal>
    </>
  );
};

export default ProjectIdModal;
