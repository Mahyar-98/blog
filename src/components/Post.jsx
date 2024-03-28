import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const Post = () => {
  const params = useParams();
  const [post, setPosts] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts/" + params.postTitle)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, [params.postTitle]);
  useEffect(() => {
    fetch("http://localhost:3000/posts/" + params.postTitle + "/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [params.postTitle]);
  const postComments = comments.map(comment => {
    return <Comment key={comment._id} comment={comment}/>
  })
  return (
    <>
      {post && (
        <>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          <h2>Comments</h2>
          {postComments}
        </>
      )}
    </>
  );
};

export default Post;