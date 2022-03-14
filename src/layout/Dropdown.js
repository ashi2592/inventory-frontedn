import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const DropdownSearchSelection = ({ ArrayofObj, placeholder, dropdownName, value, handleDropDownChanges }) => {

    const Options = _.map(ArrayofObj, (data, index) => ({
        key: data.key,
        text: data.value,
        value: data.key,
    }))

    const handleChange = (e, { name, value }) => handleDropDownChanges(name,value)

    return (<Dropdown placeholder={placeholder} search selection options={Options} onChange={handleChange} name={dropdownName} value={value}  />)
}

export default DropdownSearchSelection