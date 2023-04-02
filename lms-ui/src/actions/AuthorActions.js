import axios from 'axios';
import {ADD_AUTHOR, DELETE_AUTHOR, READ_AUTHORS, UPDATE_AUTHOR} from "./ActionTypes";
import Config from "../config";

export const fetchAuthors = () => {
    return (dispatch) => {
        axios.get(`${Config.API}/authors`)
            .then((res) => {
                dispatch({type: READ_AUTHORS, payload: res.data})
            })
            .catch(err => {
                console.error("Error fetching authors:", err)
            });
    }
}

export const updateAuthor = (author) => {
    return (dispatch) => {
        axios.post(`${Config.API}/author`, author)
            .then((res) => {
                dispatch({type: UPDATE_AUTHOR, payload: res.data});
            })
            .catch(err => {
                console.error("Error updating author:", err)
            });
    }
}

export const addAuthor = (author) => {
    return (dispatch) => {
        axios.post(`${Config.API}/author`, author)
            .then((res) => {
                dispatch({type: ADD_AUTHOR, payload: res.data});
            })
            .catch(err => {
                console.error("Error adding author:", err)
            });
    }
}

export const deleteAuthor = (authorId) => {
    return (dispatch) => 
        axios.delete(`${Config.API}/author?id=${authorId}`)
            .then(res => {
                dispatch({type: DELETE_AUTHOR, payload: authorId});
            })
            .catch(err => {
                console.error("Unable to delete author:", err)
            });
}
