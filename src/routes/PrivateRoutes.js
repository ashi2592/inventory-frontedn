import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './Auth';
import { useEffect } from "react";
import Navbar from '../layout/Navbar'
import Sidebar from '../layout/Sidebar';
import { Container, Grid, Loader } from 'semantic-ui-react';
import SimpleBar from 'simplebar-react';

const MainLayout = ({ children }) => {

    const [toggleBtn, setToggleBtn] = useState(true);
    const toggle = () => setToggleBtn(val => !val);

    return (
        <Container className="top-wrapper" >
            <Navbar setToggle={toggle} />
            <Sidebar toggleBtn={toggleBtn} />
            <Loader></Loader>
            <div className={`${toggleBtn ? "app-wrapper collapse" : "app-wrapper"}`}>
                <SimpleBar style={{ maxHeight: 650 }}>
                    {children}
                </SimpleBar>

            </div>
        </Container>
    )

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
        <Route {...rest} render={props => (isLogin() ? <MainLayout><Component {...props} isMobile={isMobile} /></MainLayout> : <Redirect to="/" />)} />
    )
}
export default PrivateRoute;