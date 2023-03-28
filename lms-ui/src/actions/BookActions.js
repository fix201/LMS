
import BookApi from '../api/BookApi';
import Dispatcher from '../dispatcher/appDispatcher';

//Here add all crud actions for Books

const BooksActions = {
    readBooks: function () {
        BookApi.getAllBooks((bookList) => {
            Dispatcher.dispatch({
                actionType: 'read_books',
                data: bookList
            })
        })
    },

    deleteBook: (bookId) => {
        BookApi.deleteBook(bookId, (res) => {
            Dispatcher.dispatch({
                actionType: 'delete_book',
                status: res
            })
        })
    },

    updateBook: (book) => {
        BookApi.updateBook(book, (res) => {
            Dispatcher.dispatch({
                actionType: 'update_book',
                status: res
            })
        })
    }

}

export default BooksActions;