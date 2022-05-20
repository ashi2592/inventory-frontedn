import React, { useEffect, useState } from "react";
import { Button, Checkbox, Container, Divider, Form, Grid, GridColumn, GridRow, Header, Icon, Input, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { DELETE_BRAND, GET_BRAND_DETAILS, UPDATE_BRAND } from "../../redux/actions";

import SettingSidebarPage from "../settingSidebar";

const BrandDetails = ({ brand,deleteBrand,updateBrand,getBrand }) => {

    
    const { id } = useParams();
    const history = useHistory()

    const [inputs, setInputs] = useState({})   

    useEffect(() => {
        getBrand(id)
    }, [id]) 
      

    useEffect(() => {
        setInputs(brand)
    }, [brand])

    const handleDeleteBrand = (id) =>{
        deleteBrand(id)
        history.push(`/brand`)
    }
    const handleChange = (event) => {
        event.preventDefault()
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => { return { ...values, [name]: value, } });
    }

    

    const handleUpdateFunction = () => {
        let {brandName, imageUrl} = inputs;
        updateBrand(id, {brandName, imageUrl})
    }
 
 


 

    const handleBack = ()=>{
        history.push(`/brand`)
    }
    const handleAddBrand = () => {

        history.push('/brand/add')
    }

    return (
        <Container>
            <Header>Brand</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                    <SettingSidebarPage activeItem={'brand'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAddBrand}><Icon name="plus"></Icon> Add Brand</Button>
                        <Button color='red' onClick={() => { handleDeleteBrand(brand._id) }}> <Icon name="close"></Icon> Delete Brand</Button>
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
                                    <Table.HeaderCell>{brand.brandName}</Table.HeaderCell>
                                    {/* <Table.HeaderCell collapsing={3} textAlign="right"></Table.HeaderCell> */}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                    Brand ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {brand._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Brand Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {brand.brandName}
                                    </Table.Cell>

                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                       Brand Image
                                    </Table.Cell>
                                    <Table.Cell>
                                        {brand.imageUrl}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Group widths={'equal'}>

                                        <Form.Field
                                            id="form-input-control-color-code"
                                            control={Input}
                                            placeholder='Enter brand url'
                                            onChange={handleChange}
                                            name={'imageUrl'}
                                            autoFocus={true}
                                            value={inputs.imageUrl}
                                        />

                                       
                                        </Form.Group>
                                        
                                    </Table.Cell>
                                    
                                    <Table.Cell>
                                    <Button onClick={handleUpdateFunction} color="orange"> <Icon name="save"></Icon></Button>
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

BrandDetails.propTypes ={
    deleteBrand: PropTypes.func.isRequired,
    updateBrand: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    brand: state.brands.brand
})
const mapDispatchToProps = (dispatch) => ({
    deleteBrand: (id) => dispatch({type: DELETE_BRAND, payload: id}),
    updateBrand: (id,data) => dispatch({type: UPDATE_BRAND,payload:{id,data}}),
    getBrand: (id) =>  dispatch({type: GET_BRAND_DETAILS,payload:{id}}),
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetails);