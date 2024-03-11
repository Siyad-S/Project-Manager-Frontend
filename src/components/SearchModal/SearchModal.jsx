import React, { useState } from "react";
import "./SearchModal.css";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/UserAdminSlice";
import { postSharedTask } from "../../redux/slices/SharedTaskSlice";

const App = ({ task_id, projectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.all.usersData);
  const userid = localStorage.getItem("userId");
  const [sharedTask, setSharedTask] = useState({
    to: "",
    from: "",
    taskId: "",
    projectId: "",
  });

    const shareTask = (userId) => {
    setSharedTask({
      to: userId,
      from: userid,
      taskId: task_id,
      projectId: projectId,
    })

  };

  console.log(sharedTask);


  const showModal = async () => {
    setIsModalOpen(true);
    dispatch(getAllUsers());
  };
  console.log(allUsers);
  const handleOk = () => {
    dispatch(postSharedTask(sharedTask))
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <i className="material-symbols-outlined" onClick={showModal}>
        share
      </i>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Share"
        cancelText="Cancel"
      >
        <input type="search" />
        <ul>
          {allUsers
            ?.filter((user) => user._id !== userid)
            ?.map((user, index) => (
              <div key={index}>
                <li onClick={() => shareTask(user._id)}>{user.email}</li>
              </div>
            ))}
        </ul>
      </Modal>
    </>
  );
};
export default App;
