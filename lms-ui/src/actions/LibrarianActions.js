import axios from 'axios';
import {ADD_LIBRARIAN, DELETE_LIBRARIAN, READ_LIBRARIANS, UPDATE_LIBRARIAN} from "./ActionTypes";
import Config from "../config";

export const fetchLibrarians = () => {
    return (dispatch) => {
        axios.get(`${Config.API}/librarians`)
            .then((res) => {
                dispatch({type: READ_LIBRARIANS, payload: res.data})
            })
            .catch(err => {
                console.error("Error fetching librarians:", err)
            });
    }
}

export const updateLibrarian = (librarian) => {
    return (dispatch) => {
        axios.post(`${Config.API}/librarian`, librarian)
            .then((res) => {
                dispatch({type: UPDATE_LIBRARIAN, payload: res.data});
            })
            .catch(err => {
                console.error("Error updating librarian:", err)
            });
    }
}

export const addLibrarian = (librarian) => {
    return (dispatch) => {
        axios.post(`${Config.API}/librarian`, librarian)
            .then((res) => {
                dispatch({type: ADD_LIBRARIAN, payload: res.data});
            })
            .catch(err => {
                console.error("Error adding librarian:", err)
            });
    }
}

export const deleteLibrarian = (librarianId) => {
    return (dispatch) =>
        axios.delete(`${Config.API}/librarian?id=${librarianId}`)
            .then(res => {
                dispatch({type: DELETE_LIBRARIAN, payload: librarianId});
            })
            .catch(err => {
                console.error("Unable to delete librarian:", err)
            });
}
