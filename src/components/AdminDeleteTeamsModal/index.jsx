import { Modal, useMantineTheme } from "@mantine/core";
import { RiDeleteBinLine } from "react-icons/ri";

import axios from "axios";

const AdminDeleteTeamsModal = ({
  setAdminDeleteModal,
  adminDeleteModal,
  deletedTeams,
  getAllTeamsByAdmin,
}) => {
  const theme = useMantineTheme();
  // console.log(deletedTeams);

  const deleteTaskButton = () => {
    const { _id } = deletedTeams;
    //console.log(_id);
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.delete(`/auth/admin/team/delete/${_id}`)
      .then((res) => {
        // getUserTask();
        console.log(res.data);
        //getUserTask();
        getAllTeamsByAdmin();
        setAdminDeleteModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Modal
        centered
        opened={adminDeleteModal}
        onClose={() => setAdminDeleteModal(false)}
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
          <h3>You are about to delete a teams</h3>
          <p>This will delete your teams from perminatlly</p>
          <p>Are you sure?</p>
          <div>
            <button onClick={() => setAdminDeleteModal(false)}>Cancel</button>
            <button onClick={deleteTaskButton}>Delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminDeleteTeamsModal;
