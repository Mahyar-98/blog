import { useState } from "react";
import CommentForm from "./CommentForm";

const Comment = ({ postTitle, comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  return (
    <li
      key={comment._id}
      className={comment.parentComment ? "childComment" : ""}
    >
      <strong>
        {comment.website ? (
          <a href={comment.website}>{comment.name}</a>
        ) : (
          comment.name
        )}
      </strong>
      <small>commented on {comment.createdAt}</small>
      <p>{comment.body}</p>
      {isReplying ? (
        <>
          <CommentForm postTitle={postTitle} commentId={comment._id} />
          <button onClick={() => setIsReplying(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsReplying(true)}>Reply</button>
      )}
    </li>
  );
};

export default Comment;
