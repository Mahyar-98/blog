import "../styles/postinfo.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const PostInfo = ({ post }) => {
  const shortenedBody = post.body.slice(0, 200) + "...";

  return (
    <div className="post-info">
      <small>
        {DateTime.fromISO(post.createdAt).toFormat("MMMM dd, yyyy")}
      </small>
      <b>
        <Link className="hover-opacity" to={"/blog/" + post.title_url}>
          {post.title}
        </Link>
      </b>
      <div dangerouslySetInnerHTML={{ __html: shortenedBody }}></div>
    </div>
  );
};

PostInfo.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    title_url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostInfo;
