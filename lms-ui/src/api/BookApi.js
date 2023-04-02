import axios from 'axios';
import Config from "../config";

const BookApi = {
    getAllBooks: function (cb) {
        axios.get(Config.API + '/books')
            .then(res => {
                cb(res.data);
            })
    },

    getBook: async function (bookId, cb) {
        return await axios.get(Config.API + '/books/' + bookId);
    },

    updateBook: (book, cb)=> {
        axios.post(Config.API + '/book', book)
            .then(res => {
                cb(res.data);
            })
    },

    deleteBook: (bookId, cb) => {
        axios.delete(Config.API + '/book?id=', bookId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default BookApi;