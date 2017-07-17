import React from 'react';
import FontAwesome from 'react-fontawesome';
const Trash = ({ onClick, style }) => {
    return (
        <span onClick={onClick}>
            <FontAwesome style={style} size='2x' name='times' />
        </span>
    );
};
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: [
                { type: 'paragraph', text: ''}
            ]
        };
        this.handleParagraphChange = this.handleParagraphChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.addParagraph = this.addParagraph.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    addParagraph({ keyCode }) {
        if (keyCode === 13) {
            this.setState(prevState => ({
                ...prevState,
                content: [...prevState.content, { type: 'paragraph', text: '' }]
            }));
        }
    }
    handleParagraphChange(idx, event) {
        const { value } = event.target;
        this.setState(prevState => {
            prevState.content[idx].text = value;
            return prevState
        });
    }
    handleTitleChange(event) {
        const { value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            title: value
        }));
    }
    componentDidMount() {
        const { id: projectId } = this.props.match.params;
        if ( projectId != undefined) {
            fetch(`${window.location.origin}/api/projects/${projectId}`)
                .then(res => res.json())
                .then(project => {
                    const [ p ] = project;
                    delete p._id;
                    this.setState({ ...p, fetched: true, update_mode: true });
                })
                .catch(err => this.setState({ err, fetched: true}));
        }
        document.addEventListener('keydown', this.addParagraph);
    }
    componentWillUnmount() {
        console.log('leaving');
        document.removeEventListener('keydown', this.addParagraph);
    }
    handleUpload(event) {
        const form = new FormData();
        const [ file ] = event.target.files;
        const options = {
            headers: {
                'x-access-token': localStorage.getItem('tokenADM')
            },
            method: 'POST',
            body: form
        };
        form.append('image', file);
        fetch(`${window.location.origin}/api/upload/${this.state.title}`, options)
            .then(res => res.text())
            .then(filename => this.setState(prevState => ({
                ...prevState,
                content: [...prevState.content, { type: 'image', src: filename }]
            })))
            .catch(err => console.log(err));
    }
    deleteElement(idx, event) {
        this.setState(prevState => {
            return {
                ...prevState,
                content: [
                    ...prevState.content.slice(0, idx),
                    ...prevState.content.slice(idx + 1, prevState.content.length)
                ]
            };
        });
    }
    createProject(publish) {
        const { state: body } = this;
        if (publish) {
            body.published = true;
        };
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('tokenADM')
            },
            method: 'POST',
            body: JSON.stringify(this.state)
        };
        console.log(options)
        fetch(`${window.location.origin}/api/projects`, options)
            .then(res => res.json())
            .then(project => alert(project))
            .catch(err => console.log(err));
    }
    renderContent(node, idx) {
        switch (node.type) {
        case 'image':
            return (
                <span key={idx} className='editor__content__img-container'>
                    <img src={`${window.location.origin}/img/${node.src}`} alt=""/>
                    <Trash style={{color: '#333'}} onClick={this.deleteElement.bind(this, idx)} />
                </span>
            );
            break;
        case 'p':
        case 'paragraph':
            return (
                <span key={idx} className='editor__content__p-container'>
                    <textarea
                        placeholder='Begin writing'
                        cols={200}
                        onChange={this.handleParagraphChange.bind(this, idx)}
                        value={node.text} />
                    {idx === 0 ? null : <Trash style={{color: '#333'}} onClick={this.deleteElement.bind(this, idx)} />}
                </span>
            )
            break;
        default:
            return null
        }
    }
    updateProject(publish) {
        const { state: body } = this;
        const { id: projectId } = this.props.match.params;
        if (publish) {
            body.published = true;
        };
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('tokenADM')
            },
            method: 'PUT',
            body: JSON.stringify(this.state)
        };

        fetch('http://localhost:8080/api/projects' + `/${projectId}`, options)
            .then(res => res.json())
            .then(project => alert(JSON.stringify(project)))
            .catch(err => console.log(err));
    }
    render() {
        const createOrUpdateProject = (publish) => this.state.update_mode
            ? this.updateProject.bind(this, publish)
            : this.createProject.bind(this, publish);
        return (
            <div className='editor__content'>
                <span className='editor__content__upload'>
                    <label htmlFor="upload">Upload une image</label>
                    <input onChange={this.handleUpload} id='upload' type='file' accept='image/*'/>
                </span>
                <input
                    placeholder='Title'
                    className='editor__content__title'
                    type='text'
                    value={this.state.title}
                    onChange={this.handleTitleChange} />
                { this.state.content.map(this.renderContent.bind(this)) }
                <div className='editor__content__cta'>
                    <button
                        className='editor__content__cta__save'
                        type='button'
                        onClick={() => createOrUpdateProject(false)()}>Enregistré brouillon</button>
                    <button
                        className='editor__content__cta__publish'
                        type='button'
                        onClick={() => createOrUpdateProject(true)()}>Publié</button>
                </div>
            </div>
        );
    }

}

export default Editor;
