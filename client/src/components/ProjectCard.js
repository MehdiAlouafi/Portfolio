import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    return (
        <div className='project'>
            <h1>{project.title}</h1>
            <p>{project.addedAt}</p>
            <Link to={`/projects/${project._id}`}>Read</Link>
        </div>
    )
}

export default ProjectCard;
