import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth_service";
import { login as authLogin } from "../store/authSlice";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "./index";
import ReactLoading from "react-loading";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm();

  const signup = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.createAccount(data);
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
      setValue("fullName", "");
      setValue("email", "");
      setValue("password", "");
    }
  };

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus, signup]);

  return (
    <div className="w-full flex justify-center items-center p-10 max-lg:mt-10">
      <div className="relative bg-secondary h-[27rem] max-lg:h-[27rem] w-96 flex flex-col items-center justify-center space-y-5 rounded-2xl shadow-3xl">
        <h2 className="font-montserrat font-bold text-2xl max-lg:text-xl text-primary mb-2 max-lg:mb-2">
          Signup
        </h2>
        <div className="">
          <form
            onSubmit={handleSubmit(signup)}
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
                label="Full name"
                type="text"
                placeholder=""
                {...register("fullName", {
                  required: true,
                })}
              />
              <div className="text-red-500 text-sm max-sm:text-xs absolute">
                {errors.fullName && <p>Full name required</p>}
              </div>
            </div>
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
            <Button type="submit">Signup</Button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs text-slate-gray font-montserrat">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Login.
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

export default Signup;
