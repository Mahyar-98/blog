import Project from "./Project";
import projectList from "../data/projectList";

const Projects = () => {
  const projects = projectList.map((project) => {
    return <Project key={project.url} project={project} />;
  });
  return (
    <>
      <div className="title">
        <div className="container container-small">
          <h2>PROJECTS</h2>
        </div>
      </div>
      <div className="container">{projects}</div>
    </>
  );
};

export default Projects;
