import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
            { props.isAuthenticated ?  [ 
                <Auxillary>
                <NavigationItem link="/orders">Orders</NavigationItem> 
                <NavigationItem link="/logout">Logout</NavigationItem>
                </Auxillary>
            ] :
                <NavigationItem link="/auth">Login</NavigationItem>
            }
    </ul>
);

export default navigationItems;