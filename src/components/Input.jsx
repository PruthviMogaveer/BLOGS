import React, { useId } from "react";
import { forwardRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const [passVisible, setPassVisible] = useState(false);
  const id = useId();

  const handleVisible = () => {
    setPassVisible((prev) => !prev);
  };

  return (
    <div className={` relative z-10 font-montserrat flex flex-col sm:w-72`}>
      <input
        type={type == "password" ? (!passVisible ? type : "text") : type}
        className={`${className} font-montserrat block w-full px-0 py-2 text-sm max-lg:text-sm text-primary bg-transparent ${
          (type === "password" ||
          type === "search" ||
          type === "email" ||
          type === "text") && "border-0 border-b-2 border-slate-gray"
        }  appearance-none outline-none focus:ring-0 focus:border-primary duration-300 peer`}
        ref={ref}
        {...props}
        id={id}
      />
      <div className="absolute right-1 top-2 cursor-pointer">
        {type == "password" ? (
          passVisible ? (
            <div onClick={handleVisible}>
              <VisibilityIcon fontSize="small" />
            </div>
          ) : (
            <div onClick={handleVisible}>
              <VisibilityOffIcon fontSize="small" />
            </div>
          )
        ) : (
          <></>
        )}
      </div>
      {label && (
        <label
          className={` absolute text-sm text-slate-gray duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            props.readOnly
              ? "-translate-y-6"
              : "peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:start-0 peer-focus:text-primary"
          } rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
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
