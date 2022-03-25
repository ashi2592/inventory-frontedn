import React, { useEffect } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_OTHER,UPDATE_OTHER } from "../../redux/actions";

const OtherDetails = ({ other, handleAddOther, deleteOther,updateother }) => {

    useEffect(() => {
        handleAddOther(false)
    },[])

      
    const handleDeleteOther = (id) =>{
        deleteOther(id)
    }

    const handleUpdateFunction = (id,key,value) =>{
        updateother(id,{...other, [key]:value})
    }



    return (
        <div >
            <Table>
                <Table.Header>
                    <Table.Row>
                    
                          <Table.HeaderCell>{other.keyName}</Table.HeaderCell>
                         <Table.HeaderCell textAlign="right"> <Button other='red' onClick={()=>{ handleDeleteOther(other._id)}}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell> 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        ID
                    </Table.Cell>
                    <Table.Cell>
                        {other._id}
                    </Table.Cell>
                   
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                   Key Name
                    </Table.Cell>
                    <Table.Cell>
                        {other.keyName}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell>
                    Value
                    </Table.Cell>
                    <Table.Cell>
                        {other.value}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                     Status
                    </Table.Cell>
                    <Table.Cell>
                    <Checkbox
                    toggle
                    checked={other.status}
                    label='is Active'
                    onChange={() => handleUpdateFunction(other._id, 'status',!other.status)}
                />
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
               
            </Table>
        </div>
    )
}

OtherDetails.propTypes ={
    deleteOther: PropTypes.func.isRequired,
    updateOther: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    other: state.others.other
})
const mapDispatchToProps = (dispatch) => ({
    deleteOther: (id) => dispatch({type: DELETE_OTHER, payload: id}),
    updateOther: (id,data) => dispatch({type: UPDATE_OTHER,payload:{id,data}})
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherDetails);