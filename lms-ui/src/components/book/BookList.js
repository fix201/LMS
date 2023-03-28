import React from 'react';
import PropTypes from 'prop-types';
import BookActions from "../../actions/BookActions";

export class BookList extends React.Component {

    componentDidMount(){
        BookActions.readBooks();
    }
    
    constructor() {
        super()
        this.state = {
            isUpdate: false,
            isAdd: false,
            book: null
        }
        this.isUpdating = this.isUpdating.bind(this)
        this.isAdding = this.isAdding.bind(this)
    }

    isUpdating(book) {
        this.setState(book);
        this.setState((prevState) => {
            return {
                isUpdate: !prevState.isUpdate
            }
        })

    }

    isAdding(book) {
        this.book = book;
        this.setState((prevState) => {
            return {
                isAdd: !prevState.isAdd
            }
        })

    }

    createBookRow(book, index) {
        return (
            <tr key={index}>
                <td> {index + 1} </td>
                <td> {book.title} </td>
                <td> {book.isbn} </td>
                <td> {book.edition} </td>
                <td> {book.totalPages} </td>
                <td> {book.format} </td>
                <td> {book.language} </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h1>Books</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>ISBN</th>
                            <th>Edition</th>
                            <th>Pages</th>
                            <th>Format</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookList.map(this.createBookRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }

}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired
};