import axios from 'axios';
import Config from "../config";

const UserApi = {
    getAllUsers: function (cb) {
        axios.get(Config.API + '/users')
            .then(res => {
                cb(res.data);
            })
    },

    getUser: async function (userId) {
        return await axios.get(Config.API + '/users/'+ userId);
    },

    updateUser: (user, cb) => {
        axios.post(Config.API + '/user', user)
            .then(res => {
                cb(res.data);
            })
    },

    deleteUser: (userId, cb) => {
        axios.delete(Config.API + '/user?id=', userId)
            .then(res => {
                cb(res.data);
            })
    }
};

export default UserApi;