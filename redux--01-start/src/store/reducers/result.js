import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
    results: []
};

const deleteResults = (state, action) => {
    return updateObject(state, { results: state.results.filter(item => { return item.id !== action.id; }) });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.SAVE_RESULT):
            return updateObject(state, { results: state.results.concat({id: Math.random(), value: action.counter}) });
        case (actionTypes.DELETE_RESULT):
            return deleteResults(state, action);
        default:
    }
    return state;
};

export default reducer;