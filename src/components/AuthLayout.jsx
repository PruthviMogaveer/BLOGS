import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // if(authStatus){
    //     navigate("/")
    // }else if(authStatus === false){
    //     navigate("/login")
    // }
    // same as above to check authentication

    if (authentication && authStatus != authentication) {
      navigate("/login");
    } else if (!authentication && authStatus != authentication) {
      navigate("/");
    }
    setLoading(true);
  }, [authStatus, navigate, authentication]);

  return loading ? <p>loading</p> : <>{children}</>;
};
