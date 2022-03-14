import React, { useEffect } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_COLOR,UPDATE_COLOR } from "../../redux/actions";

const ColorDetails = ({ color, handleAddColor, deleteColor,updateColor }) => {

    useEffect(() => {
        handleAddColor(false)
    },[])

      
    const handleDeleteColor = (id) =>{
        deleteColor(id)
    }

    const handleUpdateFunction = (id,key,value) =>{
        updateColor(id,{...color, [key]:value})
    }



    return (
        <div >
            <Table>
                <Table.Header>
                    <Table.Row>
                    
                          <Table.HeaderCell>{color.color}</Table.HeaderCell>
                         <Table.HeaderCell textAlign="right"> <Button color='red' onClick={()=>{ handleDeleteColor(color.id)}}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell> 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Color ID
                    </Table.Cell>
                    <Table.Cell>
                        {color.id}
                    </Table.Cell>
                   
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                    Color Name
                    </Table.Cell>
                    <Table.Cell>
                        {color.color}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                    Color Status
                    </Table.Cell>
                    <Table.Cell>
                    <Checkbox
                    toggle
                    checked={color.status}
                    label='is Active'
                    onChange={() => handleUpdateFunction(color.id, 'status',!color.status)}
                />
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
               
            </Table>
        </div>
    )
}

ColorDetails.propTypes ={
    deleteColor: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    color: state.colors.color
})
const mapDispatchToProps = (dispatch) => ({
    deleteColor: (id) => dispatch({type: DELETE_COLOR, payload: id}),
    updateColor: (id,data) => dispatch({type: UPDATE_COLOR,payload:{id,data}})
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorDetails);