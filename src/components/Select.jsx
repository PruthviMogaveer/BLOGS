import React, { useId, forwardRef } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full font-montserrat">
      {label && (
        <label htmlFor={id} className={``}>
          {label}
        </label>
      )}
      <select id={id} className={`${className}`} {...props} ref={ref}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// another syntax of using forwardRef
export default forwardRef(Select);
