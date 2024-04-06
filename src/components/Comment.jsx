import "../styles/comment.css";
import CommentForm from "./CommentForm";
import PropTypes from "prop-types";
import { useState } from "react";
import { DateTime } from "luxon";

const Comment = ({ postTitle, comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  return (
    <div className="comment" key={comment._id}>
      <div className="comment-content">
        <strong>
          {comment.website ? (
            <a className="hover-opacity" href={comment.website} target="__blank">{comment.name}</a>
          ) : (
            comment.name
          )}
        </strong>
        <small>
          {" "}
          on {DateTime.fromISO(comment.createdAt).toFormat("MMMM dd, yyyy")}:
        </small>
        <p>{comment.body}</p>
        {isReplying ? (
          <>
            <CommentForm
              postTitle={postTitle}
              commentId={comment._id}
              setIsReplying={setIsReplying}
            />
          </>
        ) : (
          <button className="btn reply-btn" onClick={() => setIsReplying(true)}>
            Reply
          </button>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  postTitle: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    website: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
