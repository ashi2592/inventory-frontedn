import React, { useEffect } from "react";
import { Button, Checkbox, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_COLOR, GET_COLOR_DETAILS, UPDATE_COLOR } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";

const ColorDetails = ({ color, deleteColor, updateColor, getColor }) => {


    const { id } = useParams();
    const history = useHistory()

    

    useEffect(() => {
        getColor(id)
    }, [id])

    const handleDeleteColor = (id) => {
        deleteColor(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updateColor(id, { ...color, [key]: value })
    }

    const handleBack = ()=>{
        history.push(`/colors`)
    }
    const handleAddColor = () => {

        history.push('/colors/add')
    }

    return (
        <Container>
            <Header>Colors</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'color'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAddColor}><Icon name="plus"></Icon> Add color</Button>
                        <Button color='red' onClick={() => { handleDeleteColor(color._id) }}> <Icon name="close"></Icon> Delete color</Button>
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
                                    <Table.HeaderCell>{color.color}</Table.HeaderCell>
                                    {/* <Table.HeaderCell collapsing={3} textAlign="right"></Table.HeaderCell> */}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        Color ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {color._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Color Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {color.colorName}
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

ColorDetails.propTypes = {
    deleteColor: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    color: state.colors.color,
    error: state.colors.error,
    loading: state.colors.loading
})
const mapDispatchToProps = (dispatch) => ({
    deleteColor: (id) => dispatch({ type: DELETE_COLOR, payload: id }),
    updateColor: (id, data) => dispatch({ type: UPDATE_COLOR, payload: { id, data } }),
    getColor: (id) => dispatch({ type: GET_COLOR_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorDetails);