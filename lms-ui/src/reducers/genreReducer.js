import * as actionTypes from '../actions/ActionTypes';

const initialState = {
    genres: [],
};

const genreReducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.READ_GENRES:
            return {
                ...state,
                genres: action.payload
            };
        case actionTypes.UPDATE_GENRE:
            return {
                ...state,
                genres: state.genres.map((genre) =>
                    genre.genreId === action.payload.genreId ? action.payload : genre
                )
            };
        case actionTypes.ADD_GENRE:
            return {
                ...state,
                genres: [...state.genres, action.payload]
            };
        case actionTypes.DELETE_GENRE:
            return {
                ...state,
                genres: state.genres.filter(genre => genre.genreId !== action.payload)
            };
        default:
            return state;
    }
};

export default genreReducer;