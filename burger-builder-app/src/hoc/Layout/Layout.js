import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxillary from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    toggleSidedrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Auxillary>
                <Toolbar 
                isAuthenticated={this.props.isAuthenticated}
                toggleMenu={this.toggleSidedrawerHandler}/>
                <SideDrawer 
                isAuthenticated={this.props.isAuthenticated}
                open={this.state.showSideDrawer} 
                clicked={this.toggleSidedrawerHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);