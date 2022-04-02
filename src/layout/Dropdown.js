import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const DropdownSearchSelection = ({ ArrayofObj, placeholder, dropdownName, value, handleDropDownChanges, isSearchable, allowAdditions= false ,handleAdditionChanges}) => {

    const Options = _.map(ArrayofObj, (data, index) => ({
        key: data.key,
        text: data.value,
        value: data.key,
    }))

    const handleChange = (e, { name, value }) => handleDropDownChanges(name,value)
    const handleAddition = (e, { value }) => handleAdditionChanges(value)


    return (<Dropdown placeholder={placeholder} search selection options={Options} onChange={handleChange} name={dropdownName} value={value}  allowAdditions={allowAdditions}
        onAddItem={handleAddition}
        />)
}

export default DropdownSearchSelection