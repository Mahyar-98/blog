import "../styles/postinfo.css";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const PostInfo = ({ post }) => {
  const shortenedBody = post.body.slice(0, 200) + "...";

  return (
    <div className="post-info">
      {" "}
      <small>
        {DateTime.fromISO(post.createdAt).toFormat("MMMM dd, yyyy")}
      </small>
      <b>
        <Link to={"/blog/" + post.title_url}>{post.title}</Link>
      </b>
      <div dangerouslySetInnerHTML={{ __html: shortenedBody }}></div>
    </div>
  );
};

export default PostInfo;
