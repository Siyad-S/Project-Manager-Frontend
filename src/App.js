import { Route, Routes } from 'react-router-dom';
import './App.css';
import ToDoHome from './components/ToDoHome/ToDoHome';
import ProjectHome from './components/ProjectHome/ProjectHome';
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import SharedTasks from './components/SharedTasks/SharedTasks';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<ProjectHome />} />
        <Route path='/tasks/:id' element={<ToDoHome />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/shared-tasks' element={<SharedTasks />} />
      </Routes>
    </div>
  );
}

export default App;
