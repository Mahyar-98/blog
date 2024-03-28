import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const PostDetails = ({ post }) => {
  const formattedDate = DateTime.fromISO(post.updatedAt).toFormat(
    "MMMM dd, yyyy",
  );
  const postTags = post.tags.map((tag) => {
    return (
      <li key={tag._id}>
        <Link to={"/blog/tags/" + tag.name}>{tag.name}</Link>
      </li>
    );
  });
  return (
    <>
      <div>
        <h3>Post details</h3>
        <b>Last edited: </b>
        <small>{formattedDate}</small>
        <b>Tags: </b>
        <ul>{postTags}</ul>
      </div>
    </>
  );
};

export default PostDetails;
