import * as actionTypes from './actionTypes';

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrease = () => {
    return {
        type: actionTypes.DECREASE
    }
}

export const add = (amount) => {
    return {
        type: actionTypes.ADD,
        amount: amount
    }
}

export const subtract = (amount) => {
    return {
        type: actionTypes.SUBTRACT,
        amount: amount
    }
}