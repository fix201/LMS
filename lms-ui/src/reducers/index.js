import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import bookReducer from "./bookReducer";
import genreReducer from "./genreReducer";
import loanRecordReducer from "./loanRecordReducer";
import publisherReducer from "./publisherReducer";

const rootReducer = combineReducers({
    authorReducer, bookReducer, genreReducer, loanRecordReducer, publisherReducer
});

export default rootReducer;