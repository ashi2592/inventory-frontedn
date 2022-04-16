import React, { useCallback, useEffect, useState } from "react";
import { Button, Icon, Input, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { UPDATE_PRODUCT, DELETE_PRODUCT, GET_CATEGORY_LIST, GET_COLOR_LIST, GET_SIZE_LIST, GET_SUPPLIER_LIST, GET_BRAND_LIST, ADD_PRODUCT, GET_TYPE_LIST, GET_OTHER_LIST, DELETE_BARCODE, GET_PRODUCT_DETAILS, ALERT_NOTIFY } from "../../redux/actions";
import _ from "lodash";
import DropdownSearchSelection from "../../layout/Dropdown";
import { useParams } from "react-router-dom";
import ProductBarcode from "./Product-barcode";
import { useHistory } from "react-router-dom";
import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SearchAndSelectBrand from "../../components/SearchAndSelectBrand";
import SearchAndSelectSupplier from "../../components/SearchAndSelectSupplier";
import SearchAndSelectSize from "../../components/SearchAndSelectSize";
import SearchAndSelectProductType from "../../components/SearchAndSelectProductType";
import SearchAndSelectColor from "../../components/SearchAndSelectColor";
import SearchAndSelectOthers from "../../components/SearchAndSelectOthers";

const ProdutDetailsView = ({ product,
    deleteProduct, updateProduct, addProduct,
    others, getOthers,
    getProduct, alertMessage
}) => {

    const [check, setCheck] = useState(false);
    const [isChanges, setIsChanges] = useState(false);
    const [productUpdated, setProductUpdated] = useState({})
    const [pricetypeOption, setPricetypeOption] = useState([{ key: 'flat', value: 'Flat' }])
    const history = useHistory()
    let { id } = useParams();

    useEffect(() => {
        getProduct(id)
    }, [id])




    // initial apis

    useEffect(() => {

        getOthers(1, 100, '')
    }, [])




    useEffect(() => {

        setProductUpdated(product)

    }, [product])



    const handleDeleteProduct = (id) => {
        // setOpenAddModal(false)
        deleteProduct(id)
    }

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);


    const handleUpdateFunction = (id, key, value) => {
        // console.log(id,key,value)
        setProductUpdated({ ...productUpdated, [key]: value })
        debounceFn(key, value, productUpdated)
    }



    function handleDebounceFn(key, value, productUpdated) {
        let newProduct = { ...productUpdated, status: true };

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
        setTimeout(() => {
            alertMessage('success', `${key} update successfully`)
        }, 5000)
    }

    const handleDropDownChanges = (key, value) => {
        alert(JSON.stringify({ key, value }))
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
        setTimeout(() => {
            alertMessage('success', `${key} update successfully`)
        }, 5000)

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
                                    <SearchAndSelectCateory
                                        handleDropDownChanges={handleDropDownChanges}
                                        placeholder={'Category'}
                                        dropdownName={'productCategory'}
                                        value={productUpdated.productCategory}
                                    ></SearchAndSelectCateory>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Colors
                                </Table.Cell>
                                <Table.Cell>

                                    <SearchAndSelectColor
                                        placeholder={'Product Color'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productColor'}
                                        value={productUpdated.productColor}
                                    ></SearchAndSelectColor>

                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product types
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectProductType
                                        placeholder={'Product Type'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productType'}
                                        value={productUpdated.productType}
                                    ></SearchAndSelectProductType>

                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    Product Size
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectSize
                                        placeholder={'Product Size'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productSize'}
                                        value={productUpdated.productSize}
                                    ></SearchAndSelectSize>

                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Supplier
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectSupplier
                                        placeholder={'Supplier'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productSupplier'}
                                        value={productUpdated.productSupplier}
                                    ></SearchAndSelectSupplier>

                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Brand
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectBrand
                                        placeholder={'brand'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productBrand'}
                                        value={productUpdated.productBrand}
                                    ></SearchAndSelectBrand>

                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Season
                                </Table.Cell>
                                <Table.Cell>
                                <SearchAndSelectOthers
                                        placeholder={'season'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'season'}
                                        value={productUpdated.season}
                                        keyName='season'
                                    ></SearchAndSelectOthers>

                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    Product Store
                                </Table.Cell>
                                <Table.Cell>
                                <SearchAndSelectOthers
                                        placeholder={'Store'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'store'}
                                        value={productUpdated.store}
                                        keyName='store'
                                    ></SearchAndSelectOthers>

                                </Table.Cell>
                            </Table.Row>



                        </Table.Cell>
                        <Table.Cell>

                            <Table.Row>
                                <Table.Cell>
                                    Purchase Price
                                </Table.Cell>
                                <Table.Cell>

                                    <Input

                                        placeholder='Enter purchase price'
                                        name={'productPurchasePrice'}
                                        onChange={(e) => handleUpdateFunction(product._id, 'productPurchasePrice', e.target.value)}
                                        required
                                        value={productUpdated.productPurchasePrice}

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
                                    Price Type
                                </Table.Cell>
                                <Table.Cell>

                                    <DropdownSearchSelection placeholder={'Price type'} ArrayofObj={pricetypeOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'priceType'} value={productUpdated.priceType}></DropdownSearchSelection>

                                </Table.Cell>
                            </Table.Row>


                            <Table.Row>
                                <Table.Cell>
                                    Product Price
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



                        </Table.Cell>

                    </Table.Row>



                </Table.Body>

            </Table>

            <div>
                <div className="row">
                    <ProductBarcode isAutofocusEnable={false}></ProductBarcode>
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
    others: state.others.others,
    error: state.products.error
})
const mapDispatchToProps = (dispatch) => ({
    deleteProduct: (id) => dispatch({ type: DELETE_PRODUCT, payload: id }),
    updateProduct: (id, data) => dispatch({ type: UPDATE_PRODUCT, payload: { id, data } }),
    addProduct: (data) => dispatch({ type: ADD_PRODUCT, payload: data }),
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } }),
    getProduct: (id) => dispatch({ type: GET_PRODUCT_DETAILS, payload: { id } }),
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),



})

export default connect(mapStateToProps, mapDispatchToProps)(ProdutDetailsView);