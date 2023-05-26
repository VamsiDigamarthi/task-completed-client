import React from "react";
import "./index.css";
import { Modal, useMantineTheme } from "@mantine/core";
function UserModal({ modal, setModal, datilsTask }) {
  //   const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        centered
        size="50%"
        opened={modal}
        onClose={() => setModal(false)}
        title="Details"
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
        <p>{datilsTask}</p>
      </Modal>
    </>
  );
}

export default UserModal;
