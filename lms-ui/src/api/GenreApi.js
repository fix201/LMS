import axios from 'axios';
import Config from "../config";

const GenreApi = {
    getAllGenres: function (cb) {
        axios.get(Config.API + '/genres')
            .then(res => {
                cb(res.data);
            })
    },

    getGenre: function (genreId, cb) {
        axios.get(Config.API + '/genres/' + genreId)
            .then(res => {
                cb(res.data);
            })
    },

    updateGenre: (genre, cb)=> {
        axios.post(Config.API + '/genre', genre)
            .then(res => {
                cb(res.data);
            })
    },

    deleteGenre: (genreId, cb) => {
        axios.delete(Config.API + '/genre?id=', genreId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default GenreApi;