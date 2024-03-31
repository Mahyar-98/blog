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
          <p>Hey! My name is</p>
          <h1>Mahyar Erfanian</h1>
          <p>
            I&apos;m an engineer turned passionate self-taught web developer.
            Skilled in both frontend and backend technologies, I love solving
            problems and bringing ideas to life. Let&apos;s collaborate on
            building innovative web solutions!
          </p>
          <img src="./hero.png" alt="" className="hero_img" />
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
