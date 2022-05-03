import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Menu, MenuItem } from "semantic-ui-react";



const CataglogTopNavPage = ({ activeItem }) => {
    // const  [activeItem,setActiveItem] = useState('')
    const history = useHistory()

    const handleItemClick = (id) => {
        history.push(`/${id}`)
    }


    return (<Menu stackable={true}>
        <Menu.Item
            name='Category'
            color="red"
            active={activeItem === 'category'}
            onClick={() => handleItemClick('category')}
        />
        <Menu.Item
            name='Brand'
            color="red"
            as="a"
            active={activeItem === 'brand'}
            onClick={() => handleItemClick('brand')}
        />
        <Menu.Item
            name='Supplier'
            color="red"
            active={activeItem === 'supplier'}
            onClick={() => handleItemClick('supplier')}
        />

    </Menu>)
}


export default CataglogTopNavPage