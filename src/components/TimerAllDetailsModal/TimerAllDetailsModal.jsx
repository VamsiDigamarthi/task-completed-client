import React, { useState } from "react";
import "./index.css";

import { Modal, useMantineTheme } from "@mantine/core";

const TimerAllDetailsModal = ({
  timerModal,
  setTimerModal,
  timeValuesCalProject,
}) => {
  const theme = useMantineTheme();

  console.log(timeValuesCalProject);

  return (
    <>
      <Modal
        size="50%"
        centered
        opened={timerModal}
        onClose={() => setTimerModal(false)}
        title="Edit task"
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
        <div>
          <table className="content-table new-added-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>TaskName</th>
                <th>TotalHour</th>
                <th>CompletedHour</th>
                <th>ProjectId</th>
              </tr>
            </thead>
            <tbody>
              {timeValuesCalProject.map((each, index) => (
                <tr>
                  <td>{each.userName}</td>
                  <td>{each.taskName}</td>
                  <td>{each.totalHour}</td>
                  <td>{each.timer}</td>
                  <td>{each.projectId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default TimerAllDetailsModal;
