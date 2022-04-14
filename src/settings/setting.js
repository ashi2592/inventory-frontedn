import React, { useState } from "react";
import Colors from "./colors/index";
import Types from "./types/index";
import SizeFunction from './sizes/index'
import Other from "./other";
import { Tab } from "semantic-ui-react";
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
    { menuItem: 'Color(s)', render: () => <Colors></Colors> },
    { menuItem: 'Type(s)', render: () => <Types></Types> },
    { menuItem: 'Size(s)', render: () => <SizeFunction></SizeFunction> },
    { menuItem: 'Others', render: () => <Other></Other> },

]

const Setting = () => {
    const [color, setColor] = useState(colors[Math.floor(Math.random()*colors.length)])
    return (<Tab menu={{ color, fluid: true, vertical: true, tabular: true }} panes={panes} />)
}

export default Setting