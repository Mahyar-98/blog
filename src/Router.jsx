import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Posts from "./components/Posts";
import Post from "./components/Post";

const Router = () => {
  const router = createBrowserRouter([
    {
      errorElement: <Error404 />,
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/blog",
          element: <Blog />,
          children: [
            {
              path: "/blog",
              element: <Posts />,
            },
            {
              path: "/blog/:postTitle",
              element: <Post />,
            },
          ],
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
