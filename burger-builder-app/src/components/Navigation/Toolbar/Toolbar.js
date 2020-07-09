import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerMenu from '../../UI/HamburgerMenu/HamburgerMenu';

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <HamburgerMenu toggle={props.toggleMenu} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>

);

export default toolbar;