import React, { useId } from "react";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="relative flex flex-col w-72">
      <input
        type={type}
        class={`${className} block w-full px-0 py-2 text-sm text-primary bg-transparent border-0 border-b-2 border-slate-gray appearance-none outline-none focus:ring-0 focus:border-primary duration-300 peer`}
        ref={ref}
        {...props}
        id={id}
      />
      {label && (
        <label
          class={` absolute text-sm text-slate-gray  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
});

// outline-none border-b border-slate-gray focus:border-primary bg-transparent relative w-72

export default Input;
