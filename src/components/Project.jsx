const Project = ({ project }) => {
  return (
    <>
      <b>{project.name}</b>
      <button>
        <a href={project.url} target="_blank">
          Source
        </a>
      </button>
      {project.demo ? (
        <button>
          <a href={project.demo} target="_blank">
            Demo
          </a>
        </button>
      ) : null}
    </>
  );
};

export default Project;
