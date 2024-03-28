const Comment = ({ comment }) => {
  console.log(comment.website);
  return (
    <li key={comment._id}>
      <strong>
        {comment.website ? (
          <a href={comment.website}>{comment.name}</a>
        ) : (
          comment.name
        )}
      </strong>
      <small>commented on {comment.createdAt}</small>
      <p>{comment.body}</p>
      <button>Reply</button>
    </li>
  );
};

export default Comment;
