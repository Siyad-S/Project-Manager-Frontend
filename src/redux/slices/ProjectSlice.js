import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postProject = createAsyncThunk("postProject", async (project) => {
  try {
    const response = await axios.post(`http://localhost:5151/project`, project);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getProjects = createAsyncThunk("getProjects", async () => {
  try {
    const response = await axios.get(`http://localhost:5151/project`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getProject = createAsyncThunk("getProject", async (id) => {
  try {
    const response = await axios.get(`http://localhost:5151/project/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateProject = createAsyncThunk(
  "updateProject",
  async ({id, projectData}) => {
    try {
      const response = await axios.put(
        `http://localhost:5151/project/${id}`,
        projectData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProject = createAsyncThunk("deleteProject", async ({id}) => {
  try {
    const response = await axios.delete(`http://localhost:5151/project/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const ProjectSlice = createSlice({
  name: "projects",
  initialState: {
    isError: false,
    all: [],
    single: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.all = { ...action.payload };
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.single = { ...action.payload };
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of projects");
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of one project");
      });
  },
});

export default ProjectSlice.reducer;
