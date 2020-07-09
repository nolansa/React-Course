import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const placeOrderSuccess = (id, order) => {
    return {
        type: actionTypes.PLACE_ORDER_SUCCESS,
        id: id,
        order: order
    }
}

export const placeOrderFail = (error) => {
    return {
        type: actionTypes.PLACE_ORDER_FAIL
    }
}

export const placeOrderStart = () => {
    return {
        type: actionTypes.PLACE_ORDER_START
    }
}

export const placeOrderAsync = (orderData, token) => {
    return (dispatch) => {
        dispatch(placeOrderStart());
        const formData = {};
        for (let formElementId in orderData.orderForm) {
            formData[formElementId] = orderData.orderForm[formElementId].value;
        }

        setTimeout(() => {
            const newOrder  = {
                ingredients: orderData.ingredients,
                price: orderData.totalPrice,
                orderData: formData
            }
            axios.post('/orders.json?auth=' + token, newOrder)
            .then((response) => {
                console.log('Data: ',response.data);
                dispatch(placeOrderSuccess(response.data.name, newOrder));               
            })
            .catch((error) => {
                //console.log(error);
                dispatch(placeOrderFail(error));
            });
        }, 2000);
    }
}

export const purchaceInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error)  => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersAsync = (token) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        setTimeout(() => {
            axios.get('/orders.json?auth=' + token)
                .then((res) => {
                    //console.log('orders: ', res.data);
                    const fetchedOrders = []
                    for (let key in res.data) {
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    //console.log('fetchedOrders: ', fetchedOrders);
                    dispatch(fetchOrdersSuccess(fetchedOrders));
                })
                .catch((error) => {
                    dispatch(fetchOrdersFail(error));
                })
        },2000);
    }
}