import React, { useState } from "react";
import "./DeleteModal.css"
import { Button, Modal } from "antd";
import {
  deleteTask,
  getTasks,
} from "../../redux/slices/TaskSlice";
import { deleteStatus, getStatus } from "../../redux/slices/StatusSlice";
import { deleteProject, getProjects } from "../../redux/slices/ProjectSlice";
import { useDispatch } from "react-redux";
const App = ({ id, name }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    switch(name) {
      case "task":
        await dispatch(deleteTask({ id: id }));
        await dispatch(getTasks());
        setIsModalOpen(false);
        break;
      case "stage":
        await dispatch(deleteStatus({ id: id }));
        await dispatch(getStatus());
        setIsModalOpen(false);
        break;
      case "project":
        await dispatch(deleteProject({ id: id }));
        await dispatch(getProjects());
        setIsModalOpen(false);
      default:
        console.log("No valid deletions");
    }

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        <i className="material-symbols-outlined" onClick={showModal}>
          delete
        </i>
      </Button>
      <Modal
        title="Delete Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Do you want to delete?</h2>
      </Modal>
    </>
  );
};
export default App;
