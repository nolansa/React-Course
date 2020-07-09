import * as actionTypes from './actionTypes';

const saveResult = (counter) => {
    return {
        type: actionTypes.SAVE_RESULT,
        counter: counter
    }
}

export const saveResultAsync = (counter) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            //const oldCounter = getState().ctr.counter;
            //console.log('oldCounter: ', oldCounter);
            dispatch(saveResult(counter));
        }, 2000)
    }
    
    
}

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        id: id
    }
}