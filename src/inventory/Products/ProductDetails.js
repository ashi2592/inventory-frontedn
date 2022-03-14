import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Icon, Input, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { UPDATE_PRODUCT, DELETE_PRODUCT, GET_CATEGORY_LIST, GET_COLOR_LIST, GET_SIZE_LIST, GET_SUPPLIER_LIST, GET_BRAND_LIST, ADD_PRODUCT } from "../../redux/actions";
import _ from "lodash";
import DropdownSearchSelection from "../../layout/Dropdown";
// var Barcode = require('react-barcode');
import Barcode from "react-barcode";

const ProdutDetails = ({ product, handleAddProduct,
     deleteProduct, updateProduct,addProduct,
    getCategories, categories, colors, getColors,
    sizes, getSizes, suppliers, getSuppliers, getBrand, brand
}) => {

    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [colorOptions, setcolorOptions] = useState([])
    const [sizeOptions, setsizeOption] = useState([])
    const [supplierOptions, setSupplierOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])

    useEffect(() => {
        handleAddProduct(false)
    }, [])



    // initial apis

    useEffect(() => {
        getCategories()
        getColors()
        getSizes()
        getSuppliers()
        getBrand()
    }, [])


    // initial value set
    useEffect(() => {
        // getCategories()

        const categoryOpt = _.map(categories, (data, index) => ({ key: data.id, value: data.categoryName }))
        setCategoriesOptions(categoryOpt)

    }, [categories])

    useEffect(() => {
        const colorOpt = _.map(colors, (data, index) => ({ key: data.id, value: data.color }))
        setcolorOptions(colorOpt)

    }, [colors])


    useEffect(() => {
        const sizeOpt = _.map(sizes, (data, index) => ({ key: data.id, value: data.size }))
        setsizeOption(sizeOpt)

    }, [sizes])
    useEffect(() => {
        const sizeOpt = _.map(suppliers, (data, index) => ({ key: data.id, value: data.supplierName }))
        setSupplierOptions(sizeOpt)
    }, [suppliers])

    useEffect(() => {
        const brandOpt = _.map(brand, (data, index) => ({ key: data.id, value: data.brandName }))
        setBrandOptions(brandOpt)
    }, [brand])



    const handleDeleteProduct = (id) => {
        deleteProduct(id)
    }

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);
    const handleUpdateFunction = (id, key, value) => {
        
        debounceFn(id, key, value)
         
        
    }

    function  handleDebounceFn(id, key, value){
        updateProduct(id, { ...product, [key]: value })
    }

    const handleDropDownChanges = (name, value) => {
        // alert(JSON.stringify({name,value}))
        // setInputs(values => { return { ...values, [name]: value } });
    }

    const createDuplicateProduct = ()=>{

        let data = {...product, status: false};
        addProduct(data)

    }



    return (
        <div >
            <Barcode value={product.id} />
            
            <Table>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>{product.productName} 
                        
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"> <Button color='red' onClick={() => { handleDeleteProduct(product.id) }}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"> <Button color='primary' onClick={() => { createDuplicateProduct(product.id) }}> <Icon name="plus"></Icon> Duplicate Product</Button></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Product ID
                        </Table.Cell>
                        <Table.Cell>
                            {product.id}
                        </Table.Cell>

                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Product Name
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                label={{ basic: true }}
                                labelPosition='right'
                                placeholder='Enter Product Name...'
                                name={'productName'}
                                onChange={(e) => handleUpdateFunction(product.id, 'productName', e.value)}
                                value={product.productName}
                                required
                            />
                        </Table.Cell>

                    </Table.Row>



                    <Table.Row>
                        <Table.Cell>
                            Product Category
                        </Table.Cell>
                        <Table.Cell>
                            <DropdownSearchSelection placeholder={'Category'} ArrayofObj={categoriesOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productCategory'} value={product.productCategory}></DropdownSearchSelection>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Product Colors
                        </Table.Cell>
                        <Table.Cell>
                            <DropdownSearchSelection placeholder={'Colors'} ArrayofObj={colorOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productColor'} value={product.productColor}></DropdownSearchSelection>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Product Size
                        </Table.Cell>
                        <Table.Cell>
                            <DropdownSearchSelection placeholder={'Size'} ArrayofObj={sizeOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productSize'} value={product.productSize}></DropdownSearchSelection>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Product Qty
                        </Table.Cell>
                        <Table.Cell>

                            <Input
                                label={{ basic: true, content: 'Pc' }}
                                labelPosition='right'
                                placeholder='Enter Product qty...'
                                name={'productQty'}
                                onChange={(e) => handleUpdateFunction(product.id, 'productQty', e.target.value)}
                                value={product.productQty}
                                required
                            />
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                            <Table.Cell>
                                Product MRP
                            </Table.Cell>
                            <Table.Cell>

                                <Input
                                    label={{ basic: true, content: 'RS' }}
                                    labelPosition='right'
                                    placeholder='Enter Product MRP...'
                                    name={'productPrice'}
                                    onChange={(e) => handleUpdateFunction(product.id, 'productMRP', e.target.value)}
                                    required
                                    value={product.productMRP}
                                    
                                />
                            </Table.Cell>
                        </Table.Row>


                        <Table.Row>
                            <Table.Cell>
                                Product Sell Price
                            </Table.Cell>
                            <Table.Cell>

                                <Input
                                    label={{ basic: true, content: 'RS' }}
                                    labelPosition='right'
                                    placeholder='Enter Product Selling Priice...'
                                    name={'productSellPrice'}
                                    value={product.productSellPrice}
                                    required
                                    onChange={(e) => handleUpdateFunction(product.id, 'productSellPrice', e.target.value)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Product Supplier
                        </Table.Cell>
                        <Table.Cell>
                            <DropdownSearchSelection placeholder={'Supplier'} ArrayofObj={supplierOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productSupplier'} value={product.productSupplier}></DropdownSearchSelection>

                        </Table.Cell>
                    </Table.Row>


                    <Table.Row>
                        <Table.Cell>
                            Product Brand
                        </Table.Cell>
                        <Table.Cell>
                            <DropdownSearchSelection placeholder={'brand'} ArrayofObj={brandOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productBrand'} value={product.productBrand}></DropdownSearchSelection>

                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Product Status
                        </Table.Cell>
                        <Table.Cell>
                            <Checkbox
                                toggle
                                checked={product.status}
                                label='is Active'
                                onChange={() => handleUpdateFunction(product.id, 'status', !product.status)}
                            />
                        </Table.Cell>
                    </Table.Row>

                </Table.Body>

            </Table>
        </div>
    )
}

ProdutDetails.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    addProduct:  PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    categories: state.category.categories,
    colors: state.colors.colors,
    sizes: state.sizes.sizes,
    suppliers: state.suppliers.suppliers,
    brand: state.brand.brands
})
const mapDispatchToProps = (dispatch) => ({
    deleteProduct: (id) => dispatch({ type: DELETE_PRODUCT, payload: id }),
    updateProduct: (id, data) => dispatch({ type: UPDATE_PRODUCT, payload: { id, data } }),
    addProduct: (data) => dispatch({ type: ADD_PRODUCT, payload: data }),
    getCategories: () => dispatch({ type: GET_CATEGORY_LIST }),
    getColors: () => dispatch({ type: GET_COLOR_LIST }),
    getSizes: () => dispatch({ type: GET_SIZE_LIST }),
    getSuppliers: () => dispatch({ type: GET_SUPPLIER_LIST }),
    getBrand: () => dispatch({ type: GET_BRAND_LIST })

})

export default connect(mapStateToProps, mapDispatchToProps)(ProdutDetails);