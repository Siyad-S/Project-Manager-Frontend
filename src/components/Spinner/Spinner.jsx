import { Spin, Alert } from "antd";
import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <Spin />
    </div>
  );
};

export default Spinner;
