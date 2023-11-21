import React, { useId, forwardRef } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full font-montserrat relative">
      {label && (
        <label
          htmlFor={id}
          className={`absolute -translate-y-6 scale-75  text-primary origin-[0]`}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${className} border border-primary w-full h-10 font-montserrat text-base font-medium rounded-[4px] px-2 capitalize bg-transparent`}
        {...props}
        ref={ref}
      >
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
