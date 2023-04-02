import axios from 'axios';
import {ADD_PUBLISHER, DELETE_PUBLISHER, READ_PUBLISHERS, UPDATE_PUBLISHER} from "./ActionTypes";
import Config from "../config";

export const fetchPublishers = () => {
    return (dispatch) => {
        axios.get(`${Config.API}/publishers`)
            .then((res) => {
                dispatch({type: READ_PUBLISHERS, payload: res.data})
            })
            .catch(err => {
                console.error("Error fetching publishers:", err)
            });
    }
}

export const updatePublisher = (publisher) => {
    return (dispatch) => {
        axios.post(`${Config.API}/publisher`, publisher)
            .then((res) => {
                dispatch({type: UPDATE_PUBLISHER, payload: res.data});
            })
            .catch(err => {
                console.error("Error updating publisher:", err)
            });
    }
}

export const addPublisher = (publisher) => {
    return (dispatch) => {
        axios.post(`${Config.API}/publisher`, publisher)
            .then((res) => {
                dispatch({type: ADD_PUBLISHER, payload: res.data});
            })
            .catch(err => {
                console.error("Error adding publisher:", err)
            });
    }
}

export const deletePublisher = (publisherId) => {
    return (dispatch) =>
        axios.delete(`${Config.API}/publisher?id=${publisherId}`)
            .then(res => {
                dispatch({type: DELETE_PUBLISHER, payload: publisherId});
            })
            .catch(err => {
                console.error("Unable to delete publisher:", err)
            });
}
