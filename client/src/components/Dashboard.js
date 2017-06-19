import React from 'react';

import AddProject from './AddProject';
import ProjectCard from './ProjectCard';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            fetched: false,
            error: false,
        };
        this.togglePublish = this.togglePublish.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }
    togglePublish(project) {
        project.published = !project.published;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('tokenADM')
            },
            body: JSON.stringify(project)
        };
        fetch(`http://localhost:8080/api/projects/${project._id}`, options)
            .then(res => res.json())
            .then(project => {
                this.setState(prevState => ({
                    ...prevState,
                    projects: prevState.projects.map(p => {
                        if (p._id === project._id) {
                            console.log('HIT');
                            return project
                        }
                        return p
                    })
                }));
            })
            .catch(err => err);
    }
    deleteProject(_id) {
        const options = {
            headers: {
                'x-access-token': localStorage.getItem('tokenADM')
            },
            method: 'DELETE'
        };
        fetch(`http://localhost:8080/api/projects/${_id}`, options)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(res.status)
                }
                return res.text();
            })
            .then(message => {
                alert(message);

                this.setState(prevState => ({
                    ...prevState,
                    projects: prevState.projects.filter(p => p._id !== _id)
                }));
            }).catch(err => console.log(err));
    }
    componentDidMount() {
        // const cachedADMProjects = localStorage.getItem('cachedADMProjects');
        //
        // if (cachedADMProjects !== null) {
        //     return this.setState({ projects: JSON.parse(cachedADMProjects) });
        // } else {
        const options = {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('tokenADM')
            }
        };
        fetch('http://localhost:8080/api/projects', options)
            .then(res => res.json())
            .then(projects => this.setState({ projects, fetched: true }))
            .catch(err => this.setState({ error: true }));
        //}
    }
    render() {
        if (this.state.fetched === false) return <p>Loading...</p>
        if (this.state.error === true ) return null // PANIC
        const projects = this.state.projects.map((project, i) => (
            <ProjectCard
                dashboard
                key={i}
                deleteProject={this.deleteProject}
                togglePublish={this.togglePublish}
                project={project} />
        ));
        return (
            <div>
                <h1>Dashboard</h1>
                { projects }
                <AddProject
                    newProject={() => this.props.history.push('/editor')}
                    length={this.state.projects.length}
                />
            </div>
        );
    }

}

export default Dashboard;
// TODO:
// - create EditorComponent (see medium.com editor **challenge accepted** or nah)
// - Update ProjectCard pour afficher, si currentRoute === '/dashboard' display 'trash', 'edit' buttons
//
