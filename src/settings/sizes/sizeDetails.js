import React, { useEffect } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_SIZE, UPDATE_SIZE } from "../../redux/actions";

const SizeDetails = ({ size, handleAddSize, deleteSize, updateSize }) => {

    useEffect(() => {
        handleAddSize(false)
    }, [])

    const handleDeleteSize = (id) => {
        deleteSize(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updateSize(id, { ...size, [key]: value })
    }



    return (
        <div >
            <Table>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>{size.size}</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"> <Button color='red' onClick={() => { handleDeleteSize(size._id) }}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Size ID
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
                        <Table.Cell>
                            <Icon name="edit" onClick={{}}></Icon>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Size Status
                        </Table.Cell>
                        <Table.Cell>
                            <Checkbox
                                toggle
                                checked={size.status}
                                label='is Active'
                                onChange={() => handleUpdateFunction(size._id, 'status', !size.status)}
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

            </Table>
        </div>
    )
}

SizeDetails.propTypes = {
    deleteSize: PropTypes.func.isRequired,
    updateSize: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    size: state.sizes.size
})
const mapDispatchToProps = (dispatch) => ({
    deleteSize: (id) => dispatch({ type: DELETE_SIZE, payload: id }),
    updateSize: (id, data) => dispatch({ type: UPDATE_SIZE, payload: { id, data } })
})

export default connect(mapStateToProps, mapDispatchToProps)(SizeDetails);