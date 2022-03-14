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

        <Menu vertical>
            <Menu.Item
                name='category'
                active={activeItem === 'category'}
            // onClick={handleChange('category')}
            >
                {/* <Link to="/category">Add</Link> */}
                <Icon name='cart arrow down' />
                Add to Cart
            </Menu.Item>

            <Menu.Item
                name='category'
                active={activeItem === 'category'}
            // onClick={handleChange('category')}
            >
                <Icon name='cart arrow down' />
                Orders
            </Menu.Item>


            <Menu.Item
                name='category'
                active={activeItem === 'category'}
            // onClick={handleChange('category')}
            >
                <Icon name='cart arrow down' />
                <Link to="/customer"> customer</Link>
            </Menu.Item>

            <Menu.Item
                name='product'
                active={activeItem === 'product'}
            // onClick={handleChange('product')}
            >
                <Icon name='shopping basket' />
                Products
            </Menu.Item>
            <Icon name='cart' />
            <Link to="/category" > <Icon name="cart"></Icon>category</Link>
            <Link to="/brand" > <Icon name="cart"></Icon>Brand</Link>
            <Link to="/setting" > <Icon name="cart"></Icon>Setting</Link>
            <Link to="/supplier" > <Icon name="cart"></Icon>SUPPLIER</Link>
            <Link to="/product" > <Icon name="cart"></Icon>Product</Link>
            <Link to="/reader" > <Icon name="cart"></Icon>reader</Link>


            

            


            <Menu.Item
                name='category'
                active={activeItem === 'category'}
            // onClick={handleChange('category')}
            >
                <Icon loading name='setting' />
                Manufactures
            </Menu.Item>


            <Menu.Item
                name='category'
                active={activeItem === 'category'}
            // onClick={handleChange('category')}
            >
                <Icon loading name='setting' />
                Expense
            </Menu.Item>

            <Menu.Item
                name='setting'
                active={activeItem === 'setting'}
            // onClick={handleChange('setting')}

            >
                Setting
                <Icon loading name='setting' />

            </Menu.Item>
        </Menu>
    )
}


export default Navigation;