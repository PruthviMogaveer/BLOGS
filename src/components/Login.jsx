import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth_service";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ReactLoading from "react-loading";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setValue("email", null);
      setValue("password", "");
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-10 max-lg:mt-10">
      <div className="relative bg-secondary h-96 max-lg:h-[22rem] w-96 flex flex-col items-center justify-center space-y-5 rounded-2xl shadow-3xl">
        <h2 className="relative font-montserrat font-bold text-2xl max-lg:text-xl text-primary mb-2 max-lg:mb-2">
          Login
        </h2>
        <div className="">
          <form
            onSubmit={handleSubmit(login)}
            className="flex flex-col space-y-9"
          >
            {loading && (
              <div className="absolute z-10 bg-white opacity-60 left-0 top-0 rounded-2xl w-full h-full flex justify-center items-center">
                <ReactLoading
                  type="bars"
                  color="black"
                  height={80}
                  width={70}
                />
              </div>
            )}

            <div className="relative z-0">
              <Input
                label="E-mail"
                type="email"
                placeholder=""
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email address",
                  },
                })}
              />
              <div className="text-red-500 text-sm max-sm:text-xs absolute">
                <ErrorMessage errors={errors} name="email" />
              </div>
            </div>
            <div className="relative z-0">
              <Input
                label="Password"
                type="password"
                placeholder=""
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "Enter valid password",
                  },
                })}
              />
              <div className="text-red-500 text-sm max-sm:text-xs absolute">
                <ErrorMessage errors={errors} name="password" />
              </div>
            </div>
            <Button type="submit">Login</Button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs text-slate-gray font-montserrat">
            Don't have account?{" "}
            <Link to="/signup" className="font-semibold text-primary">
              Signup.
            </Link>
          </p>
          {error && (
            <p className="text-sm max-sm:text-xs relative top-2 text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
