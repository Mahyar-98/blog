import "../styles/home.css";
import Project from "./Project";
import projectList from "../data/projectList";
import { Link, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";

const Home = () => {
  const { posts } = useOutletContext();
  const blogPosts = posts.map((post) => {
    return (
      <li key={post._id}>
        <Link to={"/blog/" + post.title_url}>{post.title}</Link>
        <small>{DateTime.fromISO(post.createdAt).toFormat("MMMM dd")}</small>
      </li>
    );
  });
  const projects = projectList.map((project) => {
    return <Project key={project.url} project={project} />;
  });
  return (
    <>
      <div className="home__hero">
        <div className="container">
          <div className="intro">
            <p>Hey! My name is</p>
            <h1>Mahyar Erfanian</h1>
            <p className="bio">
              I&apos;m a full-stack web developer based in Montreal
            </p>
            <button>
              <Link to="contact">GET IN TOUCH</Link>
            </button>
          </div>
          <img src="./hero-small.png" alt="" className="hero-img-small" />
          <img src="./hero-large.png" alt="" className="hero-img-large" />
        </div>
      </div>
      <div className="home__blog">
        <h2>Latest blog posts</h2>
        {blogPosts}
      </div>
      <div className="home__projects">
        <h2>Projects</h2>
        {projects}
      </div>
    </>
  );
};

export default Home;
