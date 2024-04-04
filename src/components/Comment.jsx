import "../styles/comment.css";
import CommentForm from "./CommentForm";
import { useState } from "react";
import { DateTime } from "luxon";

const Comment = ({ postTitle, comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  return (
    <div className="comment" key={comment._id}>
      <div className="comment-content">
        <strong>
          {comment.website ? (
            <a href={comment.website}>{comment.name}</a>
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

export default Comment;
