import "../styles/postdetails.css";
import PropTypes from "prop-types";
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
        <button className="tag">
          <Link to={`/blog?tags=${tagIdsToTagNames[tagId]}`}>
            {postTag.name}
          </Link>
        </button>
      </li>
    );
  });
  return (
    <>
      <div className="post-details">
        <h3>Post details:</h3>
        <div className="post-tags">
          <b>Tags: </b>
          <ul>{postTags}</ul>
        </div>
        <div className="post-detail">
          <b>Created: </b>
          <small>{formatDate(post.createdAt)}</small>
        </div>
        <div className="post-detail">
          <b>Last edited: </b>
          <small>{formatDate(post.updatedAt)}</small>
        </div>
      </div>
    </>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    title_url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostDetails;
