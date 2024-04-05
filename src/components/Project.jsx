import "../styles/project.css";
import PropTypes from "prop-types";

const Project = ({ project }) => {
  return (
    <div className="project">
      <div className="project__left-side">
        <div className="project__info">
          <b>{project.name}</b>
          <p>{project.description}</p>
        </div>
        <div className="project__btns large-screen">
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
        </div>
      </div>

      <img src={project.preview} alt="Project preview" />
      <div className="project__btns small-screen">
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
      </div>
    </div>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    demo: PropTypes.string,
    preview: PropTypes.string.isRequired,
  }).isRequired,
};

export default Project;
