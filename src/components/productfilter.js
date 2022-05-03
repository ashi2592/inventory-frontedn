import React from 'react'
import { Dropdown, Icon,Button } from 'semantic-ui-react'

import SearchAndSelectCateory from "./SearchAndSelectCateory";
import SearchAndSelectBrand from "./SearchAndSelectBrand";
// import SearchAndSelectSupplier from "./SearchAndSelectSupplier";
import SearchAndSelectSize from "./SearchAndSelectSize";
import SearchAndSelectProductType from "./SearchAndSelectProductType";
import SearchAndSelectColor from "./SearchAndSelectColor";
// import SearchAndSelectOthers from "./SearchAndSelectOthers";


const ProductFliterFloatedContent = ({ handleSearchDropDownChanges, searchInputs ,searchInputsText}) => {

    const handlerenderLable = ()=>(<Button color='red'>Apply Filter</Button>)

    return (
        <Dropdown
            text='Apply Filter'
            icon='filter'
            labeled
            button
            className='icon'
            renderLabel={handlerenderLable}
            closeOnChange={false}
            
        >
            <Dropdown.Menu>
                <Dropdown.Header icon='tags' content='Filter by tag' />
                <Dropdown.Divider />
                <Dropdown.Item>
                    <SearchAndSelectCateory
                        handleDropDownChanges={handleSearchDropDownChanges}
                        placeholder={'Category'}
                        dropdownName={'category'}
                        value={searchInputs.category}
                        clearable={true}

                    ></SearchAndSelectCateory>
                </Dropdown.Item>
                <Dropdown.Item>
                    <SearchAndSelectProductType
                        handleDropDownChanges={handleSearchDropDownChanges}
                        placeholder={'Search Type'}
                        dropdownName={'type'}
                        value={searchInputs.type}
                        clearable={true}


                    ></SearchAndSelectProductType>
                </Dropdown.Item>
                <Dropdown.Item>
                    <SearchAndSelectColor
                        handleDropDownChanges={handleSearchDropDownChanges}
                        placeholder={'Search Color'}
                        dropdownName={'color'}
                        value={searchInputs.color}
                        clearable={true}


                    ></SearchAndSelectColor>

                </Dropdown.Item>
                <Dropdown.Item>
                    <SearchAndSelectBrand
                        handleDropDownChanges={handleSearchDropDownChanges}
                        placeholder={'Search Brand'}
                        dropdownName={'brand'}
                        value={searchInputs.brand}
                        clearable={true}


                    ></SearchAndSelectBrand>
                </Dropdown.Item>
                <Dropdown.Item>
                    <SearchAndSelectSize
                        handleDropDownChanges={handleSearchDropDownChanges}
                        placeholder={'Search Size'}
                        dropdownName={'size'}
                        value={searchInputs.size}
                        clearable={true}


                    ></SearchAndSelectSize>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProductFliterFloatedContent