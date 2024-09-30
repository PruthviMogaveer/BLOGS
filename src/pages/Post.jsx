import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database_service";
import fileUploadService from "../appwrite/file_service";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Loader } from "../components";
import parse from "html-react-parser";
import authService from "../appwrite/auth_service";

const Post = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (slug) {
      console.log(slug)
      databaseService.getPost(slug).then((post) => {
        if (post) {
          authService
            .getCurrentUser()
            .then((userData) => setUserId(userData.$id));
          setPost(post);
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/");
        }
      });
    } else {
      setLoading(false);
      navigate("/");
    }
  }, [slug, navigate]);

  const isAuth = post && userId ? post.userId === userId : false;

  const deletePost = () => {
    setLoading(true);

    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        fileUploadService.deleteFile(post.featuredImage);
        navigate("/");
        setLoading(false);
      }
    });
  };

  return !loading ? (
    post ? (
      <div className=" flex justify-center items-center ">
        <div className=" w-[95%] h-full">
          <Container>
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-post p-14 flex flex-wrap flex-col justify-center items-center">
              <div className=" flex flex-wrap relative">
                <img
                  src={fileUploadService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="object-cover  rounded-xl h-[30rem] object-postimage w-[70rem] "
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
                {parse(post.content)}
              </div>
            </div>
          </Container>
        </div>
      </div>
    ) : null
  ) : (
    <Loader />
  );
};

export default Post;
