import Project from "./Project";
import projectList from "../data/projectList";

const Projects = () => {
  const projects = projectList.map((project) => {
    return <Project key={project.url} project={project} />;
  });
  return (
    <>
      <h1>Projects</h1>
      {projects}
    </>
  );
};

export default Projects;
