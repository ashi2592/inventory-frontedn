import React, { useEffect, useState } from "react";
import { Form, Input, Button, Container, Header, GridRow, GridColumn, Grid, Icon, Divider, Card, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_PRODUCT, ALERT_NOTIFY, } from "../../redux/actions";
import DropdownSearchSelection from "../../layout/Dropdown";
import _ from "lodash";
import { useHistory } from "react-router-dom";

import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SearchAndSelectBrand from "../../components/SearchAndSelectBrand";
import SearchAndSelectOthers from "../../components/SearchAndSelectOthers";


const AddProduct = ({ addProduct, alertMessage, product }) => {

    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const [inputs, setInputs] = useState({});
    const [pricetypeOption, setPricetypeOption] = useState([{ key: 'flat', value: 'Flat' }])
    const history = useHistory()
    const [productName, setProductName] = useState('')
    const [productNameObj, setProductNameObj] = useState({});

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
        // { ...inputs, productCode: generateCode() }
        // x = { ...x, priceType: 'flat' }
        let x = { ...inputs, season: localStorage.getItem('season') }
        x = { ...x, store: localStorage.getItem('store') }

        setInputs(x)
    }, [])



    const handleChange = (event) => {
        event.preventDefault()

        let name = event.target.name;
        let value = event.target.value;
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

    const handleSubmit = () => {
        // event.preventDefault();

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
        <Container fluid>
            <Header>Add Product</Header>
            <Grid stackable>
                <GridRow>
                    <GridColumn largeScreen={8}>
                    </GridColumn>
                    <GridColumn largeScreen={8} textAlign="right">
                        <Button color='blue' onClick={() => { handleNavigateList() }}> <Icon name="arrow left"></Icon> Back </Button>

                        <Button color='blue' onClick={() => { handleSubmit() }}> <Icon name="save"></Icon> Save</Button>

                    </GridColumn>
                </GridRow>
            </Grid>
            <Divider></Divider>

            <Form loading={formload} error={formError} onSubmit={handleSubmit}>
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
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>  Product Description</label>
                                            <TextArea placeholder='Tell us more' 
                                            onChange={handleChange} 
                                            name={'productDescription'}
                                            value={inputs.productDescription}
                                            
                                            />
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

                                                placeholder='Enter Product Price'
                                                name={'productPrice'}
                                                onChange={handleChange}
                                                value={inputs.productPrice}
                                                defaultValue={0}
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
                                                error={false}
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
                                                error={false}
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