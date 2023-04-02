import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BookList } from './BookList';
import AppNavbar from "../NavBar";
import {fetchBooks, updateBook, addBook, deleteBook} from "../../actions/BookActions";

class Books extends React.Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        return (
            <div>
                <AppNavbar />
                <BookList bookList={this.props.books}
                            updateBook={this.props.updateBook}
                            addBook={this.props.addBook}
                            deleteBook={this.props.deleteBook
                            }/>
            </div>
        );
    }
}

Books.propTypes = {
    books: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        books: state.bookReducer.books
    }
}

export default connect(mapStateToProps, { fetchBooks, updateBook, addBook, deleteBook })(Books);
