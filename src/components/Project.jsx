import "../styles/project.css";

const Project = ({ project }) => {
  return (
    <div className="project">
      <div className="project__left-side">
        <div className="project__info">
          <b>{project.name}</b>
          <p>{project.description}</p>
        </div>
        <div className="project__btns large-screen">
          <button className="btn">
            <a href={project.url} target="_blank">
              Source
            </a>
          </button>
          {project.demo ? (
            <button className="btn">
              <a href={project.demo} target="_blank">
                Demo
              </a>
            </button>
          ) : null}
        </div>
      </div>

      <img src={project.preview} alt="Project preview" />
      <div className="project__btns small-screen">
        <button className="btn">
          <a href={project.url} target="_blank">
            Source
          </a>
        </button>
        {project.demo ? (
          <button className="btn">
            <a href={project.demo} target="_blank">
              Demo
            </a>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Project;
