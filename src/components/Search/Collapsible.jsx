import React, { useState } from "react";

const Collapsible = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div
        className="bg-black px-4 py-2 flex items-center justify-between cursor-pointer"
        onClick={handleToggle}
      >
        <h2 className="font-medium text-white">{title}</h2>
        <svg
          className={`w-6 h-6 transition-transform ${
            isExpanded ? "transform rotate-180" : ""
          }`}
          fill="white"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      {isExpanded && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

export default Collapsible;
