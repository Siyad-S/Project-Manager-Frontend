import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//signup
export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5151/user-admin/register`,
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//login
export const loginUser = createAsyncThunk("loginUser", async (userData) => {
  try {
    const response = await axios.post(
      `http://localhost:5151/user-admin/login`,
      userData,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("userId", response.data.userId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//login
// export const ownerUpdate = createAsyncThunk("ownerUpdate", async ({id, owner}) => {
//   try {
//     const response = await axios.put(`http://localhost:5151/user-admin/owner/${id}`, {owner});
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// });

//all users
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  try {
    const response = await axios.get(`http://localhost:5151/user-admin`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//all users
export const getSingleUser = createAsyncThunk("getSingleUser", async (id) => {
  try {
    const response = await axios.get(`http://localhost:5151/user-admin/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const UserAdminSlice = createSlice({
  name: "user",
  initialState: {
    isError: false,
    all: [],
    single: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.all = { ...action.payload };
    });
    builder
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.single = { ...action.payload };
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of users");
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on get of single user");
      });
  },
});

export default UserAdminSlice.reducer;
