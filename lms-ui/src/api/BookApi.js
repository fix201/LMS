import axios from 'axios';
import Config from "../config";

const BookApi = {
    getAllBooks: function (cb) {
        axios.get(Config.api + '/books')
            .then(res => {
                cb(res.data);
            })
    },

    getBook: async function (bookId, cb) {
        return await axios.get(Config.api + '/books/' + bookId);
    },

    updateBook: (book, cb)=> {
        axios.post(Config.api + '/book', book)
            .then(res => {
                cb(res.data);
            })
    },

    deleteBook: (bookId, cb) => {
        axios.delete(Config.api + '/book?id=', bookId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default BookApi;