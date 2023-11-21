import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select } from "../index";
import fileUploadService from "../../appwrite/file_service";
import databaseService from "../../appwrite/database_service";
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
    // If the post is already there and user wanted to edit it
    if (post) {
      const file = data.image[0]
        ? fileUploadService.uploadFile(data.image[0])
        : null;
      if (file) {
        fileUploadService.deleteFile(post.featuredImage);
      }
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featurdImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.id}`);
      }
    } //if use panted to create new post
    else {
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
      return (
        value
          .trim()
          .toLowerCase()
          // .replace(/^[a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-")
      );
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

  return (
    <div className="flex justify-center mt-8 mb-28">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex bg-white py-12 justify-center h-auto w-[95%] flex-wrap overflow-x-hidden rounded-xl shadow-post space-y-8 space-x-12"
      >
        <div className="w-2/3 flex flex-col space-y-8">
          <Input
            className=""
            label="Title"
            placeholder=""
            type="text"
            {...register("title", {
              required: true,
            })}
          />
          <Input
            className=""
            label="Slug"
            readOnly={true}
            placeholder=""
            type="text"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-auto max-lg:pr-10 flex flex-col space-y-8">
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                width={300}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-primary text-yellow" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
