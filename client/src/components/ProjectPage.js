import React from 'react';

import Loader from './Loader';

class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            project: []
        };
    }
    componentDidMount() {
        const { id: projectId } = this.props.match.params;
        fetch(`http://localhost:8080/api/projects/${projectId}`)
            .then(res => res.json())
            .then(project => this.setState({ project: project.pop(), fetched: true }))
            .catch(err => this.setState({ err, fetched: true}));

    }
    renderContent(node, key) {
        switch (node.type) {
        case 'paragraph':
            return <p key={key}>{node.text}</p>;
            break;
        case 'img':
            return <img style={{ height: '300px', width: '100%'}} key={key} src={node.src} />;
            break;
        default:
            return null
        }
    }
    render() {
        if (this.state.fetched !== true) return <p>Loading...</p>
        return (
            <div>
                <h1>{this.state.project.title}</h1>
                { this.state.project.content.map(this.renderContent)}
            </div>
        );
    }

}

export default ProjectPage;
