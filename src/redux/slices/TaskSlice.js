import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const postTask = createAsyncThunk("postTask", async (taskData) => {
    try {
        const response = await axios.post(`http://localhost:5151/tasks`, taskData)
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getTasks = createAsyncThunk("getTasks", async () => {
    try {
        const response = await axios.get(`http://localhost:5151/tasks` )
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const getSingleTask = createAsyncThunk("getSingleTask", async ({id}) => {
    try {
        const response = await axios.get(`http://localhost:5151/tasks/${id}` )
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const updateTask = createAsyncThunk("updateTask", async ({id, taskData}) => {
    console.log("put data:", taskData);
    try {
        const response = await axios.put(`http://localhost:5151/tasks/${id}`, taskData)
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const updateTaskStatus = createAsyncThunk("updateTaskStatus", async ({id, status}) => {
    try {
        const response = await axios.put(`http://localhost:5151/tasks/status/${id}`, {status})
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const deleteTask = createAsyncThunk("deleteTask", async ({id}) => {
    try {
        const response = await axios.delete(`http://localhost:5151/tasks/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const TaskSlice = createSlice({
  name: 'todos',
  initialState: {
    allTasks: [],
    isError: false,
    singleTask: {}
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.allTasks = {...action.payload}
      })
      .addCase(getSingleTask.fulfilled, (state, action) => {
        state.singleTask = {...action.payload}
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isError = true
        console.log("Error on get of tasks");
      })
      .addCase(getSingleTask.rejected, (state, action) => {
        state.isError = true
        console.log("Error on single get of tasks");
      })
  }
})

// export const { } = counterSlice.actions

export default TaskSlice.reducer