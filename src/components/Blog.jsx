import { Link, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";

const Blog = () => {
  const { posts, tags } = useOutletContext();
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
