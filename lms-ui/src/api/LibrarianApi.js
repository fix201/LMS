import axios from 'axios';
import Config from "../config";

const LibrarianApi = {
    getAllLibrarians: function (cb) {
        axios.get(Config.api + '/librarians')
            .then(res => {
                cb(res.data);
            })
    },

    getLibrarian: function (librarianId, cb) {
        axios.get(Config.api + '/librarians/' + librarianId)
            .then(res => {
                cb(res.data);
            })
    },

    updateLibrarian: (librarian, cb)=> {
        axios.post(Config.api + '/librarian', librarian)
            .then(res => {
                cb(res.data);
            })
    },

    deleteLibrarian: (librarianId, cb) => {
        axios.delete(Config.api + '/librarian?id=', librarianId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default LibrarianApi;