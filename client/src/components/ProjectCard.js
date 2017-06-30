import React from 'react';
import { Link } from 'react-router-dom';
import Switch from 'rc-switch';

const ProjectCard = ({ project, dashboard, togglePublish, deleteProject }) => {
    if (dashboard) {
        return (
            <div className='project project__dashboard'>
                <h2>{project.title}</h2>
                <p>{project.addedAt}</p>
                <Switch
                    onClick={() => togglePublish(project)}
                    checked={project.published} />
                <button
                    onClick={() => deleteProject(project._id)}
                    type='button'>
                    <img style={{width: 20}} src='./assets/images/trash.svg' alt='Une poubelle' />
                </button>
                <Link to={`/projects/${project._id}`}>Read</Link>
            </div>
        );
    }
    return (
        <div className='projects__card'>
            <h2>{project.title}</h2>
            <p>{project.addedAt}</p>
            <Link to={`/projects/${project._id}`}>Read</Link>
        </div>
    )
}

export default ProjectCard;
