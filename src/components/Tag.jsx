import { Link, useParams, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";

const Tag = () => {
  const params = useParams();
  const { posts, tags } = useOutletContext();
  const searchedTag = tags.find((tag) => tag.name === params.tagName);
  // Find the posts that have the tag
  const tagPosts = posts.filter((post) => post.tags.includes(searchedTag._id));
  const tagPostsList = tagPosts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={"/blog/" + post.title_url}>{post.title}</Link>
        <small>{DateTime.fromISO(post.createdAt).toFormat("MMMM dd")}</small>
      </li>
    );
  });
  return (
    <>
      <h2>Posts tagged &quot;{params.tagName}&quot;</h2>
      <ul>{tagPostsList}</ul>
    </>
  );
};

export default Tag;
