import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postSharedTask = createAsyncThunk("postSharedTask", async (sharedTaskData) => {
  try {
    const response = await axios.post(`http://localhost:5151/shared-tasks`, sharedTaskData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getSharedTasks = createAsyncThunk("getSharedTasks", async ({userId}) => {
  try {
    console.log(userId);
    const response = await axios.get(`http://localhost:5151/shared-tasks/all/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const SharedTaskSlice = createSlice({
  name: "sharedTask",
  initialState: {
    isError: false,
    all: [],
    single: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSharedTasks.fulfilled, (state, action) => {
        state.all = {...action.payload};
      })
      .addCase(getSharedTasks.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of shared tasks");
      });
  },
});

export default SharedTaskSlice.reducer;
