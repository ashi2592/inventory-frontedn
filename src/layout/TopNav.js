import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { Container, Icon, Image, Menu, MenuItem, Sidebar } from "semantic-ui-react";
import "./Navigation.css";

const NavBarMobile = ({ children }) => {
    const [logo,setLogo] = useState('')
    const [visible, setVisible] = useState(false)

    const handlePusher = () => {
        if (visible) setVisible(false);
    };

    const handleToggle = () => setVisible(x => !x);
    useEffect(()=>{
        setLogo(localStorage.getItem('logo'))
      
     },[])

    return (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                vertical
                visible={visible}
            >
                <MenuItem as='a' >
                    <Link to="/dashboard" >  <Icon name={"gem"}></Icon> Dashboard</Link>
                </MenuItem>
                <MenuItem as='a'>
                    <Link to="/order" > <Icon name={"first order"}></Icon> Order</Link>
                </MenuItem>
                <MenuItem as='a'>
                    <Link to="/product" > <Icon name={"first order"}></Icon>  Product</Link>
                </MenuItem>
                <MenuItem as='a'>
                    <Link to="/transcation" > <Icon name={"history"}></Icon>  Order History</Link>
                </MenuItem>
             
                <MenuItem as='a'>
                    <Link to="/catalog" > <Icon name={"cart"}></Icon>  Catalog</Link>
                </MenuItem>
                <MenuItem as='a'>
                    <Link to="/customer" > <Icon name={"users"}></Icon> Customer</Link>
                </MenuItem>
                <MenuItem as='a'>
                    <Link to="/setting" > <Icon name={"setting"}></Icon>  Settings</Link>
                </MenuItem>

                <MenuItem as='a'>
                    <Link to="/reader" > <Icon name={"barcode"}></Icon>  Print BarCode</Link>
                </MenuItem>
                
                <MenuItem as='a'>
                    <Link to="/logout" > <Icon name={"exit"}></Icon>  Logout</Link>
                </MenuItem>
              
            </Sidebar>
            <Sidebar.Pusher
                dimmed={visible}
                onClick={handlePusher}
                style={{ minHeight: "100vh" }}
            >
                <Menu fixed="top" inverted>
                    <Menu.Item>
                        <Image size="mini" src={"./logo.jpg"} />
                    </Menu.Item>
                    <Menu.Item onClick={handleToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>

                </Menu>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};



export default NavBarMobile;


