import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="absolute z-10 w-full h-[81%] bg-white opacity-40 -top-28 "></div>
      <ReactLoading
        type="bars"
        color="black"
        height={120}
        width={120}
        className="relative top-20"
      />
    </div>
  );
};

export default Loader;
