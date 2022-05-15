import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Grid, GridColumn, GridRow, Header, Icon, Input, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { DELETE_CATEGORY, GET_CATEGORY_DETAILS, UPDATE_CATEGORY } from "../../redux/actions";

import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SettingSidebarPage from "../settingSidebar";

const CategoryDetailsPage = ({ category, deleteCategory, updateCategory, getCategory }) => {


    const { id } = useParams();
    const history = useHistory()

    const [inputs, setInputs] = useState({})


    useEffect(() => {
        setInputs(category)
    }, [category])

    useEffect(() => {
        getCategory(id)
    }, [id])

    const handleDeleteCategory = (id) => {
        deleteCategory(id)
    }

    const handleChange = (key,value) => {
        let values = { ...inputs, [key]: value }
        if(value == '')
        {
            delete values[key]
        }
        console.log(values)
        // setInputs(values => { return { ...values, [key]: value } })
  
    }


    const handleSaveButton = () => {
        delete inputs._id;
        delete inputs.__v;
        delete inputs.createdAt;

        // console.log(inputs)
        let Categorydata = {...inputs}
        updateCategory(id, Categorydata)
    }

    const handleBack = () => {
        history.push(`/category`)
    }
    const handleAddBrand = () => {

        history.push('/category/add')
    }

    const handleSearchDropDownChanges = (name, value, text) => {
        let inputdata = { ...inputs, [name]: value };
        if(value == '')
        {
            delete inputdata[name]
        }

        setInputs(inputdata)
    }


    return (
        <Container>
            <Header>Category</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'category'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back</Button>
                        <Button color="green" onClick={handleAddBrand}><Icon name="plus"></Icon> Add</Button>
                       {Object.keys(inputs).length !== 0 && (<Button color="blue" onClick={handleSaveButton}><Icon name="save"></Icon> Save</Button>)} 
                        <Button color='red' onClick={() => { handleDeleteCategory(category._id) }}> <Icon name="trash"></Icon> Delete</Button>
                    </GridColumn>
                </GridRow>
            </Grid>
            <Divider></Divider>
            <Grid>
                <GridRow>
                    <GridColumn>
                        <Table>
                            <Table.Header>
                                <Table.Row >
                                    <Table.HeaderCell colSpan={2}>{inputs.categoryName}</Table.HeaderCell>
                                    {/* <Table.HeaderCell collapsing={3} textAlign="right"></Table.HeaderCell> */}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        Category ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {inputs._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Category Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {/* {inputs.categoryName} */}
                                        <Form.Field
                                            id="form-input-control-taxPercent"
                                            control={Input}
                                            placeholder='Enter Tax Percentage'
                                            onChange={(e)=> handleChange('categoryName', e.target.value)}
                                            name={'categoryName'}
                                            value={inputs.categoryName}

                                        />

                                    </Table.Cell>

                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Parent Category
                                    </Table.Cell>
                                    <Table.Cell>
                                        <SearchAndSelectCateory
                                            handleDropDownChanges={handleSearchDropDownChanges}
                                            placeholder={'Select Parent Category'}
                                            dropdownName={'parent'}
                                            value={inputs.parent}
                                            clearable={true}

                                        >

                                        </SearchAndSelectCateory>
                                    </Table.Cell>

                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        GST Tax Percent
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Field
                                            id="form-input-control-taxPercent"
                                            control={Input}
                                            placeholder='Enter Tax Percentage'
                                            onChange={(e)=> handleChange('taxPercent', e.target.value)}
                                            name={'taxPercent'}
                                            value={inputs.taxPercent}

                                        />
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        HSN Code
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Field
                                            id="form-input-control-hsncode"
                                            control={Input}
                                            placeholder='Enter HSN Code'
                                            onChange={(e)=> handleChange('hsncode', e.target.value)}
                                            name={'hsncode'}
                                            value={inputs.hsncode}
                                        />
                                    </Table.Cell>

                                </Table.Row>


                            </Table.Body>

                        </Table>
                    </GridColumn>

                </GridRow>
            </Grid>
        </Container>

    )
}



const mapStateToProps = (state) => ({
    category: state.category.category
})
const mapDispatchToProps = (dispatch) => ({
    deleteCategory: (id) => dispatch({ type: DELETE_CATEGORY, payload: id }),
    updateCategory: (id, data) => dispatch({ type: UPDATE_CATEGORY, payload: { id, data } }),
    getCategory: (id) => dispatch({ type: GET_CATEGORY_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailsPage);