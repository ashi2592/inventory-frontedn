import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Container, Header, Icon, Input, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { ADD_BARCODE, DELETE_BARCODE, GET_BARCODE_LIST, GET_PRODUCT_DETAILS, UPDATE_PRODUCT } from "../../redux/actions";
import _ from "lodash";
import TableHeader from "../../layout/TableHeader";

const ProdutBarcodes = ({ product, error, addBarcode, deleteBarcode, isAutofocusEnable }) => {

    const [barcode, setBarcode] = useState('');
    const [updatedBarcode, setUpdatedBrcode] = useState('')
    const [barcodes, setBarcodes] = useState([])


    const debounceFn = useCallback(_.debounce(handleDebounceFn, 2000), []);

    const handleUpdateFunction = (e, { value }) => {
        e.preventDefault()
        setBarcode(value);
    }
    useEffect(() => {
        debounceFn(barcode);
    }, [barcode])

    function handleDebounceFn(value) {
        if (value) {
            setUpdatedBrcode(value)
        }
    }

    useEffect(() => {
        if (updatedBarcode) {
            addBarcode({
                productId: product._id,
                barcode: updatedBarcode
            })

            setTimeout(() => {
                setUpdatedBrcode('');
                setBarcode('')
            }, 300)
        }
    }, [updatedBarcode])

    const handleDeletebarcode = (barcode) => {
        deleteBarcode(barcode)
    }


    useEffect(() => {
        setBarcodes(product.barcodes)
    }, [product])

    const handleSearchbarcode = () => {

    }


    return (
        <Container>
            <Header>Barcodes</Header>
            <Input
                                autoFocus={isAutofocusEnable}
                                placeholder='Enter Barcode'
                                name={'barcode'}
                                value={barcode}
                                onChange={handleUpdateFunction}
                            />
            <Table>

            {(barcodes || []).length > 0 && (<Table.Body>

                    <Table.Row>
                        <Table.Cell>
                            <Input

                                placeholder='Search barcode'
                                name={'barcode'}

                                onChange={handleSearchbarcode}
                            />
                        </Table.Cell>

                    </Table.Row>


                   <TableRow>
                        <Table celled>
                            <TableHeader Headers={['Codes', 'Action']}></TableHeader>
                            <TableBody>
                                {(barcodes || []).map(x => (<TableRow key={x.barcode}><TableCell>{x.barcode} </TableCell><TableCell ><Icon name="delete" onClick={() => { handleDeletebarcode(x._id) }}></Icon></TableCell></TableRow>))}
                            </TableBody>
                        </Table>

                    </TableRow>

                </Table.Body>)}
                {(barcodes || []).length  == 0 && 'No Barcode Availiable'}

            </Table>
        </Container>
    )
}

ProdutBarcodes.propTypes = {
    updateProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    error: state.products.error
})
const mapDispatchToProps = (dispatch) => ({
    updateProduct: (id, data) => dispatch({ type: UPDATE_PRODUCT, payload: { id, data } }),
    getBarcodes: (page, count, searchText) => dispatch({ type: GET_BARCODE_LIST, payload: { page, count, searchText } }),
    addBarcode: (data) => dispatch({ type: ADD_BARCODE, payload: data }),
    getProduct: (id) => dispatch({ type: GET_PRODUCT_DETAILS, payload: { id } }),
    deleteBarcode: (barcode) => dispatch({ type: DELETE_BARCODE, payload: barcode })
})

export default connect(mapStateToProps, mapDispatchToProps)(ProdutBarcodes);