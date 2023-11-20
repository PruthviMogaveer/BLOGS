import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select } from "../index";
import authService from "../../appwrite/auth_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post ? { post } : "",
        slug
      },
    });

  return <div></div>;
};

export default PostForm;
