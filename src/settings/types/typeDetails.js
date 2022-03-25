import React, { useEffect } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_TYPE,UPDATE_TYPE } from "../../redux/actions";

const TypeDetails = ({ type, handleAddType, deleteType,updateType }) => {

    useEffect(() => {
        handleAddType(false)
    },[])

      
    const handleDeleteType = (id) =>{
        deleteType(id)
    }

    const handleUpdateFunction = (id,key,value) =>{
        updateType(id,{...type, [key]:value})
    }



    return (
        <div >
            <Table>
                <Table.Header>
                    <Table.Row>
                    
                          <Table.HeaderCell>{type.type}</Table.HeaderCell>
                         <Table.HeaderCell textAlign="right"> <Button color='red' onClick={()=>{ handleDeleteType(type._id)}}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell> 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        type ID
                    </Table.Cell>
                    <Table.Cell>
                        {type._id}
                    </Table.Cell>
                   
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        type Name
                    </Table.Cell>
                    <Table.Cell>
                        {type.typeName}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        type Status
                    </Table.Cell>
                    <Table.Cell>
                    <Checkbox
                    toggle
                    checked={type.status}
                    label='is Active'
                    onChange={() => handleUpdateFunction(type._id, 'status',!type.status)}
                />
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
               
            </Table>
        </div>
    )
}

TypeDetails.propTypes ={
    deleteType: PropTypes.func.isRequired,
    updateType: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    type: state.types.type
})
const mapDispatchToProps = (dispatch) => ({
    deleteType: (id) => dispatch({type: DELETE_TYPE, payload: id}),
    updateType: (id,data) => dispatch({type: UPDATE_TYPE,payload:{id,data}})
})

export default connect(mapStateToProps, mapDispatchToProps)(TypeDetails);