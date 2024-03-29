import { Link, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";

const PostDetails = ({ post }) => {
  const { tags } = useOutletContext();
  const formattedDate = DateTime.fromISO(post.updatedAt).toFormat(
    "MMMM dd, yyyy",
  );

  const postTags = post.tags.map((tagId) => {
    const postTag = tags.find((tag) => tag._id === tagId);
    return (
      <li key={tagId}>
        <Link to={"/blog/tags/" + postTag.name}>{postTag.name}</Link>
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
