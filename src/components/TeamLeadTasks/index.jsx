import { useCollapse } from "react-collapsed";
import { BiDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import "./index.css";
import { useState } from "react";
import UserModal from "../UserModal";
import UserEditModal from "../UserEditModal";
function TeamLeadTaska({ teamLeaderTask, getUserTask }) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");

  const [editModal, setEditModal] = useState(false);

  const [editUserTask, setEditUserTask] = useState([]);

  const detailsAndModel = (event) => {
    const desc = teamLeaderTask.filter(
      (each) => each._id === event.currentTarget.id
    );
    console.log(desc[0].description);
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
                <th>Status</th>
                <th>Details & Edit</th>
              </tr>
            </thead>
            <tbody>
              {teamLeaderTask.map((each) => (
                <tr>
                  <td>{each.task}</td>
                  <td>{each.createdAt}</td>
                  <td>{each.updatedAt}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor:
                          each.status === "completed" ? "#14e610" : "#f53858",
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
                    <FiEdit
                      id={each._id}
                      onClick={editAndModel}
                      style={{ marginLeft: "50px" }}
                    />
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
        </div>
      </div>
    </div>
  );
}

export default TeamLeadTaska;
