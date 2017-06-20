import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: [
                { type: 'p', text: ''}
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
                content: [...prevState.content, { type: 'p', text: '' }]
            }));
        }
    }
    handleParagraphChange(event, idx) {
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
            method: 'POST',
            body: form
        };
        form.append('image', file);
        fetch(`http://localhost:8080/api/upload/${this.state.title}`, options)
            .then(res => res.text())
            .then(filename => this.setState(prevState => ({
                ...prevState,
                content: [...prevState.content, { type: 'image', src: filename }]
            })))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <div className='editor__content'>
                    <input
                        type='text'
                        value={this.state.title}
                        onChange={this.handleTitleChange} />
                    { this.state.content.map((p, i) => {
                        return (
                            <input
                                type='text'
                                key={i}
                                onChange={(e) => this.handleParagraphChange(e, i)}
                                value={p.text} />
                            )
                    })}
                    <label htmlFor="upload">YPLOAD</label>
                    <input onChange={this.handleUpload} id='upload' type='file' accept='image/*'/>
                </div>
            </div>
        );
    }

}

export default Editor;
