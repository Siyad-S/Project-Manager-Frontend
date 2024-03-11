import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postStatus = createAsyncThunk("postStatus", async ({stages}) => {
  try {
    const response = await axios.post(`http://localhost:5151/status`, stages);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getStatus = createAsyncThunk("getStatus", async () => {
    try {
      const response = await axios.get(`http://localhost:5151/status`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  export const getSingleStatus = createAsyncThunk("getSingleStatus", async ({id}) => {
    try {
      const response = await axios.get(`http://localhost:5151/status/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  export const updateStatus = createAsyncThunk("updateStatus", async ({id, stage}) => {
    try {
      const response = await axios.put(`http://localhost:5151/status/${id}`, stage);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  export const deleteStatus = createAsyncThunk("deleteStatus", async ({id}) => {
    try {
      const response = await axios.delete(`http://localhost:5151/status/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

export const TaskSlice = createSlice({
  name: "todoStatus",
  initialState: {
    isError: false,
    allStatus: [],
    single: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.fulfilled, (state, action) => {
        state.allStatus = { ...action.payload };
      })
      .addCase(getSingleStatus.fulfilled, (state, action) => {
        state.single = { ...action.payload };
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of statuses");
      })
      .addCase(getSingleStatus.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of single statuses");
      });
  },
});

export default TaskSlice.reducer;
