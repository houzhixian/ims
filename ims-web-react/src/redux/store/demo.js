import {createStore} from 'redux';
import reducer from '../reducers/demo';

//创建store
let store = createStore(reducer);

export default store;