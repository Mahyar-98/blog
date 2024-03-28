import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
      fetch("http://localhost:3000/posts/")
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch((err) => console.error(err));
}, []);
  const blogPosts = posts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={"/blog/" + post.title_url}>
          {post.title}
        </Link>
      </li>
    );
  });
  return (
    <>
      <h1>Blog</h1>
      <ul>{blogPosts}</ul>
    </>
  );
};

export default Blog;
