import axios from 'axios';
import Config from "../config";

const AuthorApi = {
    getAllAuthors: function (cb) {
        axios.get(Config.API + '/authors')
            .then(res => {
                cb(res.data);
            })
    },

    getAuthor: function (authorId, cb) {
        axios.get(Config.API + '/authors/' + authorId)
            .then(res => {
                cb(res.data);
            })
    },
    
    updateAuthor: (author, cb)=> {
        console.log(author)
        axios.post(Config.API + '/author', author)
            .then(res => {
                console.log(res)
                cb(res.data);
            })
    },
    
    deleteAuthor: (authorId, cb) => {
        axios.delete(Config.API + '/author?id=', authorId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default AuthorApi;