import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                label: 'Name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street1: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Line 1'
                },
                label: 'Street Line 1',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street2: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Line 2'
                },
                label: 'Street Line 2',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                label: 'City',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                label: 'Country',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post code'
                },
                label: 'Post Code',
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                label: 'Email Address',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                label: 'Delivery Method',
                value: 'fastest'
            }
        },
        formIsValid: false
    }
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }

        if (rules.isEmail) {
            const pattern = /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }
    inputChangedHandler = (event, id) => {
        const config = {...this.state.orderForm[id]};
        config.value = event.target.value;
        config.touched = true;
        const newState = {...this.state};
        
        if (config.validation) {
            config.valid = this.checkValidity(config.value, config.validation)
        }

        newState.orderForm[id] = config;
        let formIsValid = true;
        for (let inputId in newState.orderForm) {
            if (newState.orderForm[inputId].validation) {
                formIsValid = newState.orderForm[inputId].valid && formIsValid;
            }
        }
        console.log('formIsValid: ' + formIsValid);
        newState.formIsValid = formIsValid;
        this.setState(newState);
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            orderForm: this.state.orderForm, 
            ingredients: this.props.ingredients, 
            totalPrice: this.props.totalPrice
        }
        this.props.onPlaceOrder(order, this.props.token);
    }

    render() {
        console.log('formIsValid: ' + this.state.formIsValid);
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push(({
                id: key,
                config: this.state.orderForm[key]
            }))
        }
        let spinner = null;
        if (this.props.loading) {
            spinner = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact information</h4>
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map((element) => {
                        return <Input 
                        key={element.id} 
                        invalid = {!element.config.valid}
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value} 
                        label={element.config.label} 
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                        touched= {element.config.touched}
                        shouldValidate={element.config.validation} />
                    })}
                    
                    
                    <Button btnType="Success" disabled={!this.state.formIsValid} className={classes.Input}>ORDER</Button>
                </form>
                {spinner}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingr.ingredients,
        totalPrice: state.ingr.totalPrice,
        orders: state.ordrs.orders,
        loading: state.ordrs.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlaceOrder: (orderData, token) => dispatch(actions.placeOrderAsync(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));