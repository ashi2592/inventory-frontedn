import React, { useEffect } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_SUPPLIER, UPDATE_SUPPLIER } from "../../redux/actions";

const TranscationDetails = ({ supplier, handleAddSupplier, deleteSupplier,updateSupplier }) => {

    useEffect(() => {
        handleAddSupplier(false)
    },[])

      
    const handleDeleteSupplier = (id) =>{
        deleteSupplier(id)
    }

    const handleUpdateFunction = (id,key,value) =>{
        updateSupplier(id,{...supplier, [key]:value})
    }



    return (
        <div >
            <Table>
                <Table.Header>
                    <Table.Row>
                    
                          <Table.HeaderCell>{supplier.supplierName}</Table.HeaderCell>
                         <Table.HeaderCell textAlign="right"> <Button color='red' onClick={()=>{ handleDeleteSupplier(supplier._id)}}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell> 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Supplier ID
                    </Table.Cell>
                    <Table.Cell>
                        {supplier._id}
                    </Table.Cell>
                   
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                    Supplier Name
                    </Table.Cell>
                    <Table.Cell>
                        {supplier.supplierName}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                    Supplier Contact
                    </Table.Cell>
                    <Table.Cell>
                        {supplier.contact}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                    Supplier location
                    </Table.Cell>
                    <Table.Cell>
                        {supplier.location}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                    Supplier address
                    </Table.Cell>
                    <Table.Cell>
                        {supplier.address}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                    Supplier Status
                    </Table.Cell>
                    <Table.Cell>
                    <Checkbox
                    toggle
                    checked={supplier.status}
                    label='is Active'
                    onChange={() => handleUpdateFunction(supplier._id, 'status',!supplier.status)}
                />
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
               
            </Table>
        </div>
    )
}

TranscationDetails.propTypes ={
    deleteSupplier: PropTypes.func.isRequired,
    updateSupplier: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    supplier: state.suppliers.supplier
})
const mapDispatchToProps = (dispatch) => ({
    deleteSupplier: (id) => dispatch({type: DELETE_SUPPLIER, payload: id}),
    updateSupplier: (id,data) => dispatch({type: UPDATE_SUPPLIER,payload:{id,data}})
})

export default connect(mapStateToProps, mapDispatchToProps)(TranscationDetails);