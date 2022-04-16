import React, { useEffect } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_BRAND,UPDATE_BRAND } from "../../redux/actions";

const BrandDetails = ({ brand, handleAddBrand, deleteBrand,updateBrand }) => {

    useEffect(() => {
        handleAddBrand(false)
    },[])

      
    const handleDeleteBrand = (id) =>{
        deleteBrand(id)
    }

    const handleUpdateFunction = (id,key,value) =>{
        updateBrand(id,{...brand, [key]:value})
    }



    return (
        <div >
            <Table>
                <Table.Header>
                    <Table.Row>
                    
                          <Table.HeaderCell>{brand.brandName}</Table.HeaderCell>
                         <Table.HeaderCell textAlign="right"> <Button color='red' onClick={()=>{ handleDeleteBrand(brand._id)}}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell> 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        brand ID
                    </Table.Cell>
                    <Table.Cell>
                        {brand._id}
                    </Table.Cell>
                   
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        brand Name
                    </Table.Cell>
                    <Table.Cell>
                        {brand.brandName}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        brand Status
                    </Table.Cell>
                    <Table.Cell>
                    <Checkbox
                    toggle
                    checked={brand.status}
                    label='is Active'
                    onChange={() => handleUpdateFunction(brand._id, 'status',!brand.status)}
                />
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
               
            </Table>
        </div>
    )
}

BrandDetails.propTypes ={
    deleteBrand: PropTypes.func.isRequired,
    updateBrand: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    brand: state.brands.brand
})
const mapDispatchToProps = (dispatch) => ({
    deleteBrand: (id) => dispatch({type: DELETE_BRAND, payload: id}),
    updateBrand: (id,data) => dispatch({type: UPDATE_BRAND,payload:{id,data}})
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetails);