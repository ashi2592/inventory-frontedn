import React, { useState } from "react";
import { Label, Menu, Segment, Icon } from "semantic-ui-react";
// import { useNavigate } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";
import { NavLink, withRouter } from 'react-router-dom'

function Navigation() {

    const [activeItem, setActiveItem] = useState('Product');



    function handleItemClick(eventname) {
        // console.log(eventname)
        // let historyObj = useHistory();
        // historyObj.push("/"+eventname);

    }

    return (
        <Menu secondary>
            <Menu.Item
                as={NavLink} to="/dashboard"
                name='Dashboard'
                icon="home"
                active={activeItem === 'home'}
                onClick={handleItemClick}
            />
             <Menu.Item
                as={NavLink} to="/order"
                name='Order'
                icon="add to cart"
                active={activeItem === 'product'}
                onClick={handleItemClick}
            />  

             <Menu.Item
                as={NavLink} to="/product"
                name='Product'
                icon="cart"
                active={activeItem === 'product'}
                onClick={handleItemClick}
            />

<Menu.Item
                as={NavLink} to="/catalog"
                name='Catalogs'
                icon="cart"
                active={activeItem === 'product'}
                onClick={handleItemClick}
            />
    
            <Menu.Item
                as={NavLink} to="/setting"
                name='setting'
                icon="settings"
                active={activeItem === 'setting'}
                onClick={handleItemClick}
            />
           


        </Menu >

    )
}


export default Navigation;