
import GenreApi from '../api/GenreApi';
import Dispatcher from '../dispatcher/appDispatcher';

const GenresActions = {
    readGenres: function () {
        GenreApi.getAllGenres((genreList) => {
            Dispatcher.dispatch({
                actionType: 'read_genres',
                data: genreList
            })
        })
    },

    deleteGenre: (genreId) => {
        GenreApi.deleteGenre(genreId, (res) => {
            Dispatcher.dispatch({
                actionType: 'delete_genre',
                status: res
            })
        })
    },

    updateGenre: (genre) => {
        GenreApi.updateGenre(genre, (res) => {
            Dispatcher.dispatch({
                actionType: 'update_genre',
                status: res
            })
        })
    }
}

export default GenresActions;