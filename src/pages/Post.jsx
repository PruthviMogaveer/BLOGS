import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database_service";
import fileUploadService from "../appwrite/file_service";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button } from "../components";

const Post = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const isAuth = post && userData ? post.userData === userData.$id : false;

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        fileUploadService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className=" w-[95%] h-full">
        <Container>
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-post p-14 flex flex-wrap flex-col justify-center items-center">
            <div className="w-[70rem] flex flex-wrap relative">
              <img
                src={fileUploadService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="object-cover w-full rounded-xl"
              />
              {isAuth && (
                <div className="absolute top-2 right-8 flex flex-wrap space-x-8">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-primary" className="text-white">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    bgColor="bg-red-600"
                    className="text-white"
                    onClick={deletePost}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="relative flex flex-wrap justify-start p-2 w-full my-5">
              <h2 className="font-montserrat font-extrabold text-2xl">
                {post.title}
              </h2>
            </div>
            <div className="w-full flex flex-wrap justify-start p-2">
              {post.content}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Post;
