import React from 'react';
import BookActions from '../../actions/BookActions';

export class UpdateBookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleSubmit(event) {
        
        var book = {
            bookId: this.props.book.book_id,
            bookName: this.state.title
        }
        BookActions.updateBook(book)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Update Book</legend>
                <label>
                    Book Name:
                        <input type="text" value={this.state.title} onChange={this.handleChange} placeholder={this.props.book.title} />
                </label> <br />
                <input type="submit" value="Update" />
            </form>
        );
    }
}
