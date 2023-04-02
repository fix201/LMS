
import LibrarianApi from '../api/LibrarianApi';
import Dispatcher from '../dispatcher/appDispatcher';

const LibrariansActions = {
    readLibrarians: function () {
        LibrarianApi.getAllLibrarians((librarianList) => {
            // Dispatcher.dispatch({
            //     actionType: 'read_librarians',
            //     data: librarianList
            // })
        })
    },

    deleteLibrarian: (librarianId) => {
        LibrarianApi.deleteLibrarian(librarianId, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'delete_librarian',
            //     status: res
            // })
        })
    },

    updateLibrarian: (librarian) => {
        LibrarianApi.updateLibrarian(librarian, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'update_librarian',
            //     status: res
            // })
        })
    }

}

export default LibrariansActions;