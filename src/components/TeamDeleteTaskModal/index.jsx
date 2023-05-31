import React from "react";
import "./index.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
function TeamDeleteTaskModal({
  teamDeleteTask,
  setTeamDeleteTask,
  deletedTaskDetails,
  getTeamOfTeaks,
  getUserTask,
}) {
  //   const [opened, { open, close }] = useDisclosure(false);
  // const id = deletedTaskDetails?._id;
  // console.log(id);
  const theme = useMantineTheme();
  const { _id, name } = deletedTaskDetails;
  const deleteTaskButton = (e) => {
    e.preventDefault();
    const deleteTask = () => {
      const API = axios.create({ baseURL: "http://localhost:5000" });
      API.delete(`/tasks/delete/${_id}`)
        .then((res) => {
          // getUserTask();
          //console.log(res.data);
          setTeamDeleteTask(false);
          getTeamOfTeaks(name);
          //getUserTask();
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const timerDeleteBasedOnTask = () => {
      const API = axios.create({ baseURL: "http://localhost:5000" });
      API.delete(`time/delete/timer/${_id}`)
        .then((res) => {
          // getUserTask();
          console.log(res.data);
          setTeamDeleteTask(false);
          // getTeamOfTeaks(name);
          //getUserTask();
        })
        .catch((e) => {
          console.log(e);
        });
    };

    deleteTask();
    timerDeleteBasedOnTask();
  };

  return (
    <>
      <Modal
        centered
        opened={teamDeleteTask}
        onClose={() => setTeamDeleteTask(false)}
        // title='<RiDeleteBinLine className="delete-icons" />'
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
        <div className="delete-modal">
          <RiDeleteBinLine className="delete-icons" />
          <h3>You are about to delete a task</h3>
          <p>This will delete your task from perminatlly</p>
          <p>Are you sure?</p>
          <div>
            <button onClick={() => setTeamDeleteTask(false)}>Cancel</button>
            <button onClick={deleteTaskButton}>Delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TeamDeleteTaskModal;
