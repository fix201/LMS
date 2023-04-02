import * as actionTypes from '../actions/ActionTypes';

const initialState = {
    publishers: [],
};

const publisherReducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.READ_PUBLISHERS:
            return {
                ...state,
                publishers: action.payload
            };
        case actionTypes.UPDATE_PUBLISHER:
            return {
                ...state,
                publishers: state.publishers.map((publisher) =>
                    publisher.id === action.payload.id ? action.payload : publisher
                )
            };
        case actionTypes.ADD_PUBLISHER:
            return {
                ...state,
                publishers: [...state.publishers, action.payload]
            };
        case actionTypes.DELETE_PUBLISHER:
            return {
                ...state,
                publishers: state.publishers.filter(publisher => publisher.id !== action.payload)
            };
        default:
            return state;
    }
};

export default publisherReducer;