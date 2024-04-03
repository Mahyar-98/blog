import { Outlet, useOutletContext } from "react-router-dom";

const Blog = () => {
  const { posts, tags } = useOutletContext();
  return (
    <>
      <div className="title">
        <div className="container container-small">
          <h2>BLOG</h2>
        </div>
      </div>
      <div className="container container-small">
        <Outlet context={{ posts, tags }} />
      </div>
    </>
  );
};

export default Blog;
