import {createStore} from 'redux';
import combineReducers from '../reducers/index';

let store = createStore(combineReducers);

export default store;