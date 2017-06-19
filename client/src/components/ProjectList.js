import React from 'react';
import ProjectCard from './ProjectCard';
import ProjectPage from './ProjectPage';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentDidMount() {
        // const cachedProjects = localStorage.getItem('projects');
        // if (cachedProjects !== null) {
        //     this.setState({ projects: JSON.parse(cachedProjects) });
        // } else {
        //     console.log('FETCHING');
            fetch(`http://localhost:8080/api/allProjects`)
                .then(res => res.json())
                .then(projects => this.setState({ projects }))
                .catch(err => console.log(err));
        // }
    }
    render() {
        return (
            <div>
                { this.state.projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        project={project}
                    />
                )) }
            </div>
        );
    }

}

export default ProjectList;
