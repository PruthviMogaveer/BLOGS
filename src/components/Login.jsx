import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Select } from "./index";
import { useDispatch } from "react-redux";
import databaseService from "../appwrite/database_service";
import authService from "../appwrite/auth_service";
import fileUploadService from "../appwrite/file_service";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-10">
      <div className=" bg-secondary h-96 w-96 flex flex-col items-center justify-center space-y-5 rounded-2xl shadow-3xl">
        <h2 className="font-montserrat font-bold text-2xl text-primary mb-8">Login</h2>
        <div className="">
          <form
            onSubmit={handleSubmit(login)}
            className="flex flex-col space-y-7"
          >
            <Input label="Username" type="text" placeholder="" />
            <Input label="Password" type="password" placeholder="" />
            <Button type="submit">Login</Button>
          </form>
        </div>
        <div>
            <p className="text-xs text-slate-gray font-montserrat">Don't have account? <Link to="/logout" className="font-semibold text-primary">Logout.</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
