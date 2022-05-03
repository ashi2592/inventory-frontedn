import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'


import Supplier from './Supplier';
import Brand from './brand';
import Category from './Category';

const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
]


const panes = [
    { menuItem: 'Category', render: () => <Category></Category> },
    { menuItem: 'Brands', render: () => <Brand></Brand> },
    { menuItem: 'Supplier', render: () => <Supplier></Supplier> },
]

const CatalogVerticalTabular = () => {
    const [color, setColor] = useState(colors[Math.floor(Math.random()*colors.length)])
    return (<Tab menu={{ color, fluid: true, vertical: true, tabular: true }} panes={panes} />)
}

export default CatalogVerticalTabular