import { useCollapse } from "react-collapsed";
import { BiDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import "./index.css";
import { useState } from "react";
import UserModal from "../UserModal";
import UserEditModal from "../UserEditModal";
import { useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import TeamDeleteTaskModal from "../TeamDeleteTaskModal";

function TeamLeadTaska({ teamLeaderTask, getUserTask }) {
  const UUU = useSelector((state) => state.authReducer.authData);

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");

  const [editModal, setEditModal] = useState(false);

  const [editUserTask, setEditUserTask] = useState([]);

  const [teamDeleteTask, setTeamDeleteTask] = useState(false);

  const [deletedTaskDetails, setDeletedTaskDetails] = useState("");

  const detailsAndModel = (event) => {
    const desc = teamLeaderTask.filter(
      (each) => each._id === event.currentTarget.id
    );
    //console.log(desc[0].description);
    setDescription(desc[0].description);
    setModal(true);
  };

  const editAndModel = (e) => {
    const edit = teamLeaderTask.filter(
      (each) => each._id === e.currentTarget.id
    );

    setEditUserTask(edit);
    setEditModal(true);
  };

  const teamDeleteTaskFromId = (e) => {
    const deleteTask = teamLeaderTask.filter(
      (each) => each._id === e.currentTarget.id
    );
    //console.log(deleteTask);
    setTeamDeleteTask(true);
    setDeletedTaskDetails(deleteTask[0]);
    // setDeletedTaskDetails(deleteTask[0]);
  };

  return (
    <div className="TeamLeadTaska">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? "Close the Taks" : "Show Your Taks"}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          <table className="content-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Date</th>
                <th>Update Date</th>
                <th>Expert Date</th>
                <th>Status</th>
                <th>Details & Edit</th>
              </tr>
            </thead>
            <tbody>
              {teamLeaderTask.map((each, index) => (
                <tr key={index}>
                  <td>{each.task}</td>
                  <td>{each.createdAt}</td>
                  <td>{each.updatedAt}</td>
                  <td>{each.date}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor:
                          each.status === "completed"
                            ? "#14e610"
                            : each.status === "incompleted"
                            ? "#f53858"
                            : "#e8ed58",
                        fontSize: "16px",
                        fontWeight: 400,
                        padding: "2px",
                        color: "#ffffff",
                        paddingLeft: "19px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    >
                      {each.status}
                    </div>
                  </td>
                  <td>
                    <BiDetail id={each._id} onClick={detailsAndModel} />
                    {UUU.role !== "admin" ? (
                      <FiEdit
                        id={each._id}
                        onClick={editAndModel}
                        style={{ marginLeft: "50px" }}
                      />
                    ) : (
                      <RiDeleteBinLine
                        id={each._id}
                        style={{ margin: "0px 18px" }}
                        onClick={teamDeleteTaskFromId}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <UserModal
            modal={modal}
            setModal={setModal}
            datilsTask={description}
          />
          {editModal && (
            <UserEditModal
              editModal={editModal}
              setEditModal={setEditModal}
              editUserTask={editUserTask[0]._id}
              getUserTask={getUserTask}
            />
          )}
          <TeamDeleteTaskModal
            setTeamDeleteTask={setTeamDeleteTask}
            teamDeleteTask={teamDeleteTask}
            deletedTaskDetails={deletedTaskDetails}
            // getTeamOfTeaks={getTeamOfTeaks}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamLeadTaska;
