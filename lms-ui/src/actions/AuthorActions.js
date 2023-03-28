
import AuthorApi from '../api/AuthorApi';
import Dispatcher from '../dispatcher/appDispatcher';

const AuthorsActions = {
    readAuthors: function () {
        AuthorApi.getAllAuthors((authorList) => {
            Dispatcher.dispatch({
                actionType: 'read_authors',
                data: authorList
            })
        })
    },

    deleteAuthor: (authorId) => {
        AuthorApi.deleteAuthor(authorId, (res) => {
            Dispatcher.dispatch({
                actionType: 'delete_author',
                status: res
            })
        })
    },

    updateAuthor: (author) => {
        AuthorApi.updateAuthor(author, (res) => {
            Dispatcher.dispatch({
                actionType: 'update_author',
                status: res
            })
        })
    }

}

export default AuthorsActions;