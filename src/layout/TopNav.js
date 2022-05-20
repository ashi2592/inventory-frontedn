import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { Container, Icon, Image, Menu, MenuItem, Sidebar,Transition } from "semantic-ui-react";


const NavBarMobile = ({ children }) => {
    const [logo, setLogo] = useState('')
    const [visible, setVisible] = useState(false);
    const [animation, setAnimation] = useState('pulse')
    const [duration, setDuration] = useState(500)
    const [loaderImage, setLoaderImage] = useState('Unmount')

    const handlePusher = () => {
        if (visible) setVisible(false);
    };

    const handleToggle = () => 
    {
        setVisible(x => !x);
    }


    useEffect(() => {
        setLogo(localStorage.getItem('logo'))
    }, [])

  const  handleClick = ()=>{
    if (visible) setVisible(false);
    }

    return (
        <Sidebar.Pushable>
            <Sidebar

                as={Menu}
                animation="overlay"
                icon="labeled"
                width="thin"
                vertical
                visible={visible}
            >

                <MenuItem as='a' >
                    <Link to="/dashboard" > <Icon name={"home"}  ></Icon> Dashboard </Link>
                   
                </MenuItem>
                <MenuItem as='a'>
                    <Link to="/order"  > <Icon name={"gem"}></Icon> Order</Link>
                </MenuItem>

                <MenuItem as='a'>
                    <Link to="/product" > <Icon name={"cart"}></Icon>  Product</Link>
                </MenuItem>
                <MenuItem as='a'>
                    <Link to="/transcation" > <Icon name={"history"}></Icon>  Order History</Link>
                </MenuItem>

                <MenuItem as='a' link={true} >
                    <Link to="/purchase/" > <Icon name={"money"}></Icon> Purchase </Link>
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
                    <Link to="/logout" > <Icon name={"trash"}></Icon>  Logout</Link>
                </MenuItem>

            </Sidebar>
            <Sidebar.Pusher
                // dimmed={visible}
                onClick={handlePusher}
                style={{ minHeight: "100vh" }}
            >
                <Menu fixed="top" >
                    <Menu.Item>
                        <Image size="mini" src={"/logo.jpg"} />
                    </Menu.Item>
                    <Menu.Item onClick={handleToggle}>
                        <Icon name="sidebar" />
                    </Menu.Item>

                </Menu>
                <Transition.Group animation={animation} duration={duration}>
                    {visible && (
                        <Image centered size='small' style={{zIndex:9999999, marginTop:150}} src='/assets/inventhooks-logo.png' />
                    )}
                      {!visible && children}
                </Transition.Group>

              
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
};



export default NavBarMobile;


