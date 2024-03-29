import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostDetails from "./PostDetails";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Post = () => {
  const params = useParams();
  const { posts } = useOutletContext();
  const [comments, setComments] = useState([]);

  // Find the post among all the posts that matches the slug
  const post = posts.find((post) => post.title_url === params.postTitle);

  // Fetch all the comments for the post being rendered
  useEffect(() => {
    fetch("http://localhost:3000/posts/" + params.postTitle + "/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [params.postTitle]);

  const buildCommentTree = (comments) => {
    const commentMap = {};
    const rootComments = [];

    // Map each comment by its ID for quick access
    comments.forEach((comment) => {
      commentMap[comment._id] = comment;
    });
    // Add child comments to their parent comments
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parentComment = commentMap[comment.parentComment];
        if (parentComment) {
          if (!parentComment.children) {
            parentComment.children = [];
          }
          parentComment.children.push(comment);
        } else {
          // If parent comment not found, treat as root comment
          rootComments.push(comment);
        }
      } else {
        // If no parent comment, treat as root comment
        rootComments.push(comment);
      }
    });
    return rootComments;
  };

  // Render a comment and its children recursively
  const renderCommentWithChildren = (comment, renderedComments) => {
    // Check if the comment has already been rendered
    if (renderedComments.has(comment._id)) {
      return null; // Skip rendering if already rendered
    }

    // Add the comment to the set of rendered comments
    renderedComments.add(comment._id);

    return (
      <div key={comment._id}>
        <Comment postTitle={params.postTitle} comment={comment} />
        {comment.children &&
          comment.children.map((child) =>
            renderCommentWithChildren(child, renderedComments),
          )}
      </div>
    );
  };

  // Create an array of Comment components to show under the post
  const postComments = buildCommentTree(comments).map((comment) =>
    renderCommentWithChildren(comment, new Set()),
  );

  return (
    <>
      {post && (
        <>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          <PostDetails post={post} />
          <h2>Add a comment: </h2>
          <CommentForm postTitle={params.postTitle} />
          <h2>Comments</h2>
          {postComments}
        </>
      )}
    </>
  );
};

export default Post;
