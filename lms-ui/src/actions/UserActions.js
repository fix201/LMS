import axios from 'axios';
import {ADD_USER, DELETE_USER, READ_USERS, UPDATE_USER} from "./ActionTypes";
import Config from "../config";

export const fetchUsers = () => {
    return (dispatch) => {
        axios.get(`${Config.API}/users`)
            .then((res) => {
                dispatch({type: READ_USERS, payload: res.data})
            })
            .catch(err => {
                console.error("Error fetching users:", err)
            });
    }
}

export const updateUser = (user) => {
    return (dispatch) => {
        axios.post(`${Config.API}/user`, user)
            .then((res) => {
                dispatch({type: UPDATE_USER, payload: res.data});
            })
            .catch(err => {
                console.error("Error updating user:", err)
            });
    }
}

export const addUser = (user) => {
    return (dispatch) => {
        axios.post(`${Config.API}/user`, user)
            .then((res) => {
                dispatch({type: ADD_USER, payload: res.data});
            })
            .catch(err => {
                console.error("Error adding user:", err)
            });
    }
}

export const deleteUser = (userId) => {
    return (dispatch) =>
        axios.delete(`${Config.API}/user?id=${userId}`)
            .then(res => {
                dispatch({type: DELETE_USER, payload: userId});
            })
            .catch(err => {
                console.error("Unable to delete user:", err)
            });
}
