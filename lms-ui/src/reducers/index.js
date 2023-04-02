import { combineReducers } from 'redux';
import authorReducer from './authorReducer';

const rootReducer = combineReducers({
    authorReducer,
});

export default rootReducer;