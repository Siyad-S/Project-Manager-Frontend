import React, { useEffect, useState } from "react";
import "./SharedTasks.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSharedTasks } from "../../redux/slices/SharedTaskSlice";

const SharedTasks = () => {
  const dispatch = useDispatch();
  const allSharedTasks = useSelector(
    (state) => state.sharedTask.all.sharedData
  );
  // const [filteredData, setFilteredData] = useState([])

  const userid = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(getSharedTasks({userId:userid}));
  }, [dispatch]);

  console.log(allSharedTasks);

  // useEffect(() => {
  //   const filteredTasks = allSharedTasks.filter((shared) => shared.to === userId);
  //   setFilteredData(filteredTasks)
  // }, [userId])

  // console.log(filteredData);

  return (
    <div>
      <div className="shared_header">
        <h2>Shared Tasks</h2>
      </div>
      <div className="shared_task_body">
        {/* {
          filteredData?.map((shared, index) => (
            <div key={index}>

            </div>
          ))} */}
      </div>
    </div>
  );
};

export default SharedTasks;
