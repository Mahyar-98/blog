import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/tags/")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error(err));
  }, []);
  const blogPosts = posts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={"/blog/" + post.title_url}>{post.title}</Link>
        <small>{DateTime.fromISO(post.createdAt).toFormat("MMMM dd")}</small>
      </li>
    );
  });
  const postTags = tags.map((tag) => {
    return (
      <li key={tag._id}>
        <Link to={"/blog/tags" + tag.name}>{tag.name}</Link>
      </li>
    );
  });
  return (
    <>
      <h1>Blog</h1>
      <ul className="tags">{postTags}</ul>
      <ul className="posts">{blogPosts}</ul>
    </>
  );
};

export default Blog;
