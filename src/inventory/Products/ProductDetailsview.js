import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Icon, Input, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { UPDATE_PRODUCT, DELETE_PRODUCT, GET_CATEGORY_LIST, GET_COLOR_LIST, GET_SIZE_LIST, GET_SUPPLIER_LIST, GET_BRAND_LIST, ADD_PRODUCT, GET_TYPE_LIST, GET_OTHER_LIST, DELETE_BARCODE, GET_PRODUCT_DETAILS } from "../../redux/actions";
import _ from "lodash";
import DropdownSearchSelection from "../../layout/Dropdown";
import Barcode from "react-barcode";
import { useParams } from "react-router-dom";
import ProductBarcode from "./Product-barcode";

const ProdutDetailsView = ({ product, 
    deleteProduct, updateProduct, addProduct,
    getCategories, categories, colors, getColors,
    sizes, getSizes, suppliers, getSuppliers, getBrands, brand,
    types, others, error, getTypes, getOthers,
    getProduct
}) => {

    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [colorOptions, setcolorOptions] = useState([])
    const [sizeOptions, setsizeOption] = useState([])
    const [supplierOptions, setSupplierOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [typeOption, setTypeOption] = useState([])
    const [seasonOption, setSeasonOption] = useState([])
    const [storeOption, setStoreOption] = useState([])
    const [check, setCheck] = useState(false);
    const [isChanges, setIsChanges] = useState(false);
    const [productUpdated, setProductUpdated] = useState({})

    let { id } = useParams();

    useEffect(()=>{
        getProduct(id)
    },[id])




    // initial apis

    useEffect(() => {
        getCategories(1, 100, '')
        getColors(1, 100, '')
        getSizes(1, 100, '')
        getSuppliers(1, 100, '')
        getBrands(1, 100, '')
        getTypes(1, 100, '')
        getOthers(1, 100, '')
    }, [])


    useEffect(()=>{
        setProductUpdated(product)
    },[product])


    // initial value set
    useEffect(() => {
        // getCategories()

        const categoryOpt = _.map(categories, (data, index) => ({ key: data._id, value: data.categoryName }))
        setCategoriesOptions(categoryOpt)

    }, [categories])

    useEffect(() => {
        const colorOpt = _.map(colors, (data, index) => ({ key: data._id, value: data.colorName }))
        setcolorOptions(colorOpt)

    }, [colors])


    useEffect(() => {
        const sizeOpt = _.map(sizes, (data, index) => ({ key: data._id, value: data.sizeName }))
        setsizeOption(sizeOpt)

    }, [sizes])
    useEffect(() => {
        const sizeOpt = _.map(suppliers, (data, index) => ({ key: data._id, value: data.supplierName }))
        setSupplierOptions(sizeOpt)
    }, [suppliers])

    useEffect(() => {
        const brandOpt = _.map(brand, (data, index) => ({ key: data._id, value: data.brandName }))
        setBrandOptions(brandOpt)
    }, [brand])

    useEffect(() => {
        const typesOpt = _.map(types, (data) => ({ key: data._id, value: data.typeName }))
        setTypeOption(typesOpt)
    }, [types])

    useEffect(() => {
        const seasonOpt = others.filter(data => data.keyName == 'season')
            .map((data) => ({ key: data._id, value: data.value }))
        setSeasonOption(seasonOpt)
    }, [others])


    useEffect(() => {
        const seasonOpt = others.filter(data => data.keyName == 'store')
            .map((data) => ({ key: data._id, value: data.value }))
        setStoreOption(seasonOpt)
    }, [others])


    const handleDeleteProduct = (id) => {
        // setOpenAddModal(false)
        deleteProduct(id)
    }

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);


    const handleUpdateFunction = (id, key, value) => {
        // console.log(id,key,value)
        setProductUpdated({ ...productUpdated, [key]: value })
         debounceFn(key, value,productUpdated)
    }



    function handleDebounceFn(key, value,productUpdated) {
        let newProduct ={ ...productUpdated, status: true };
    
        // newProduc.barcodes = product;
        delete newProduct.__v;
        delete newProduct.createdAt
        delete newProduct.productSupplierObj
        delete newProduct.productSizeObj
        delete newProduct.productTypeObj
        delete newProduct.productColorObj
        delete newProduct.productCategoryObj
        delete newProduct.productBrandObj;
        delete newProduct.barcodes
        setProductUpdated({ ...newProduct, [key]: value })
        setCheck(true)

    }

    const handleDropDownChanges = (key, value) => {
        // alert(JSON.stringify({key,value}))
        // setInputs(values => { return { ...values, [name]: value } });
        let newProduct = { ...productUpdated, status: true };
        delete newProduct.__v;
        delete newProduct.createdAt
        delete newProduct.productSupplierObj
        delete newProduct.productSizeObj
        delete newProduct.productTypeObj
        delete newProduct.productColorObj
        delete newProduct.productCategoryObj
        delete newProduct.productBrandObj
        delete newProduct.barcodes
        delete newProduct.productPurchasePrice
        // delete newProduct.priceType
        setProductUpdated({ ...newProduct, [key]: value })
        setCheck(true)

    }

    const handleCheck = () => {
        setCheck(true)
        setIsChanges(false)
    }


    useEffect(() => {
        if (check) {
            updateProduct(product._id, productUpdated)
        }

    }, [check])

    const createDuplicateProduct = () => {

        let newProduct = { ...product, status: true };
        delete newProduct.__v;
        delete newProduct._id;
        delete newProduct.createdAt
        delete newProduct.productSupplierObj
        delete newProduct.productSizeObj
        delete newProduct.productTypeObj
        delete newProduct.productColorObj
        delete newProduct.productCategoryObj
        delete newProduct.productBrandObj
        delete newProduct.barcodes
        delete newProduct.productPurchasePrice
        // delete newProduct.priceType
        addProduct(newProduct)

    }

   


    return (
        <div >
            {/* <Barcode value={product.productCode} /> */}

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{product.productName}

                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"> <Button color='red' onClick={() => { handleDeleteProduct(product._id) }}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"> <Button color='primary' onClick={() => { createDuplicateProduct(product._id) }}> <Icon name="plus"></Icon> Duplicate Product</Button></Table.HeaderCell>
                        {isChanges && (<Table.HeaderCell textAlign="right"> <Button color='primary' onClick={handleCheck}> <Icon name="plus"></Icon>  Update Save</Button></Table.HeaderCell>)}


                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    <Table.Row>
                        <Table.Cell>
                            <Table.Row>
                                <Table.Cell>
                                    Product ID
                                </Table.Cell>
                                <Table.Cell>
                                    {product._id}
                                </Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Name
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        placeholder='Enter Product Name...'
                                        name={'productName'}
                                        onChange={(e) => handleUpdateFunction(product._id, 'productName', e.target.value)}
                                        value={productUpdated.productName}
                                        required
                                    />
                                </Table.Cell>

                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    Product Code
                                </Table.Cell>
                                <Table.Cell>
                                    <Input

                                        placeholder='Enter Product code...'
                                        name={'productCode'}
                                        onChange={(e) => handleUpdateFunction(product._id, 'productCode', e.target.value)}
                                        value={productUpdated.productCode}
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
                                    Product types
                                </Table.Cell>
                                <Table.Cell>
                                    <DropdownSearchSelection placeholder={'Product types'} ArrayofObj={typeOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'productType'} value={product.productType}></DropdownSearchSelection>
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    Product Size
                                </Table.Cell>
                                <Table.Cell>
                                    <DropdownSearchSelection placeholder={'Product Size'} ArrayofObj={sizeOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productSize'} value={product.productSize}></DropdownSearchSelection>
                                </Table.Cell>
                            </Table.Row>


                        </Table.Cell>
                        <Table.Cell>

                            <Table.Row>
                                <Table.Cell>
                                    Product Qty
                                </Table.Cell>
                                <Table.Cell>

                                    <Input

                                        placeholder='Enter Product qty...'
                                        name={'productQty'}
                                        onChange={(e) => handleUpdateFunction(product._id, 'productQty', e.target.value)}
                                        value={productUpdated.productQty}
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

                                        placeholder='Enter Product MRP...'
                                        name={'productMrp'}
                                        onChange={(e) => handleUpdateFunction(product._id, 'productMRP', e.target.value)}
                                        required
                                        value={productUpdated.productMrp}

                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Sell Price
                                </Table.Cell>
                                <Table.Cell>

                                    <Input

                                        placeholder='Enter Product Selling Priice...'
                                        name={'productPrice'}
                                        value={productUpdated.productPrice}
                                        required
                                        onChange={(e) => handleUpdateFunction(product._id, 'productPrice', e.target.value)}
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
                                    Product Season
                                </Table.Cell>
                                <Table.Cell>
                                    <DropdownSearchSelection placeholder={'Season'} ArrayofObj={seasonOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'season'} value={product.season}></DropdownSearchSelection>
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    Product Store
                                </Table.Cell>
                                <Table.Cell>
                                    <DropdownSearchSelection placeholder={'Store'} ArrayofObj={storeOption} dropdownName={'store'} value={product.store}></DropdownSearchSelection>
                                </Table.Cell>
                            </Table.Row>
                          
                        </Table.Cell>

                    </Table.Row>

        

                </Table.Body>

            </Table>

            <div>
                <div className="row">
                    <ProductBarcode></ProductBarcode>
                </div>
            </div>
        </div>
    )
}

ProdutDetailsView.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    categories: state.category.categories,
    colors: state.colors.colors,
    sizes: state.sizes.sizes,
    suppliers: state.suppliers.suppliers,
    brand: state.brand.brands,
    types: state.types.types,
    others: state.others.others,
    error: state.products.error
})
const mapDispatchToProps = (dispatch) => ({
    deleteProduct: (id) => dispatch({ type: DELETE_PRODUCT, payload: id }),
    updateProduct: (id, data) => dispatch({ type: UPDATE_PRODUCT, payload: { id, data } }),
    addProduct: (data) => dispatch({ type: ADD_PRODUCT, payload: data }),
    getCategories: (page, count, searchText) => dispatch({ type: GET_CATEGORY_LIST, payload: { page, count, searchText } }),
    getColors: (page, count, searchText) => dispatch({ type: GET_COLOR_LIST, payload: { page, count, searchText } }),
    getSizes: (page, count, searchText) => dispatch({ type: GET_SIZE_LIST, payload: { page, count, searchText } }),
    getSuppliers: (page, count, searchText) => dispatch({ type: GET_SUPPLIER_LIST, payload: { page, count, searchText } }),
    getBrands: (page, count, searchText) => dispatch({ type: GET_BRAND_LIST, payload: { page, count, searchText } }),
    getTypes: (page, count, searchText) => dispatch({ type: GET_TYPE_LIST, payload: { page, count, searchText } }),
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } }),
    getProduct: (id) => dispatch({ type: GET_PRODUCT_DETAILS, payload: { id } }),



})

export default connect(mapStateToProps, mapDispatchToProps)(ProdutDetailsView);