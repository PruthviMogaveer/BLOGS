import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database_service";
import authService from "../appwrite/auth_service";
import { Container, Loader, PostCard } from "../components";

const MyPost = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      databaseService.getUserPosts(userData.$id).then((posts) => {
        setPosts(posts.documents);
        setLoading(false);
      });
    });
  }, []);

  return !loading ? (
    posts.length > 0 ? (
      <div>
        <Container>
          <div className="flex flex-wrap justify-center max-sm:flex-col max-sm:justify-center mt-8 mx-10 max-sm:items-center max-sm:space-y-10">
            {posts.map((post) => {
              return (
                <div key={post.$id} className="relative mb-16 mx-4">
                  {post.status === "inactive" && (
                    <div className="absolute z-10 bg-primary px-5 py-0 right-3 rounded-b-lg rounded-t-sm text-yellow ">
                      <p className="font-thin text-sm font-montserrat">
                        Inactive
                      </p>
                    </div>
                  )}
                  <PostCard {...post} />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    ) : (
      <Container>
        <div className="flex flex-wrap justify-center items-center mt-20">
          <h2 className="font-bold text-primary font-montserrat text-xl text-center bg-white w-3/4 py-12 rounded-lg shadow-post">
            There is no post to view
          </h2>
        </div>
      </Container>
    )
  ) : (
    <Loader />
  );
};

export default MyPost;
