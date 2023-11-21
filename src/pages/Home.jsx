import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database_service";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseService
      .getPosts()
      .then((posts) => posts && setPosts(posts.documents));
  }, []);

  if (posts.length === 0) {
    return (
      <Container>
        <div className="flex flex-wrap justify-center items-center mt-20">
          <h2 className="font-bold text-primary font-montserrat text-xl text-center bg-white w-3/4 py-12 rounded-lg shadow-post">
            Login to view posts
          </h2>
        </div>
      </Container>
    );
  } else {
    <Container>
      <div className="flex flex-wrap ">
        {posts.map((post) => {
          <div key={post.$id}>
            <PostCard {...post} />
          </div>;
        })}
      </div>
    </Container>;
  }
};

export default Home;
