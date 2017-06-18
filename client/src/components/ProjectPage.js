import React from 'react';

class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            project: []
        };
    }
    componentDidMount() {
        const projectsCached = JSON.parse(localStorage.getItem('projects'));
        const { id: projectId } = this.props.match.params;
        if (projectsCached !== null) {
            this.setState(prevState => ({
                fetched: true,
                project: projectsCached.filter(p => p._id === projectId)
            }))
        } else {
            fetch(`http://localhost:8080/api/projects/${projectId}`)
                .then(res => res.json())
                .then(project => this.setState({ project, fetched: true }))
                .catch(err => console.log(err));
        }
    }
    render() {
        if (this.state.fetched !== true) return <p>Loading...</p>
        return (
            <div>
                <h1>porject page</h1>
            </div>
        );
    }

}

export default ProjectPage;
