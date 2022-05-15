import React, { useEffect } from "react";
import { Button,  Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";
import { DELETE_PATTERN, GET_PATTERN_DETAILS, UPDATE_PATTERN } from "../../redux/actions";

const PatternDetailsPage = ({
    deletepattern,
    updatepattern,
    getpattern,
    pattern

}) => {


    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        getpattern(id)
    }, [id])

    const handleAdd = () => {
        history.push(`/pattern/add`)
    }

    const handleBack = () => {
        history.push(`/pattern`)
    }

    const handleLengthColor = (id) => {
        deletepattern(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updatepattern(id, { ...pattern, [key]: value })
    }
    return (
        <Container>
            <Header>Pattern</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'pattern'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAdd}><Icon name="plus"></Icon> Add Pattern</Button>
                        <Button color='red' onClick={() => { handleLengthColor(pattern._id) }}> <Icon name="close"></Icon> Delete</Button>
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
                                        Pattern ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {pattern._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                    Pattern Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {pattern.sizeName}
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
    pattern: state.patterns.pattern
})
const mapDispatchToProps = (dispatch) => ({
    deletepattern: (id) => dispatch({ type: DELETE_PATTERN, payload: id }),
    updatepattern: (id, data) => dispatch({ type: UPDATE_PATTERN, payload: { id, data } }),
    getpattern: (id) => dispatch({ type: GET_PATTERN_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PatternDetailsPage);