import React from 'react';
import AuthorActions from '../../actions/AuthorActions';

export class AddAuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { author: null };

        this.handleFnChange = this.handleFnChange.bind(this);
        this.handleLnChange = this.handleLnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFnChange(event) {
        this.setState({ author: event.target.value});
    }

    handleLnChange(event) {
        this.setState({  author: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state.author)
        // AuthorActions.addAuthor(author)
        // alert('A name was submitted: ' + author.first_name);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Add Author</legend>
                <label>
                    First Name:
                        <input type="text" value={this.state.author} onChange={this.handleFnChange} />
                </label> <br/>
                <label>
                    Last Name:
                        <input type="text" value={this.state.author} onChange={this.handleLnChange} />
                </label>  <br/>
                <input type="submit" value="Add" />
            </form>
        );
    }
}
