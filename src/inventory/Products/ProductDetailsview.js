import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Divider, Form, Grid, GridColumn, GridRow, Header, Icon, Input, Step, Table, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { UPDATE_PRODUCT, DELETE_PRODUCT, ADD_PRODUCT, GET_OTHER_LIST, GET_PRODUCT_DETAILS, ALERT_NOTIFY } from "../../redux/actions";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SearchAndSelectBrand from "../../components/SearchAndSelectBrand";
import SearchAndSelectOthers from "../../components/SearchAndSelectOthers";
import { getProductName } from "../../constant/global";
import ProductVariantPage from '../variants/variants'
import Productviewsteps from "./Productviewsteps";

const ProdutDetailsView = ({ product,
    deleteProduct, updateProduct, addProduct,
    getProduct, alertMessage,
    loading,
}) => {


    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const [check, setCheck] = useState(false);
    const [isChanges, setIsChanges] = useState(false);
    const [inputs, setinputs] = useState({})
    const history = useHistory()
    let { id } = useParams();

    useEffect(() => {
        getProduct(id)
    }, [id])


    useEffect(() => {
        setinputs(product)
    }, [product])



    const handleDeleteProduct = (id) => {
        // setOpenAddModal(false)
        deleteProduct(id)
    }


    const handleUpdateFunction = (event) => {
        // console.log(id,key,value)
        event.preventDefault()

        let name = event.target.name;
        let value = event.target.value;

        setinputs({ ...inputs, [name]: value })
    }





    const handleDropDownChanges = (key, value) => {
        // alert(JSON.stringify({ key, value }))s
        // setInputs(values => { return { ...values, [name]: value } });
        let newProduct = { ...inputs};
        setinputs({ ...newProduct, [key]: value })


    }

    const handleCheck = () => {
        setCheck(true)
        setIsChanges(false)
    }


    useEffect(() => {
        if (check) {
            console.log(inputs)
            let newProduct = { ...inputs };
            delete newProduct.__v;
            delete newProduct._id;
            delete newProduct.createdAt
            delete newProduct.productBrandObj
            delete newProduct.productCategoryObj
            delete newProduct.barcodes
            updateProduct(product._id, newProduct)
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
        (<Container fluid>


            <Grid columns={2} stackable>
                <GridRow>
                    <GridColumn largeScreen={8} mobile={6} >
                        <Productviewsteps productId={product._id} page='product'></Productviewsteps>
                    </GridColumn>
                    <GridColumn largeScreen={8} mobile={6} textAlign="right">
                        <Button color='blue' onClick={() => { handleNavigateList() }}> <Icon name="arrow left"></Icon> Back</Button>
                        <Button color='blue' onClick={() => { handleCheck() }}> <Icon name="save"></Icon> Save</Button>
                    </GridColumn>
                </GridRow>
            </Grid>


            <Form loading={formload} error={formError} >
                <Grid columns={2} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Card fluid>

                                <Card.Content>
                                    <Card.Header>Basic Info</Card.Header>
                                    <Divider></Divider>
                                    <Card.Description>

                                        <Form.Field>
                                            <label>  Product Name</label>
                                            <Input

                                                placeholder='Enter Product Name'
                                                name={'productName'}
                                                onChange={handleUpdateFunction}
                                                value={inputs.productName}
                                                required
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>  Product Description</label>
                                            <TextArea placeholder='Tell us more'
                                              onChange={handleUpdateFunction} 
                                              name={'productDescription'}
                                              value={inputs.productDescription} />

                                        </Form.Field>

                                    </Card.Description>
                                </Card.Content>
                            </Card>

                            <Card fluid>

                                <Card.Content>
                                    <Card.Header>Product Price</Card.Header>
                                    <Divider></Divider>
                                    <Card.Description>

                                        <Form.Field>
                                            <label>  Product Selling Price</label>
                                            <Input

                                                placeholder='Enter Product Name'
                                                name={'productPrice'}
                                                onChange={handleUpdateFunction}
                                                value={inputs.productPrice}
                                                defaultValue ={0}
                                            />
                                        </Form.Field>

                                       

                                    </Card.Description>
                                </Card.Content>
                            </Card>

                        </Grid.Column>
                        <Grid.Column>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Require Info</Card.Header>
                                    <Divider></Divider>
                                    <Card.Description>
                                        <Form.Field>
                                            <label>  Product Category</label>
                                            <SearchAndSelectCateory
                                                handleDropDownChanges={handleDropDownChanges}
                                                placeholder={'Select Category'}
                                                dropdownName={'productCategory'}
                                                value={inputs.productCategory}
                                                clearable={true}
                                            ></SearchAndSelectCateory>

                                        </Form.Field>

                                        <Form.Field>
                                            <label>  Product Brand</label>
                                            <SearchAndSelectBrand
                                                placeholder={'Select Brand'}
                                                handleDropDownChanges={handleDropDownChanges}
                                                dropdownName={'productBrand'}
                                                value={inputs.productBrand}
                                                clearable={true}
                                            ></SearchAndSelectBrand>


                                        </Form.Field>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Optional Info</Card.Header>
                                    <Divider></Divider>
                                    <Card.Description>
                                        <Form.Field>
                                            <label> Store </label>
                                            <SearchAndSelectOthers
                                                placeholder={'Store'}
                                                handleDropDownChanges={handleDropDownChanges}
                                                dropdownName={'store'}
                                                value={inputs.store}
                                                keyName='store'
                                            ></SearchAndSelectOthers>

                                        </Form.Field>

                                        <Form.Field>
                                            <label> Season</label>
                                            <SearchAndSelectOthers
                                                placeholder={'season'}
                                                handleDropDownChanges={handleDropDownChanges}
                                                dropdownName={'season'}
                                                value={inputs.season}
                                                keyName='season'

                                            ></SearchAndSelectOthers>



                                        </Form.Field>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Form>
            {/* <ProductVariantPage productId={inputs._id}></ProductVariantPage> */}
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