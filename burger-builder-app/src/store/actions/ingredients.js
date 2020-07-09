import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const initIngredients = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}

const initIngredientsFailed = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_FAILED
    }
}

export const initIngredientsAsync = () => {
    return (dispatch) => {
        axios.get('/ingredients.json')
            .then(response => {
                {
                    dispatch(initIngredients(response.data));
                }
                
        })
        .catch(error => {
            dispatch(initIngredientsFailed());
        });
    }
}
export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ...payload
    }
}

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ...payload
    }
}