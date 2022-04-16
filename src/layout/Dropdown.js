import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const DropdownSearchSelection = ({ ArrayofObj, placeholder, dropdownName, value, handleDropDownChanges, isSearchable, allowAdditions= false ,handleAdditionChanges,clearable=false}) => {

    const Options = _.map(ArrayofObj, (data, index) => ({
        key: data.key,
        text: data.value,
        value: data.key,
    }))

    const handleChange = (e, { name, value }) => handleDropDownChanges(name,value,e.target.textContent)
    const handleAddition = (e, { value }) => handleAdditionChanges(value)


    return (<Dropdown placeholder={placeholder} search  options={Options} onChange={handleChange} name={dropdownName} value={value}  allowAdditions={allowAdditions}
        onAddItem={handleAddition}
        selection={true}
        clearable={clearable}
        
        />)
}

export default DropdownSearchSelection