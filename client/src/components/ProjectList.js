import React from 'react';
import ProjectCard from './ProjectCard';
import ProjectPage from './ProjectPage';
import Loader from './Loader';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            hasFetched: false
        };
    }
    componentDidMount() {
        // const cachedProjects = localStorage.getItem('projects');
        // if (cachedProjects !== null) {
        //     this.setState({ projects: JSON.parse(cachedProjects) });
        // } else {
        //     console.log('FETCHING');
            fetch(`${window.location.origin}/api/allProjects`)
                .then(res => res.json())
                .then(projects => this.setState({ projects, hasFetched: true }))
                .catch(err => this.setState({ hasFetched: true, err }));
        // }
    }
    render() {
        if (!this.state.hasFetched) return <Loader />
        return (
            <div className='projects'>
                <h1>Project List</h1>
                { this.state.projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        project={project} />
                )) }
            </div>
        );
    }

}

export default ProjectList;
