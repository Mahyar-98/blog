import { Link, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";
import { useMemo } from "react";

const PostDetails = ({ post }) => {
  const { tags } = useOutletContext();
  const tagIdsToTagNames = useMemo(() => {
    return tags.reduce((map, tag) => {
      map[tag._id] = tag.name;
      return map;
    }, {});
  }, [tags]);
  const formatDate = (date) => DateTime.fromISO(date).toFormat("MMMM dd, yyyy");

  const postTags = post.tags.map((tagId) => {
    const postTag = tags.find((tag) => tag._id === tagId);
    return (
      <li key={tagId}>
        <Link to={`/blog?tags=${tagIdsToTagNames[tagId]}`}>{postTag.name}</Link>
      </li>
    );
  });
  return (
    <>
      <div>
        <h3>Post details</h3>
        <b>Last edited: </b>
        <small>{formatDate(post.updatedAt)}</small>
        <b>Created: </b>
        <small>{formatDate(post.createdAt)}</small>
        <b>Tags: </b>
        <ul>{postTags}</ul>
      </div>
    </>
  );
};

export default PostDetails;
