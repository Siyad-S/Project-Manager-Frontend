import { configureStore } from '@reduxjs/toolkit'
import TaskSlice from './slices/TaskSlice'
import StatusSlice from './slices/StatusSlice'
import ProjectSlice from './slices/ProjectSlice'
import UserAdminSlice from "./slices/UserAdminSlice"
import SharedTaskSlice from "./slices/SharedTaskSlice"


export const store = configureStore({
  reducer: {
    todos: TaskSlice,
    todoStatus: StatusSlice,
    projects: ProjectSlice,
    user: UserAdminSlice,
    sharedTask: SharedTaskSlice
  },
})