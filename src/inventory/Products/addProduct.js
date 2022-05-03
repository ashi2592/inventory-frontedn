import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Message, Table, Tab, Container, Header, GridRow, GridColumn, Grid, Icon, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_PRODUCT, ALERT_NOTIFY, GET_BRAND_LIST, GET_CATEGORY_LIST, GET_COLOR_LIST, GET_OTHER_LIST, GET_SIZE_LIST, GET_SUPPLIER_LIST, GET_TYPE_LIST } from "../../redux/actions";
import DropdownSearchSelection from "../../layout/Dropdown";
import _ from "lodash";
import { useHistory } from "react-router-dom";

import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SearchAndSelectBrand from "../../components/SearchAndSelectBrand";
import SearchAndSelectSupplier from "../../components/SearchAndSelectSupplier";
import SearchAndSelectSize from "../../components/SearchAndSelectSize";
import SearchAndSelectProductType from "../../components/SearchAndSelectProductType";
import SearchAndSelectColor from "../../components/SearchAndSelectColor";
import SearchAndSelectOthers from "../../components/SearchAndSelectOthers";
import SearchAndSelectLength from "../../components/SearchAndSelectLength";


const AddProduct = ({ addProduct, alertMessage, product }) => {

    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const [inputs, setInputs] = useState({});
    const [pricetypeOption, setPricetypeOption] = useState([{ key: 'flat', value: 'Flat' }])
    const history = useHistory()
    const [productName, setProductName] = useState('')
    const [productNameObj, setProductNameObj] = useState({})

    // initial apis

    useEffect(() => {

    }, [])


    const generateCode = () => {
        var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let inde = Math.floor(Math.random() * 25);
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let x = 'F' + getRandomInt(0, 99) + s[inde].toUpperCase() + getRandomInt(0, 9)

        return x;
    }


    useEffect(() => {
        let x = { ...inputs, productCode: generateCode() }
        x = { ...x, season: localStorage.getItem('season') }
        x = { ...x, store: localStorage.getItem('store') }
        x = { ...x, priceType: 'flat' }
        setInputs(x)
    }, [])



    const handleChange = (event) => {
        event.preventDefault()

        let name = event.target.name;
        let value = event.target.value;
        // alert(name + '==========' + value)
        setInputs(values => { return { ...values, [name]: value } });

    }

    const handleCheckbox = (name, value) => {
        setInputs(values => { return { ...values, [name]: !value } });
    }


    const handleDropDownChanges = (name, value, text) => {
        setInputs(values => { return { ...values, [name]: value } })
        if (name !== 'productSupplier') {
            setProductNameObj(values => { return { ...values, [name]: text } })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let name = '';
        Object.values(productNameObj).map((x, i) => {
            if (i !== 0) {
                name += '-'
            }
            name += x
        })

        let x = { ...inputs, productName: name }
        addProduct(x);

    }


    useEffect(() => {
        if (Object.keys(product).length) {
            setTimeout(() => {
                alertMessage('success', 'New Product Added Successfully')
                history.push(`/product/${product._id}`)
            }, 1000)
        }

    }, [product])

    const handleNavigateList = () => {
        history.push('/product')
    }


    return (
        <Container>
            <Header>Add Product</Header>
            <Grid stackable>
                <GridRow>
                    <GridColumn largeScreen={6}>
                    <Button color='orange' onClick={() => { handleNavigateList() }}> <Icon name="arrow left"></Icon> Back to Product List</Button>
                    </GridColumn>
                    <GridColumn  largeScreen={8} textAlign="right">
                                     </GridColumn>
                </GridRow>
            </Grid>
            <Divider></Divider>
            <Form loading={formload} error={formError} onSubmit={handleSubmit}>

                <Form.Group >
                    <Table celled>
                        <Table.Body>

                            <Table.Row>
                                <Table.Cell>
                                    Product Season
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectOthers
                                        placeholder={'season'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'season'}
                                        value={inputs.season}
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
                                        value={inputs.store}
                                        keyName='store'
                                    ></SearchAndSelectOthers>
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
                                        value={inputs.productCategory}
                                        clearable={true}
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
                                        value={inputs.productColor}
                                        clearable={true}
                                    ></SearchAndSelectColor>

                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Type
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectProductType
                                        placeholder={'Product Type'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productType'}
                                        value={inputs.productType}
                                        clearable={true}
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
                                        value={inputs.productSize}
                                        clearable={true}
                                    ></SearchAndSelectSize>

                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Product Length
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectLength
                                        placeholder={'Product Length'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productLength'}
                                        value={inputs.productLength}
                                        clearable={true}
                                    ></SearchAndSelectLength>

                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    Product Suppliers
                                </Table.Cell>
                                <Table.Cell>
                                    <SearchAndSelectSupplier
                                        placeholder={'Supplier'}
                                        handleDropDownChanges={handleDropDownChanges}
                                        dropdownName={'productSupplier'}
                                        value={inputs.productSupplier}
                                        clearable={true}
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
                                        value={inputs.productBrand}
                                        clearable={true}
                                    ></SearchAndSelectBrand>

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
                                <Table.Cell>

                                    <Input

                                        placeholder='Enter Product Purchase Price...'
                                        name={'productPurchasePrice'}
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        required
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Price Type
                                </Table.Cell>
                                <Table.Cell>

                                    <DropdownSearchSelection placeholder={'Price type'} ArrayofObj={pricetypeOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'priceType'} value={inputs.priceType}></DropdownSearchSelection>

                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>
                                    Product Price
                                </Table.Cell>
                                <Table.Cell>

                                    <Input
                                        placeholder='Enter Product Selling Price...'
                                        name={'productPrice'}
                                        onChange={handleChange}
                                        required
                                    />
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2' textAlign="right">
                                    <Button  color="green" type='submit'> Create Product</Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>

                    </Table>





                </Form.Group>
            </Form>
        </Container>


    )
}


const mapDispatchToProps = (dispatch) => ({


    addProduct: (data) => dispatch({ type: ADD_PRODUCT, payload: data }),
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),


}
)


const mapStateToProps = (state) => ({
    error: state.products.error,
    product: state.products.product
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);