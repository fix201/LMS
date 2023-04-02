import * as actionTypes from '../actions/ActionTypes';

const initialState = {
    authors: [],
};

const authorReducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.READ_AUTHORS:
            return {
                ...state,
                authors: action.payload
            };
        case actionTypes.UPDATE_AUTHOR:
            return {
                ...state,
                authors: state.authors.map((author) =>
                    author.id === action.payload.id ? action.payload : author
                )
            };
        case actionTypes.ADD_AUTHOR:
            return {
                ...state,
                authors: [...state.authors, action.payload]
            };
        case actionTypes.DELETE_AUTHOR:
            return {
                ...state,
                authors: state.authors.filter(author => author.id !== action.payload)
            };
        default:
            return state;
    }
};

export default authorReducer;