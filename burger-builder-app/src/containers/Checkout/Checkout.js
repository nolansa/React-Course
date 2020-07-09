import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect }  from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from '../Checkout/ContactData/ContactData';

import * as actions from '../../store/actions/index';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render () {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients && !this.props.purchased) {
            summary = (
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.CheckoutContinuedHandler}  />
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
                </div>
            );
        }
        return summary
        
    };
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingr.ingredients,
        purchased: state.ordrs.purchased
    }
}

export default connect(mapStateToProps)(Checkout);