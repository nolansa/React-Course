import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import './Blog.css';
//import asyncComponent from '../../hoc/asyncComponent';
//import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = React.lazy(() => {
    return import('./NewPost/NewPost');
})

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/"
                                activeClassName='linkActive' 
                                exact>Home</NavLink></li>
                            <li><NavLink 
                                    to={{
                                        pathname: '/new-post'
                                    }} 
                                    exact
                                    activeClassName='linkActive' 
                                >New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>                              
                    <Route path="/new-post" render={() => 
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <AsyncNewPost />
                                            </Suspense>
                                            } />  
                    <Route path="/posts" component={ Posts } />  
                    <Redirect from="/" to="/posts" />      
                </Switch>
            </div>
        );
    }
}

export default Blog; 