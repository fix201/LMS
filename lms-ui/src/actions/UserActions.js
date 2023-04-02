import UserApi from '../api/UserApi';

const UsersActions = {
    readUsers: function () {
        UserApi.getAllUsers((userList) => {
            // Dispatcher.dispatch({
            //     actionType: 'read_users',
            //     data: userList
            // })
        })
    },

    deleteUser: (userId) => {
        UserApi.deleteUser(userId, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'delete_user',
            //     status: res
            // })
        })
    },

    updateUser: (user) => {
        UserApi.updateUser(user, (res) => {
            // Dispatcher.dispatch({
            //     actionType: 'update_user',
            //     status: res
            // })
        })
    },

    addUser: (user) => {
        UserApi.addUser(user, (res) => {
            Dispatcher.dispatch({
                actionType: 'add_user',
                status: res
            })
        })
    }

}
export default UsersActions;