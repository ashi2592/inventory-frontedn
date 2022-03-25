import React, { useState } from "react";
import { Label, Menu, Segment, Icon } from "semantic-ui-react";
// import { useNavigate } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";

function Navigation() {

    const [activeItem, setActiveItem] = useState('Product');

    function handleChange(eventname) {
        // console.log(eventname)
        // let historyObj = useHistory();
        // historyObj.push("/"+eventname);

    }

    return (

        <ui>
            <li> <Link to="/category" > <Icon name="cart"></Icon>category</Link>

            </li>
            <li>
                <Link to="/brand" > <Icon name="cart"></Icon>Brand</Link>

            </li>
            <Link to="/setting" > <Icon name="cart"></Icon>Setting</Link>
            <Link to="/supplier" > <Icon name="cart"></Icon>SUPPLIER</Link>
            <Link to="/product" > <Icon name="cart"></Icon>Product</Link>
            <Link to="/reader" > <Icon name="cart"></Icon>reader</Link>
        </ui>
    )
}


export default Navigation;