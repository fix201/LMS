import React from 'react';
import AuthorActions from '../../actions/AuthorActions';

export class UpdateAuthorForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { first_name: '', last_name:'' };

        this.handleFnChange = this.handleFnChange.bind(this);
        this.handleLnChange = this.handleLnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFnChange(event) {
        this.setState({ first_name: event.target.value});
    }

    handleLnChange(event) {
        this.setState({  last_name: event.target.value});
    }

    handleSubmit(event) {
        var author = {
            authorId: this.props.author.author_id,
            firstName: this.state.first_name,
            lastName: this.state.last_name
        }
        AuthorActions.updateAuthor(author)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Update Author</legend>
                <label>
                    First Name:
                        <input type="text" value={this.state.first_name} onChange={this.handleFnChange} placeholder={this.props.author.first_name}/>
                </label> <br/>
                <label>
                    Last Name:
                        <input type="text" value={this.state.last_name} onChange={this.handleLnChange} placeholder={this.props.author.last_name}/>
                </label>  <br/>
                <input type="submit" value="Update" />
            </form>
        );
    }
}
