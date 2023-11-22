import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/database_service";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseService.getPosts([]).then((posts) => {
      posts && setPosts(posts.documents);
    });
  }, []);

  return (
    <div>
      <Container>
        <div className="flex flex-wrap justify-center max-sm:flex-col max-sm:justify-center mt-8 mx-10 max-sm:items-center max-sm:space-y-10">
          {posts.map((post) => {
            return (
              post.status === "active" && (
                <div key={post.$id} className="mx-4 mb-16">
                  <PostCard {...post} />
                </div>
              )
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
