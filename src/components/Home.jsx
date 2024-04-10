import "../styles/home.css";
import Project from "./Project";
import projectList from "../data/projectList";
import PostInfo from "./PostInfo";
import { Link, useOutletContext } from "react-router-dom";

const Home = () => {
  const { posts } = useOutletContext();
  const blogPosts = posts.slice(0, 3).map((post) => {
    return (
      <li key={post._id}>
        <PostInfo post={post} />
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
            <b>Hey! My name is</b>
            <h1>Mahyar Erfanian</h1>
            <b className="bio">
              I&apos;m a full-stack web developer based in Montreal
            </b>
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
          <h2>ABOUT</h2>
          <div className="home__about-text">
            <p>
              Hey there! I&apos;m Mahyar Erfanian (he/they), an engineer turned
              web developer specializing in both MERN stack and Ruby on Rails!
            </p>
            <p>
              During my M.Sc. studies in biomedical engineering, I became aware
              of my true passion for coding and chose to pursue this passion as
              a career. I completed{" "}
              <a
                className="underlined"
                href="https://www.theodinproject.com/"
                target="__blank"
              >
                The Odin Project
              </a>
              &apos;s curriculum, leading to the creation of this website that
              serves as a way for me to showcase my selected projects and share
              my insights through blog posts, offering a glimpse into my journey
              in web development.
            </p>
            <p>
              Based in Montreal, I&apos;m eager to collaborate on challenging
              projects. Let&apos;s team up and bring your ideas to life!
            </p>
          </div>
          <Link className="underlined" to="/about">
            Read more
          </Link>
        </div>
      </section>
      <section className="home__projects" id="home__projects-variant">
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
          <h2>BLOG</h2>
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
