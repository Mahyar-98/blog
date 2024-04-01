import "../styles/home.css";
import Project from "./Project";
import projectList from "../data/projectList";
import { Link, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";
import About from "./About";

const Home = () => {
  const { posts } = useOutletContext();
  const blogPosts = posts.slice(0, 3).map((post) => {
    const shortenedBody = post.body.slice(0, 200) + "...";
    return (
      <li key={post._id} className="home__post">
                <small>{DateTime.fromISO(post.createdAt).toFormat("MMMM dd, yyyy")}</small>
        <b><Link to={"/blog/" + post.title_url}>{post.title}</Link></b>
        <div dangerouslySetInnerHTML={{ __html: shortenedBody }}></div>
      </li>
    );
  });
  const projects = projectList.map((project) => {
    if (project.showInHomepage) {
      return <Project key={project.url} project={project} />;
    }
  });
  return (
    <>
      <section className="home__hero">
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
      </section>
      <section className="home__about">
        <div className="container container-small">
          <About />
        </div>
      </section>
      <section className="home__projects">
        <div className="container">
          <h2>PROJECTS</h2>
          {projects}
          <Link to="projects" className="underlined">
            View more
          </Link>
        </div>
      </section>
      <section className="home__blog">
        <div className="container container-small">
          <h2>Blog posts</h2>
          {blogPosts}
          <Link to="blog" className="underlined">
            View more
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
