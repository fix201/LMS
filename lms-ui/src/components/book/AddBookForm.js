import React from 'react';
import BookActions from '../../actions/BookActions';

export class AddBookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            first_name: '',
            last_name: '',
            publisher_name: ''
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAfnChange = this.handleAfnChange.bind(this);
        this.handleAlnChange = this.handleAlnChange.bind(this);
        this.handlePnChange = this.handlePnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleAfnChange(event) {
        this.setState({ first_name: event.target.value });
    }

    handleAlnChange(event) {
        this.setState({ last_name: event.target.value });
    }

    handlePnChange(event) {
        this.setState({ publisher_name: event.target.value });
    }

    handleSubmit(event) {
        var book = {
            title: this.state.title,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            publisherName: this.state.publisher_name
        }
        BookActions.addBook(book)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Add Book</legend>
                <label>
                    Book Name:
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                </label> <br />
                <label>
                    Author First Name:
                    <input type="text" value={this.state.first_name} onChange={this.handleAfnChange} />
                </label> <br />
                <label>
                    Author Last Name:
                    <input type="text" value={this.state.last_name} onChange={this.handleAlnChange} />
                </label> <br />
                <label>
                    Publisher Name:
                    <input type="text" value={this.state.publisher_name} onChange={this.handlePnChange} />
                </label> <br />
                <input type="submit" value="Add" />
            </form>
        );
    }
}
