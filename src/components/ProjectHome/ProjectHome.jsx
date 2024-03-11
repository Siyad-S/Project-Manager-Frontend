import React, { useEffect, useState } from "react";
import "./ProjectHome.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  postProject,
  getProjects,
  getProject,
  updateProject,
} from "../../redux/slices/ProjectSlice";
// import { ownerUpdate } from "../../redux/slices/UserAdminSlice";
import { useSelector } from "react-redux";
import DeleteModal from "../DeleteModal/DeleteModal";

const ProjectHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projects.all.projectData);
  const project = useSelector((state) => state.projects.single.projectData);

  const [openModal, setOpenmodal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState("");
  const userid = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  console.log(allProjects);

  const openModalHandler = () => {
    setOpenmodal(true);
  };

  const closeModalHandler = () => {
    setOpenmodal(false);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      userId: userid,
    },
    onSubmit: async (values) => {
      if (Id !== undefined && Id !== "") {
        await dispatch(updateProject({ id: Id, projectData: values }));
        await setOpenmodal(false);
        dispatch(getProjects());
      } else {
        await dispatch(postProject(values));
        // await dispatch(ownerUpdate({ id: userid, owner: userid }));
        await setOpenmodal(false);
        dispatch(getProjects());
      }
    },
  });

  const handleProjectEdit = (id) => {
    setOpenmodal(true);
    dispatch(getProject(id));
    setId(id);
  };

  useEffect(() => {
    if (project !== undefined && project !== "") {
      formik.setValues({
        title: project?.title,
        type: project?.type,
      });
    }
  }, [project]);

  console.log(project);

  return (
    <div>
      <div className="header">
        <h1>Project Management</h1>
      </div>
      <div className="project_shower">
        <div className="add_project" onClick={openModalHandler}>
          <PlusOutlined />
        </div>
        <div className="projects">
          {allProjects
            ?.filter((project) => project.userId === userid)
            .map((project, index) => (
              <div className="project" key={index}>
                <div>
                  <i
                    onClick={() => handleProjectEdit(project._id)}
                    className="material-symbols-outlined"
                  >
                    edit
                  </i>
                  <DeleteModal id={project?._id} name={"project"} />
                </div>
                <h3 onClick={() => navigate(`/tasks/${project._id}`)}>
                  {project.title}
                </h3>
                <h5>{project.type}</h5>
              </div>
            ))}
        </div>
        {openModal ? (
          <div id="add-task-modal" className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModalHandler}>
                &times;
              </span>
              <h2>Add New Project</h2>
              <form id="add-task-form" onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  id="project_title"
                  placeholder="Project Title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  required
                />
                <input
                  type="text"
                  id="project_type"
                  placeholder="Project Type"
                  name="type"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  required
                />
                <button type="submit">
                  {!edit ? "Add Task" : "Edit Task"}
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectHome;
