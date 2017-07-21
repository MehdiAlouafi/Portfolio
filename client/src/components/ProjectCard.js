import React from 'react';
import { Link } from 'react-router-dom';
import Switch from 'rc-switch';
import FontAwesome from 'react-fontawesome';

const Edit = ({ to, style }) => {
    return (
        <Link className='controls__trash' to={to}>
            <FontAwesome style={style} size='2x' name='pencil' />
        </Link>
    );
};

const ProjectCard = ({ className, project, dashboard, togglePublish, deleteProject }) => {
    if (dashboard) {
        return (
            <div className={`${className} project`}>
                <div className="meta">
                    <Link to={`/projects/${project._id}`}>
                        <h2 className='title f3-m'>{project.title}</h2>
                    </Link>
                    <p className='date'>{project.addedAt}</p>
                </div>
                <div className="controls">
                    <Switch
                        className='controls__switch'
                        onClick={() => togglePublish(project)}
                        checked={project.published} />
                        <button
                            className='controls__trash'
                            onClick={() => deleteProject(project._id)}
                            type='button'>
                            <img style={{width: 20}} src='./assets/images/trash.svg' alt='Une poubelle' />
                        </button>
                        <Edit to={`/editor/${project._id}`} style={{color: '#333'}} />
                        <Link className="controls__link" to={`/projects/${project._id}`}>Read</Link>
                </div>
            </div>
        );
    }
    return (
        <div className='projects__card'>
            <h2 className='projects__card__title'>{project.title}</h2>
            <p className='projects__card__date'>{project.addedAt}</p>
            <Link className='projects__card__link' to={`/projects/${project._id}`}>Read</Link>
        </div>
    )
}

export default ProjectCard;
