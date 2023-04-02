import axios from 'axios';
import {ADD_BOOK, DELETE_BOOK, READ_BOOKS, UPDATE_BOOK} from "./ActionTypes";
import Config from "../config";

export const fetchBooks = () => {
    return (dispatch) => {
        axios.get(`${Config.API}/books`)
            .then((res) => {
                dispatch({type: READ_BOOKS, payload: res.data})
            })
            .catch(err => {
                console.error("Error fetching books:", err)
            });
    }
}

export const updateBook = (book) => {
    return (dispatch) => {
        axios.post(`${Config.API}/book`, book)
            .then((res) => {
                dispatch({type: UPDATE_BOOK, payload: res.data});
            })
            .catch(err => {
                console.error("Error updating book:", err)
            });
    }
}

export const addBook = (book) => {
    return (dispatch) => {
        axios.post(`${Config.API}/book`, book)
            .then((res) => {
                dispatch({type: ADD_BOOK, payload: res.data});
            })
            .catch(err => {
                console.error("Error adding book:", err)
            });
    }
}

export const deleteBook = (bookId) => {
    return (dispatch) =>
        axios.delete(`${Config.API}/book?id=${bookId}`)
            .then(res => {
                dispatch({type: DELETE_BOOK, payload: bookId});
            })
            .catch(err => {
                console.error("Unable to delete book:", err)
            });
}
