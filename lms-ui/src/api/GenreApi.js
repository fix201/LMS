import axios from 'axios';
import Config from "../config";

const GenreApi = {
    getAllGenres: function (cb) {
        axios.get(Config.api + '/genres')
            .then(res => {
                cb(res.data);
            })
    },

    getGenre: function (genreId, cb) {
        axios.get(Config.api + '/genres/' + genreId)
            .then(res => {
                cb(res.data);
            })
    },

    updateGenre: (genre, cb)=> {
        axios.post(Config.api + '/genre', genre)
            .then(res => {
                cb(res.data);
            })
    },

    deleteGenre: (genreId, cb) => {
        axios.delete(Config.api + '/genre?id=', genreId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default GenreApi;