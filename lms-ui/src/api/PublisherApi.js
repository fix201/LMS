import axios from 'axios';
import Config from "../config";

const PublisherApi = {
    getAllPublishers: function (cb) {
        axios.get(Config.API + '/publishers')
            .then(res => {
                cb(res.data);
            })
    },

    getPublisher: function (publisherId, cb) {
        axios.get(Config.API + '/publishers/' + publisherId)
            .then(res => {
                cb(res.data);
            })
    },

    updatePublisher: (publisher, cb)=> {
        axios.post(Config.API + '/publisher', publisher)
            .then(res => {
                cb(res.data);
            })
    },

    deletePublisher: (publisherId, cb) => {
        axios.delete(Config.API + '/publisher?id=', publisherId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default PublisherApi;