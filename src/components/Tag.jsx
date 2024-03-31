import { Link, useParams, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";

const Tag = () => {
  const params = useParams();
  const { posts, tags } = useOutletContext();
  const searchedTag = tags.find((tag) => tag.name === params.tagName);

  // Format the createdAt dates using luxon
  const formateDate = (date) => {
    return DateTime.fromISO(date).toFormat("MMMM dd")
  }
  
  // Find the posts that have the tag
  const tagPosts = posts.filter((post) => post.tags.includes(searchedTag._id));
  const tagPostsList = tagPosts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={"/blog/" + post.title_url}>{post.title}</Link>
        <small>{formateDate(post.createdAt)}</small>
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
