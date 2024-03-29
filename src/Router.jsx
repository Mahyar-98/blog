import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Projects from "./components/Projects";
import About from "./components/About";
import Post from "./components/Post";
import Tag from "./components/Tag";

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
        },
        {
          path: "/blog/:postTitle",
          element: <Post />,
        },
        {
          path: "/blog/tags/:tagName",
          element: <Tag />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
