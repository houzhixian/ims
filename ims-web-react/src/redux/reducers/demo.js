
const initialState = {
    number: 0
};

const incrementReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREMENT': {
            state.number += 1
            // return { ...state }
            return state
        };
        default: {
            state.number += 1
            return state
        };
    }
};
export default incrementReducer;