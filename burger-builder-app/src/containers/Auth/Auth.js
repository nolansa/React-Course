import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email address'
                },
                label: 'Email',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                label: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignup: false
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
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
        const config = {...this.state.controls[id]};
        config.value = event.target.value;
        config.touched = true;
        const newState = {...this.state};
        
        if (config.validation) {
            config.valid = this.checkValidity(config.value, config.validation)
        }

        newState.controls[id] = config;
        let formIsValid = true;
        for (let inputId in newState.controls) {
            if (newState.controls[inputId].validation) {
                formIsValid = newState.controls[inputId].valid && formIsValid;
            }
        }
        console.log('formIsValid: ' + formIsValid);
        newState.formIsValid = formIsValid;
        this.setState(newState);
    }

    onSubmitHandler  = (event) => {
        event.preventDefault();
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    toggleFormHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }
    
    render () {
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push(({
                id: key,
                config: this.state.controls[key]
            }))
        }
        const form = formElementsArray.map((element) => {
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
        });
        let error = <p> </p>;
        if (this.props.error) {
            error = <p style={{color: 'red'}}><strong>{this.props.error.message.replace(/_/g,' ')}</strong></p>;
        }
        let spinner = '';
        if (this.props.loading) {
            spinner = <Spinner />;
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {spinner}
                <form onSubmit={this.onSubmitHandler}>
                    {error}
                    {form}
                    <Button disabled={!this.state.formIsValid} btnType='Success' >{this.state.isSignup ? 'Signup' : 'Login'}</Button>
                    <br />
                    <Button btnType='Danger' click={this.toggleFormHandler} >{ this.state.isSignup ? 'Switch to login' : 'Switch to signup'}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token != null,
        building: state.ingr.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticate: (email, password, isSignup) => dispatch(actions.authAsync(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);