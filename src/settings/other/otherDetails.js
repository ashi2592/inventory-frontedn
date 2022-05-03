import React, { useEffect } from "react";
import { Button, Checkbox, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";
import { DELETE_OTHER, GET_OTHER_DETAILS, UPDATE_OTHER } from "../../redux/actions";

const OtherDetailsPage = ({ 
    deleteOther,
updateOther,
getOther,
other

 }) => {


    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        getOther(id)
     }, [id])

    const handleAdd = ()=>{
        history.push(`/others/add`)
    }

    const handleLengthColor = (id) => {
        deleteOther(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updateOther(id, { ...other, [key]: value })
    }

    const handleBack = ()=>{
        history.push(`/others`)
    }


    return (
        <Container>
            <Header>Other Static Data</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'others'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                    <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAdd}><Icon name="plus"></Icon> Add Other</Button>
                        <Button color='red' onClick={() => { handleLengthColor(other._id) }}> <Icon name="close"></Icon> Delete</Button>
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
                                        Other ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {other._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                    Other key
                                    </Table.Cell>
                                    <Table.Cell>
                                        {other.keyName}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                    Other Value
                                    </Table.Cell>
                                    <Table.Cell>
                                        {other.value}
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
    other: state.others.other
})
const mapDispatchToProps = (dispatch) => ({
    deleteOther: (id) => dispatch({ type: DELETE_OTHER, payload: id }),
    updateOther: (id, data) => dispatch({ type: UPDATE_OTHER, payload: { id, data } }),
    getOther: (id) => dispatch({ type: GET_OTHER_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherDetailsPage);