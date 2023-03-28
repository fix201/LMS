import axios from 'axios';
import Config from "../config";

const AuthorApi = {
    getAllAuthors: function (cb) {
        axios.get(Config.api + '/authors')
            .then(res => {
                cb(res.data);
            })
    },

    getAuthor: function (authorId, cb) {
        axios.get(Config.api + '/authors/' + authorId)
            .then(res => {
                cb(res.data);
            })
    },
    
    updateAuthor: (author, cb)=> {
        axios.post(Config.api + '/author', author)
            .then(res => {
                cb(res.data);
            })
    },
    
    deleteAuthor: (authorId, cb) => {
        axios.delete(Config.api + '/author?id=', authorId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default AuthorApi;