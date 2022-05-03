import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './Auth';

import { useEffect } from "react";
import AlertMessage from "../components/AlretMessage";
import { Container } from "semantic-ui-react";
import Loader from '../components/Loader';
import NavBarMobile from '../layout/TopNav';

const MainLayout = ({ children }) => {  


    return (<NavBarMobile>
        <Container className='topheadermargin' >

            <Loader></Loader>
            <AlertMessage></AlertMessage>
            {children}
        </Container>
    </NavBarMobile>)
}


const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isMobile, setIsMobile] = useState(true);
    const [mql, setMql] = useState(true);


    useEffect(() => {
        const mql = global.matchMedia(`(min-width: 768px)`);
        mql.addListener(() => _mediaQueryChanged(mql));
    })

    const _mediaQueryChanged = (mql) => {
        setIsMobile(!mql.matches);
    }

    useEffect(() => {
        console.log(isMobile)
    }, [isMobile])
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (isLogin() ? <MainLayout><Component {...props} isMobile={isMobile}/></MainLayout> : <Redirect to="/" />)} />
    )
}
export default PrivateRoute;