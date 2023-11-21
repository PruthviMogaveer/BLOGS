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
        <div>
          {posts.map((post) => {
            <div key={post.$id}>
              <PostCard post={post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
