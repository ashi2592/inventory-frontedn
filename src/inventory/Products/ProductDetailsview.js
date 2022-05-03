import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Input, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { UPDATE_PRODUCT, DELETE_PRODUCT, ADD_PRODUCT, GET_OTHER_LIST, GET_PRODUCT_DETAILS, ALERT_NOTIFY } from "../../redux/actions";
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
import SearchAndSelectLength from "../../components/SearchAndSelectLength";
import { getProductName } from "../../constant/global";

const ProdutDetailsView = ({ product,
    deleteProduct, updateProduct, addProduct,
    getProduct, alertMessage,
    loading,
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

    }

    const handleDropDownChanges = (key, value) => {
        // alert(JSON.stringify({ key, value }))
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


    }

    const handleCheck = () => {
        setCheck(true)
        setIsChanges(false)
    }


    useEffect(() => {
        if (check) {
            updateProduct(product._id, productUpdated)
            setTimeout(() => {
                alertMessage('success', `Product update successfully`)
            }, 1000)
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
        // delete newProduct.priceType
        addProduct(newProduct)
        setTimeout(() => {
            alertMessage('success', `Duplicate Product Create successfully`);
            history.push(`/product/${product._id}`)
        }, 200)

    }

    const handleNavigateList = () => {
        history.push('/product')
    }




    return (
        (<Container>

            <Header>
                {getProductName(product)}  <p>{product._id}</p>


                {/* {isChanges && (<Button color='primary' onClick={handleCheck}> <Icon name="plus"></Icon>  Update Save</Button>)} */}

            </Header>

            <Grid stackable>
                <GridRow>
                    <GridColumn largeScreen={3} mobile={6}>
                        <Button color='orange' onClick={() => { handleNavigateList() }}> <Icon name="arrow left"></Icon> Back to List</Button>
                    </GridColumn>
                    <GridColumn largeScreen={6} mobile={6} textAlign="right">
                        <Button color='green' onClick={() => { createDuplicateProduct(product._id) }}> <Icon name="plus"></Icon> Duplicate </Button>
                        {/* <Button color='green' onClick={() => { createDuplicateProduct(product._id) }}> <Icon name="plus"></Icon> Create Sizes</Button> */}
                     
                    </GridColumn>
                    <GridColumn largeScreen={7} mobile={6} textAlign="right">
                    <Button color='blue' onClick={() => { handleCheck() }}> <Icon name="save"></Icon> Save</Button>
                    <Button color='red' onClick={() => { handleDeleteProduct(product._id) }}> <Icon name="trash"></Icon> Delete</Button>

                    </GridColumn>
                </GridRow>
            </Grid>
            <Divider></Divider>
            <Table celled >

                <Table.Row>


                </Table.Row>
                <Table.Body >
                    <Table.Row>
                        <Table.Cell>
                            Product Name
                        </Table.Cell>
                        <Table.Cell textAlign="right">
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
                        <Table.Cell textAlign="right">
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
                        <Table.Cell textAlign="right">
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
                        <Table.Cell textAlign="right">

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
                        <Table.Cell textAlign="right">
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
                        <Table.Cell textAlign="right">
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
                            Product Length
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                            <SearchAndSelectLength
                                placeholder={'Product Length'}
                                handleDropDownChanges={handleDropDownChanges}
                                dropdownName={'productLength'}
                                value={productUpdated.productLength}
                            ></SearchAndSelectLength>

                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            Product Supplier
                        </Table.Cell>
                        <Table.Cell textAlign="right">
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
                        <Table.Cell textAlign="right">
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
                        <Table.Cell textAlign="right">
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
                        <Table.Cell textAlign="right">
                            <SearchAndSelectOthers
                                placeholder={'Store'}
                                handleDropDownChanges={handleDropDownChanges}
                                dropdownName={'store'}
                                value={productUpdated.store}
                                keyName='store'
                            ></SearchAndSelectOthers>

                        </Table.Cell>
                    </Table.Row>
                    <Table.Row error={true}>

                        <Table.Cell>
                            <strong>Price Information</strong>
                        </Table.Cell>
                        <Table.Cell></Table.Cell>

                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            Purchase Price
                        </Table.Cell>
                        <Table.Cell textAlign="right">

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
                        <Table.Cell textAlign="right">

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
                        <Table.Cell textAlign="right">

                            <DropdownSearchSelection placeholder={'Price type'} ArrayofObj={pricetypeOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'priceType'} value={productUpdated.priceType}></DropdownSearchSelection>

                        </Table.Cell>
                    </Table.Row>


                    <Table.Row>
                        <Table.Cell>
                            Product Price
                        </Table.Cell>
                        <Table.Cell textAlign="right">

                            <Input

                                placeholder='Enter Product Selling Priice...'
                                name={'productPrice'}
                                value={productUpdated.productPrice}
                                required
                                onChange={(e) => handleUpdateFunction(product._id, 'productPrice', e.target.value)}
                            />
                        </Table.Cell>
                    </Table.Row>




                </Table.Body>

            </Table>

            <ProductBarcode isAutofocusEnable={false}></ProductBarcode>
        </Container>)
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
    error: state.products.error,
    loading: state.products.loading
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