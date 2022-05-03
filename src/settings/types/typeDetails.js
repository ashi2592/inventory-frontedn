import React, { useEffect } from "react";
import { Button, Checkbox, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";
import { DELETE_TYPE, GET_TYPE_DETAILS, UPDATE_TYPE } from "../../redux/actions";

const TypeDetailsPage = ({
    deletetype,
    updatetype,
    gettype,
    type

}) => {


    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        gettype(id)
    }, [id])

    const handleAdd = () => {
        history.push(`/types/add`)
    }

    const handleLengthColor = (id) => {
        deletetype(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updatetype(id, { ...type, [key]: value })
    }

    const handleBack = () => {
        history.push(`/types`)
    }

    return (
        <Container>
            <Header>Type  Data</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'types'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAdd}><Icon name="plus"></Icon> Add Type</Button>
                        <Button color='red' onClick={() => { handleLengthColor(type._id) }}> <Icon name="close"></Icon> Delete</Button>
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
                                        ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {type._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {type.typeName}
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
    type: state.types.type
})
const mapDispatchToProps = (dispatch) => ({
    deletetype: (id) => dispatch({ type: DELETE_TYPE, payload: id }),
    updatetype: (id, data) => dispatch({ type: UPDATE_TYPE, payload: { id, data } }),
    gettype: (id) => dispatch({ type: GET_TYPE_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(TypeDetailsPage);