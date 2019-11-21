//
// const initialState = {
//     number: 0
// };
//
// const incrementReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case 'INCREMENT': {
//             state.number += 1
//             // return { ...state }
//             return state
//         };
//         default: {
//             state.number += 1
//             return state
//         };
//     }
// };
// export default incrementReducer;

const tiger = 10000

//这是reducer
let reducer = (state = tiger, action) => {
    switch (action.type) {
        case '涨工资':
            return state += 100;
        case '扣工资':
            return state -= 100;
        default:
            return state;
    }
}

export default reducer