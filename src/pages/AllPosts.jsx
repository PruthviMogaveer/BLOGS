import React, { useState, useEffect, useMemo } from "react";
import { Container, Loader, PostCard } from "../components";
import databaseService from "../appwrite/database_service";

const AllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseService.getPosts([]).then((posts) => {
      posts && setPosts(posts.documents);
      setLoading(false);
    });
  }, []);

  // Memoize the posts mapping logic to prevent recalculating it on every render
  const activePosts = useMemo(() => {
    return posts.filter(post => post.status === "active");
  }, [posts]);

  return !loading ? (
    activePosts.length > 0 ? (
      <div>
        <Container>
          <div className="flex flex-wrap justify-center max-sm:flex-col max-sm:justify-center mt-8 mx-10 max-sm:items-center max-sm:space-y-10">
            {activePosts.map((post) => (
              <div key={post.$id} className="mx-4 mb-16">
                <PostCard {...post} />
              </div>
            ))}
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

export default AllPosts;
