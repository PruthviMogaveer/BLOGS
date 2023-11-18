import React, { useId } from "react";
import { forwardRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", width = "w-72", ...props },
  ref
) {
  const [passVisible, setPassVisible] = useState(false);
  const id = useId();

  const handleVisible = () => {
    setPassVisible((prev) => !prev);
  };

  return (
    <div
      className={`${width} relative z-10 font-montserrat flex flex-col w-72`}
    >
      <input
        type={type == "password" ? (!passVisible ? type : "text") : type}
        class={`${className} font-montserrat block w-full px-0 py-2 text-sm text-primary bg-transparent border-0 border-b-2 border-slate-gray appearance-none outline-none focus:ring-0 focus:border-primary duration-300 peer`}
        ref={ref}
        {...props}
        id={id}
      />
      <div className="absolute right-1 top-2 ">
        {type == "password" ? (
          passVisible ? (
            <button onClick={handleVisible}>
              <VisibilityIcon fontSize="small" />
            </button>
          ) : (
            <button onClick={handleVisible}>
              <VisibilityOffIcon fontSize="small" />
            </button>
          )
        ) : (
          <></>
        )}
      </div>
      {label && (
        <label
          class={` absolute text-sm text-slate-gray duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
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
