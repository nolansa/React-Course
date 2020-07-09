import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { purchaceInit } from '../actions';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const placeOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const placeOrderSuccess = (state, action) => {
    const newOrder = updateObject(action.order, { id: action.id });
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
        });
}

const placeOrderFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { loading: false, orders: action.orders });
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PLACE_ORDER_START: return placeOrderStart(state, action);
        case actionTypes.PLACE_ORDER_SUCCESS: return placeOrderSuccess(state, action);            
        case actionTypes.PLACE_ORDER_FAIL: return placeOrderFail(state, action);
        case actionTypes.PURCHASE_INIT: return purchaceInit(state, action);            
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);            
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);            
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);            
        default: return state;
    }
}

export default reducer;