import React, { useEffect } from "react";
import { Button, Checkbox, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_COLOR, DELETE_LENGTH, GET_LENGTH_DETAILS, UPDATE_LENGTH } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";

const ProductLengthDetailsPage = ({ productLength, deleteLength, updateLength, getLenght }) => {


    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        getLenght(id)
    }, [id])

    const handleAdd = () => {
        history.push(`/length/add`)
    }

    const handleLengthColor = (id) => {
        deleteLength(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updateLength(id, { ...productLength, [key]: value })
    }

    const handleBack = () => {
        history.push(`/length`)
    }

    return (
        <Container>
            <Header>Product Length</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'length'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAdd}><Icon name="plus"></Icon> Add Lenght</Button>
                        <Button color='red' onClick={() => { handleLengthColor(productLength._id) }}> <Icon name="close"></Icon> Delete</Button>
                    </GridColumn>
                </GridRow>
            </Grid>
            <Divider></Divider>
            <Grid>
                <GridRow>
                    <GridColumn>
                        <Table>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        Length ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {productLength._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Length Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {productLength.lengthName}
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
    productLength: state.productLengths.productLength
})
const mapDispatchToProps = (dispatch) => ({
    deleteLength: (id) => dispatch({ type: DELETE_LENGTH, payload: id }),
    updateLength: (id, data) => dispatch({ type: UPDATE_LENGTH, payload: { id, data } }),
    getLenght: (id) => dispatch({ type: GET_LENGTH_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductLengthDetailsPage);