// src/components/ui/Input.jsx
import React from "react";

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="border p-2 rounded-md w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
