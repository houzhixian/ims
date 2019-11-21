import demo from './demo';

export function combineReducers(state = {}, action) {
    return {
        counter: demo(state.counter, action)
    }
}

export default combineReducers;