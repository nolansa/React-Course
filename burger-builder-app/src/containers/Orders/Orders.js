import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        if (this.props.token) {
            this.props.onFetchOrdersAsync(this.props.token);
        }
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            if (this.props.orders) {
                orders = this.props.orders.map((order) => (
                            <Order 
                            key={order.id} 
                            ingredients={order.ingredients} 
                            price={order.price} />
                        ))
            }
            else {
                orders = <p>No Orders to display!</p>
            }
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ordrs.orders,
        loading: state.ordrs.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrdersAsync: (token) => dispatch(actionTypes.fetchOrdersAsync(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios);