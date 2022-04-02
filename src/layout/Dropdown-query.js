import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'


const DropdownExampleSearchQuery = ({ ArrayofObj, placeholder, dropdownName, value, handleDropDownChanges, handleSearchChange }) => {

    const [searchText, setSearchText] = useState('');
    const [searchOpt, setSearchOpt] = useState([]);



    
    const handleSearch = (e, { searchQuery }) => {
        handleSearchChange(searchQuery)        
        setSearchText(searchQuery)
    }

    useEffect(()=>{
        
        const Options = _.map(ArrayofObj, (data, index) => ({
            key: data.key,
            text: data.text,
            value: data.value,
        }))
        setSearchOpt(Options)
    },[ArrayofObj])

    const handleChange = (e, { name, value }) => handleDropDownChanges(value)

    return (<Dropdown placeholder={placeholder}
        search
        selection
        options={searchOpt}
        onChange={handleChange}
        name={dropdownName}
        onSearchChange={handleSearch}
        searchQuery={searchText}
        
    />)
}


export default DropdownExampleSearchQuery