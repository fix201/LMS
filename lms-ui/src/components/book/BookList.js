import React from 'react';
import PropTypes from 'prop-types';
import {BookForm} from './BookForm';

export class BookList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            book: null
        }
    }

    handleView = (book) => {
        this.setState({ book: book, showDetailsForm: true });
    }

    handleUpdate = (book) => {
        this.setState((prevState) => ({
            book: book,
            showUpdateForm: !prevState.showUpdateForm
        }));
    };

    handleAdd = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm
        }));
    }

    resetForm = () => {
        this.setState({
            showAddForm: false,
            showUpdateForm: false,
            showDetailsForm: false,
            book: null
        });
    }

    handleDelete = (book) => {
        this.props.deleteBook(book.id);
    }

    handleSubmit = (book) => {
        book?.id ? this.props.updateBook(book) : this.props.addBook(book);
        this.resetForm();
    }

    createBookRow(book, index) {
        return (
            <tr key={index}>
                <td onClick={() => this.handleView(book)}> {index + 1} </td>
                <td onClick={() => this.handleView(book)}> {book.title} </td>
                <td onClick={() => this.handleView(book)}> {book.language} </td>
                <td onClick={() => this.handleView(book)}> {book.publisher.name} </td>
                <td onClick={() => this.handleView(book)}> {book.isbn} </td>
                <td>
                    <button onClick={() => this.handleUpdate(book)} className="btn btn-info">Update </button>
                    <button style={{marginLeft: "10px"}} onClick={() => this.handleDelete(book)} className="btn btn-danger">Delete </button>
                </td>
            </tr>

        );
    }

    createBookDashboardRow(book, index) {
        return (
            <tr key={index}>
                <td> {index + 1} </td>
                <td> {book.title} </td>
                <td> {book.language} </td>
                <td> {book.publisher.name} </td>
            </tr>
        );
    }

    render() {
        return (
            <div className={"m-3 container"}>
                <h1 className="text-center">Books</h1>
                {
                    !this.props?.dashboard &&
                    <div className = "row">
                        <button onClick={() => this.handleAdd()} className="btn btn-primary" > Add Book</button>
                    </div>
                }
                <br></br>
                <div className="row">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Language</th>
                            <th>Publisher</th>
                            {
                                !this.props?.dashboard &&
                                (
                                    <>
                                        <th>ISBN</th>
                                        <th>Actions</th>
                                    </>
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props?.dashboard ?
                                this.props.bookList.map(this.createBookDashboardRow, this) :
                                this.props.bookList.map(this.createBookRow, this)
                        }
                        </tbody>
                    </table>
                </div>
                <div>
                    <div>
                        {this.state.showUpdateForm && <BookForm book={this.state.book}
                                                                  showUpdateForm={this.state.showUpdateForm}
                                                                  onSubmit={this.handleSubmit}
                                                                  onClose={this.resetForm}
                        />
                        }
                    </div>
                    <div>
                        {this.state.showAddForm && <BookForm onSubmit={this.handleSubmit}
                                                               showAddForm={this.state.showAddForm}
                                                               onClose={this.resetForm}
                        />
                        }
                    </div>
                    <div>
                        {this.state.showDetailsForm && <BookForm book={this.state.book}
                                                                   onClose={() => this.setState({ showDetailsForm: false })}
                                                                   showDetails={this.state.showDetailsForm}
                        />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
};



