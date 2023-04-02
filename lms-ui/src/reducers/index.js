import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import bookReducer from "./bookReducer";
import genreReducer from "./genreReducer";
import loansReducer from "./loansReducer";
import publisherReducer from "./publisherReducer";

const rootReducer = combineReducers({
    authorReducer, bookReducer, genreReducer, loansReducer, publisherReducer
});

export default rootReducer;