import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PostDetails from "./PostDetails";
import Comment from "./Comment";

const Post = () => {
  const params = useParams();
  const { posts } = useOutletContext();
  const post = posts.find((post) => post.title_url === params.postTitle);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts/" + params.postTitle + "/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [params.postTitle]);

  const postComments = comments.map((comment) => {
    return <Comment key={comment._id} comment={comment} />;
  });

  return (
    <>
      {post && (
        <>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          <PostDetails post={post} />
          <h2>Comments</h2>
          {postComments}
        </>
      )}
    </>
  );
};

export default Post;
