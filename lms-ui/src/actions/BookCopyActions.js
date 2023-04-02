import BookCopyApi from '../api/BookCopyApi';

//Here add all crud actions for BookCopys

const BookCopysActions = {
    readBookCopy: function () {
        BookCopyApi.getAllBookCopys((bookCopyList) => {
            // Dispatcher.dispatch({
            //     actionType: 'read_bookCopys',
            //     data: bookCopyList
            // })
        })
    },

    deleteBookCopy: (bookCopyId) => {
        BookCopyApi.deleteBookCopy(bookCopyId, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'delete_bookCopy',
            //     status: res
            // })
        })
    },

    updateBookCopy: (bookCopy) => {
        BookCopyApi.updateBookCopy(bookCopy, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'update_bookCopy',
            //     status: res
            // })
        })
    }

}

export default BookCopysActions;