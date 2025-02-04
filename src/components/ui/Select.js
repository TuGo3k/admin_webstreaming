import React from "react";

const Select = ({ options = [], onChange, value }) => {
  return (
    <select
      className="border p-2 rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.length > 0 ? (
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      ) : (
        <option disabled>No options available</option>
      )}
    </select>
  );
};

export default Select;
