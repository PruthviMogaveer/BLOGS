import React from "react";

const Button = ({
  children,
  type = "Submit",
  bgColor = "bg-yellow",
  textColor = "text-primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`rounded-sm mt-4 font-semibold text-lg max-lg:text-sm active:scale-95 px-5 py-1 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
