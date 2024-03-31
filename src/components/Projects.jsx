import "../styles/projects.css";
import Project from "./Project";
import projectList from "../data/projectList";

const Projects = () => {
  const projects = projectList.map((project) => {
    return <Project key={project.url} project={project} />;
  });
  return (
    <>
      <h2>Projects</h2>
      {projects}
    </>
  );
};

export default Projects;
