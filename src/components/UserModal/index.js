import React from "react";
import "./index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

const UserModal = ({ modal, setModal, datilsTask }) => {
  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={() => setModal(false)}></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea. */}
              {datilsTask}
            </p>

            <IoIosCloseCircleOutline
              className="close-modal"
              onClick={() => setModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserModal;
