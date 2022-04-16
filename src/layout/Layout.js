import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import Header from "./Header";
import Navigation from "./Navigation";
import ThemeHeader from "./ThemeHeader";
import AlertMessage from "./AlretMessage";

const Layout = ({ children }) => {
    const history = useHistory();
    useEffect(() => {
        console.log(localStorage.getItem('storeId'))
        if (localStorage.getItem('storeId') === null) {
            history.push('/login')
        }
    }, [children])
    return (
        <div>
                <AlertMessage></AlertMessage>
                <Navigation></Navigation>
                {children}
           

            </div>
    )
}
export default Layout;