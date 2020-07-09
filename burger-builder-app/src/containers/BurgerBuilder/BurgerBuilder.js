import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    continuePurchaseHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let spinner = null;
        let burger = this.props.error ? <p>Ingredients could not be loaded.</p> : <Spinner />
        if (this.props.ingredients) {
            burger = ( 
                <Auxillary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                    ingredientAdded={this.props.onAddIngredient} 
                    ingredientRemoved={this.props.onRemoveIngredient} 
                    disabled={disabledInfo}
                    purchasable={this.props.purchasable}
                    price={this.props.totalPrice}
                    purchase={this.purchaseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    />
                </Auxillary>);
            orderSummary = (<OrderSummary 
                ingredients={this.props.ingredients} 
                total={this.props.totalPrice} 
                cancelClick={this.cancelPurchaseHandler} 
                continueClick={this.continuePurchaseHandler}  
                />
                );
        };
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchaseHandler}>
                    {orderSummary}
                    {spinner}
                </Modal>
                {burger}
            </Auxillary>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingr.ingredients,
        totalPrice: state.ingr.totalPrice,
        purchasable: state.ingr.purchasable,
        error: state.ingr.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (type) =>  dispatch(actions.addIngredient({payload: { type: type }})),
        onRemoveIngredient: (type) => dispatch(actions.removeIngredient({payload: { type: type }})),
        onInitIngredients: () => dispatch(actions.initIngredientsAsync()),
        onPurchaseInit: () => dispatch(actions.purchaceInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));