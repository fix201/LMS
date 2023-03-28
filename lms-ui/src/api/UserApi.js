import axios from 'axios';
import Config from "../config";

const UserApi = {
    getAllUsers: function (cb) {
        axios.get(Config.api + '/users')
            .then(res => {
                cb(res.data);
            })
    },

    getUser: async function (userId) {
        return await axios.get(Config.api + '/users/'+ userId);
    },

    updateUser: (user, cb) => {
        axios.post(Config.api + '/user', user)
            .then(res => {
                cb(res.data);
            })
    },

    deleteUser: (userId, cb) => {
        axios.delete(Config.api + '/user?id=', userId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default UserApi;