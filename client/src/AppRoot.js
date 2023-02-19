
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
//! This component will render the demanded component in the can true, else it will redirect the traffic to
const AppRoot = ({component: Component, can=()=>true, redirect, ...rest}) => (
    <Route {...rest} render = {(props)=>(
        can() ? <Component {...props}/> : <Redirect to={redirect}/>
    )}
    />
);
export default AppRoot;