import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:3000/tags/")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="layout">
      <header>
        <h1>MahyarCodes</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="blog">Blog</Link>
            </li>
            <li>
              <Link to="projects">Projects</Link>
            </li>
            <li>
              <Link to="about">About</Link>
            </li>
          </ul>
          <ul>
            <li>
              <button>Theme</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet context={{ posts, tags }} />
      </main>
      <footer>
        <a href="https://github.com/Mahyar-98" target="_blank">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mahyar-erfanian-67968279/"
          target="_blank"
        >
          LinkedIn
        </a>
      </footer>
    </div>
  );
};

export default Layout;
