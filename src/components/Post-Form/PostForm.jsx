import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select } from "../index";
import authService from "../../appwrite/auth_service";
import fileUploadService from "../../appwrite/file_service";
import databaseService, {
  DatabaseService,
} from "../../appwrite/database_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? fileUploadService.uploadFile(data.image[0])
        : null;
      if (file) {
        fileUploadService.deleteFile(post.featuredImage);
      }
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featurdImage: file ? file.id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.id}`);
      }
    } else {
      const file = data.image[0]
        ? fileUploadService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featurdImage = fileId;
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return <div></div>;
};

export default PostForm;
