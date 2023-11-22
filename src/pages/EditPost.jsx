import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import databaseService from "../appwrite/database_service";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        post && setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div>
      <PostForm post={post} />
    </div>
  ) : null;
};

export default EditPost;
