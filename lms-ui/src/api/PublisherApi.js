import axios from 'axios';
import Config from "../config";

const PublisherApi = {
    getAllPublishers: function (cb) {
        axios.get(Config.api + '/publishers')
            .then(res => {
                cb(res.data);
            })
    },

    getPublisher: function (publisherId, cb) {
        axios.get(Config.api + '/publishers/' + publisherId)
            .then(res => {
                cb(res.data);
            })
    },

    updatePublisher: (publisher, cb)=> {
        axios.post(Config.api + '/publisher', publisher)
            .then(res => {
                cb(res.data);
            })
    },

    deletePublisher: (publisherId, cb) => {
        axios.delete(Config.api + '/publisher?id=', publisherId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default PublisherApi;