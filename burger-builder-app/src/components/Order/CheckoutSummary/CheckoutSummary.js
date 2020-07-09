import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    console.log(props.ingredients);
    return(
        <div className={classes.CheckoutSummary}>
            <h1>I hope it tastes good!</h1>
            <div className={classes.BurgerContainer}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" click={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" click={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;