import axios from 'axios';
import Config from "../config";

const LibrarianApi = {
    getAllLibrarians: function (cb) {
        axios.get(Config.API + '/librarians')
            .then(res => {
                cb(res.data);
            })
    },

    getLibrarian: function (librarianId, cb) {
        axios.get(Config.API + '/librarians/' + librarianId)
            .then(res => {
                cb(res.data);
            })
    },

    updateLibrarian: (librarian, cb)=> {
        axios.post(Config.API + '/librarian', librarian)
            .then(res => {
                cb(res.data);
            })
    },

    deleteLibrarian: (librarianId, cb) => {
        axios.delete(Config.API + '/librarian?id=', librarianId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default LibrarianApi;