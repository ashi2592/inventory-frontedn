import React, { useEffect } from "react";
import { Button, Checkbox, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";
import { DELETE_SIZE, GET_SIZE_DETAILS, UPDATE_SIZE } from "../../redux/actions";

const SizeDetailsPage = ({ 
    deletesize,
updatesize,
getsize,
size

 }) => {


    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        getsize(id)
     }, [id])

    const handleAdd = ()=>{
        history.push(`/sizes/add`)
    }

    const handleBack = ()=>{
        history.push(`/sizes`)
    }

    const handleLengthColor = (id) => {
        deletesize(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updatesize(id, { ...size, [key]: value })
    }



    return (
        <Container>
            <Header>size Static Data</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'sizes'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                    <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAdd}><Icon name="plus"></Icon> Add size</Button>
                        <Button color='red' onClick={() => { handleLengthColor(size._id) }}> <Icon name="close"></Icon> Delete</Button>
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
                                        size ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {size._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                     Size Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {size.sizeName}
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
    size: state.sizes.size
})
const mapDispatchToProps = (dispatch) => ({
    deletesize: (id) => dispatch({ type: DELETE_SIZE, payload: id }),
    updatesize: (id, data) => dispatch({ type: UPDATE_SIZE, payload: { id, data } }),
    getsize: (id) => dispatch({ type: GET_SIZE_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SizeDetailsPage);