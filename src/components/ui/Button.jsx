// src/components/ui/Button.jsx
import React from "react";

const Button = ({ children, onClick, variant = "default" }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium";
  const styles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  };

  return (
    <button className={`${baseStyle} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
