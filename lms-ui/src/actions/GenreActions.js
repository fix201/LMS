import axios from 'axios';
import {ADD_GENRE, DELETE_GENRE, READ_GENRES, UPDATE_GENRE} from "./ActionTypes";
import Config from "../config";

export const fetchGenres = () => {
    return (dispatch) => {
        axios.get(`${Config.API}/genres`)
            .then((res) => {
                dispatch({type: READ_GENRES, payload: res.data})
            })
            .catch(err => {
                console.error("Error fetching genres:", err)
            });
    }
}

export const updateGenre = (genre) => {
    return (dispatch) => {
        axios.post(`${Config.API}/genre`, genre)
            .then((res) => {
                dispatch({type: UPDATE_GENRE, payload: res.data});
            })
            .catch(err => {
                console.error("Error updating genre:", err)
            });
    }
}

export const addGenre = (genre) => {
    return (dispatch) => {
        axios.post(`${Config.API}/genre`, genre)
            .then((res) => {
                dispatch({type: ADD_GENRE, payload: res.data});
            })
            .catch(err => {
                console.error("Error adding genre:", err)
            });
    }
}

export const deleteGenre = (genreId) => {
    return (dispatch) =>
        axios.delete(`${Config.API}/genre?id=${genreId}`)
            .then(res => {
                dispatch({type: DELETE_GENRE, payload: genreId});
            })
            .catch(err => {
                console.error("Unable to delete genre:", err)
            });
}
