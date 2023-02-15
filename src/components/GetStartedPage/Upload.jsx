import React from "react";
import { Link } from "react-router-dom";

const Upload = ({ styles }) => (
  <Link to="/getstarted">
    <button
      type="button"
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
    >
      Upload
    </button>
  </Link>
);

export default Upload;
