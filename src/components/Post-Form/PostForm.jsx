import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select, Loader } from "../index";
import fileUploadService from "../../appwrite/file_service";
import databaseService from "../../appwrite/database_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
    reset, // Added reset to reset form values when post changes
  } = useForm({
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
    setLoading(true);
    //while editing the post
    if (post) {
      const file = data.image[0]
        ? await fileUploadService.uploadFile(data.image[0])
        : null;
      if (file) {
        fileUploadService.deleteFile(post.featuredImage);
      }
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } //while adding new post
    else {
      const file = await fileUploadService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }
    return "";
  }, []);

  // Set form values when post is available (for editing)
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.slug || slugTransform(post.title),
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset, slugTransform]);

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

  return !loading ? (
    <div className="flex justify-center mt-8 mb-28">
      <div className="absolute w-[95%] bg-yellow h-6 top-4"></div>
      <div className="absolute w-6 h-full bg-yellow left-[52px] top-0"></div>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex bg-white py-12 justify-center h-auto w-[95%] flex-wrap overflow-x-hidden rounded-xl shadow-post space-y-8 space-x-12"
      >
        <div className="w-2/3 flex flex-col space-y-8">
          <div className="relative">
            <Input
              className=""
              label="Title"
              placeholder=""
              type="text"
              {...register("title", {
                required: true,
              })}
            />
            <div className="text-red-500 text-sm max-sm:text-xs absolute">
              {errors.title && <p>Title required</p>}
            </div>
          </div>
          <div className="relative">
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
            <div className="text-red-500 text-sm max-sm:text-xs absolute">
              {errors.slug && <p>Slug required, go and edit title</p>}
            </div>
          </div>
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-auto max-lg:pr-10 flex flex-col space-y-8">
          <div className="relative">
            <Input
              label="Featured Image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            <div className="text-red-500 -bottom-3 text-sm max-sm:text-xs absolute">
              {errors.image && <p>Featured image required</p>}
            </div>
          </div>
          {post && (
            <div className="w-full mb-4">
              <img
                src={fileUploadService.getFilePreview(post.featuredImage)}
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
  ) : (
    <Loader />
  );
};

export default PostForm;
