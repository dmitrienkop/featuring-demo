import { combineReducers } from 'redux';
import { API_REDUCER_PATH, api } from '../services/api';

export const rootReducer = combineReducers({
    [API_REDUCER_PATH]: api.reducer
});
