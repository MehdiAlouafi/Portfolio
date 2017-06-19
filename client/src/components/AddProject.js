import React from 'react';

const AddProject = ({ length, newProject }) => {
    const label = length === 0 ? 'Pas encore de projets, addOne' : 'addOne';
    return <button onClick={newProject} className='add_project'>{label}</button>
}

export default AddProject;
