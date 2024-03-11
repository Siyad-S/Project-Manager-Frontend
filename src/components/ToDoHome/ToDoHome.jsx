import React, { useEffect, useState } from "react";
import "./ToDoHome.css";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import {
  postTask,
  getTasks,
  getSingleTask,
  updateTask,
  updateTaskStatus,
} from "../../redux/slices/TaskSlice";
import {
  postStatus,
  getStatus,
  getSingleStatus,
  updateStatus,
} from "../../redux/slices/StatusSlice";
import { getSingleUser } from "../../redux/slices/UserAdminSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../DeleteModal/DeleteModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Spinner from "../Spinner/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import SearchModal from "../SearchModal/SearchModal";

const ToDoHome = () => {
  const [openModal, setOpenmodal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userid = localStorage.getItem("userId");
  const navigate = useNavigate()

  const allTaskData =
    useSelector((state) => state.todos.allTasks.tasksData) || [];
  const allStatuses =
    useSelector((state) => state.todoStatus.allStatus.statusData) || [];

  const singleStatus =
    useSelector((state) => state.todoStatus.single.statusData) || [];

  const singleUser = useSelector((state) => state.user.single.singleUser) || [];

  const singleTodo = useSelector((state) => state.todos.singleTask.tasksData);
  const [edit, setEdit] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [stagesModal, setStagesModal] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [projectWiseTask, setProjectWiseTask] = useState([]);
  const [openShare, setOpenShare] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    dispatch(getSingleUser(userid));
  }, [dispatch]);

  const handleOnDragEnd = async (result) => {
    const { draggableId, destination } = result;
    if (draggableId !== undefined) {
      await dispatch(getSingleTask({ id: draggableId }));
      if (destination?.droppableId !== singleTodo?.status) {
        console.log(destination?.droppableId);
        dispatch(
          updateTaskStatus({
            id: draggableId,
            status: destination?.droppableId,
          })
        );
        setSpinner(true);
        dispatch(getTasks());
        setTimeout(() => {
          setSpinner(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getStatus());
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      dueDate: "",
      projectId: id,
    },
    onSubmit: async (values) => {
      console.log(values);
      if (edit && singleTodo !== undefined) {
        await dispatch(updateTask({ id: taskId, taskData: values }));
      } else {
        await dispatch(postTask(values));
      }
      await dispatch(getTasks());
      setOpenmodal(false);
    },
  });

  const modalHandler = () => {
    setOpenmodal(true);
  };

  const closeModal = () => {
    setOpenmodal(false);
  };

  const stagesModalHandler = () => {
    setStagesModal(true);
  };

  const closeStagesModal = () => {
    setStagesModal(false);
    setStatusId("");
  };

  const handleEdit = async (Id) => {
    setOpenmodal(true);
    await dispatch(getSingleTask({ id: Id }));
    setEdit(true);
    setTaskId(Id);
  };

  useEffect(() => {
    if (singleTodo !== undefined) {
      formik.setValues({
        title: singleTodo.title,
        description: singleTodo.description,
        status: singleTodo.status,
        dueDate: singleTodo.dueDate,
        projectId: id,
      });
    }
  }, [id]);

  const statusEditHandler = async (Id) => {
    await dispatch(getSingleStatus({ id: Id }));
    await setStagesModal(true);
    setStatusId(Id);
  };

  useEffect(() => {
    const tasks = allTaskData?.filter((task) => task.projectId === id);
    setProjectWiseTask(tasks);
  }, [id, allTaskData]);

  const dropdownOpenHandler = () => {
    setDropdown(true);
  };

  const dropdownCloseHandler = () => {
    setDropdown(false);
  };

  return (
    <>
      {/* {spinner ? <Spinner /> : null} */}

      <div className="home_body">
        <div className="header">
          <div className="header-left">Kanban Board</div>
          <div className="header-right">
            <i
              className="material-symbols-outlined"
              onClick={dropdownOpenHandler}
            >
              account_circle
            </i>
            <h4>{singleUser. userName}</h4>
            {dropdown ? (
              <div
                className="profile_dropdown"
                onMouseLeave={dropdownCloseHandler}
              >
                <ul>
                  <li onClick={stagesModalHandler}>Add Stages</li>
                  <li onClick={modalHandler}>Add Task</li>
                  <li onClick={() => navigate("/shared-tasks")}>Shared</li>
                  <li>Logout</li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="kanban-board">
            {allStatuses
              ?.filter((status) => status.projectId === id)
              .map((status, index) => (
                <Droppable droppableId={status._id} key={status._id}>
                  {(provided) => (
                    <div
                      className="column todo characters"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={status._id}
                    >
                      <h2>{status.stage}</h2>
                      <div className="edit_delete">
                        <i
                          className="material-symbols-outlined"
                          onClick={() => statusEditHandler(status._id)}
                        >
                          edit
                        </i>
                        <DeleteModal id={status?._id} name={"stage"} />
                      </div>
                      <div className="tasks" data-status="todo">
                        {projectWiseTask
                          ?.filter((task) => task.status === status._id)
                          .map((task, index) => (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="task"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div>
                                    <SearchModal
                                      task_id={task._id}
                                      projectId={task.projectId}
                                    />
                                  </div>
                                  <h3>{task.title}</h3>
                                  <p>{task.description}</p>
                                  <div className="edit_delete">
                                    <button
                                      className="ant-btn css-dev-only-do-not-override-1k979oh ant-btn-primary"
                                      onClick={() => handleEdit(task._id)}
                                    >
                                      <i className="material-symbols-outlined">
                                        edit
                                      </i>
                                    </button>
                                    <DeleteModal id={task._id} name={"task"} />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
          </div>
        </DragDropContext>

        {openModal ? (
          <div id="add-task-modal" className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h2>Add New Task</h2>
              <form id="add-task-form" onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  id="task-title"
                  placeholder="Task Title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  required
                />
                <textarea
                  id="task-description"
                  placeholder="Task Description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  required
                ></textarea>
                <select
                  id="column-select"
                  name="status"
                  onChange={formik.handleChange}
                  value={formik.values.status}
                >
                  {allStatuses
                    ?.filter((status) => status.projectId === id)
                    ?.map((status, index) => (
                      <option key={index} value={status._id}>
                        {status.stage}
                      </option>
                    ))}
                </select>
                <input
                  type="date"
                  name="dueDate"
                  onChange={formik.handleChange}
                  value={formik.values.dueDate}
                />
                <button type="submit">
                  {!edit ? "Add Task" : "Edit Task"}
                </button>
              </form>
            </div>
          </div>
        ) : null}

        {stagesModal ? (
          <div id="add-task-modal" className="modal">
            <div className="modal-content stages_modal">
              <span className="close-button" onClick={closeStagesModal}>
                &times;
              </span>
              <h2>Add New Stages</h2>
              <Formik
                initialValues={
                  statusId === ""
                    ? { stages: [""], projectId: id }
                    : { stage: singleStatus?.stage, projectId: id }
                }
                onSubmit={async (values) =>
                  statusId === ""
                    ? (await dispatch(postStatus({ stages: values })),
                      await dispatch(getStatus()),
                      setStagesModal(false))
                    : (await dispatch(
                        updateStatus({ id: statusId, stage: values })
                      ),
                      await dispatch(getStatus()),
                      setStagesModal(false))
                }
                render={({ values }) => (
                  <Form id="add-task-form">
                    {statusId !== "" ? (
                      <Field name="stage" type="text" />
                    ) : (
                      <FieldArray
                        name="stages"
                        render={(arrayHelpers) => (
                          <div>
                            {values.stages && values.stages.length > 0 ? (
                              values.stages.map((stage, index) => (
                                <div key={index} className="looped_fields_btn">
                                  <Field name={`stages.${index}`} />
                                  <button
                                    className="add_remove_btn"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </button>
                                  <button
                                    className="add_remove_btn"
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              ))
                            ) : (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                Add a stage
                              </button>
                            )}
                          </div>
                        )}
                      />
                    )}
                    <div>
                      <button type="submit">Submit</button>
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        ) : null}
        <div className="footer">
          <p>Kanban Board Application</p>
        </div>
      </div>
    </>
  );
};

export default ToDoHome;
