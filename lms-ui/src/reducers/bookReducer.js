import * as actionTypes from '../actions/ActionTypes';

const initialState = {
    books: [],
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.READ_BOOKS:
            return {
                ...state,
                books: action.payload
            };
        case actionTypes.UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload.id ? action.payload : book
                )
            };
        case actionTypes.ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload]
            };
        case actionTypes.DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            };
        default:
            return state;
    }
};

export default bookReducer;