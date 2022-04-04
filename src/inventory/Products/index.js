
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Segment, Table, TableBody, TableCell, TableRow, Modal } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";

import PropTypes from 'prop-types';
import AddProduct from "./addProduct";
import ProductDetails from "./ProductDetails";
// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_PRODUCT_DETAILS, GET_PRODUCT_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";


const Product = ({ getProducts, getProduct, products, product, pagination, error }) => {

    const [createProduct, setCreateProduct] = useState(false)
    const [addProductButton, setAddProductButton] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddProduct = function (value = true) {
        setCreateProduct(value)
        setAddProductButton(value)
        setOpenAddModal(true)
    }



    const handleViewProduct = (id) => {
        setCreateProduct(false)
        setAddProductButton(false)
        getProduct(id)
        setOpenAddModal(true)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getProducts(activePage, 10, searchText)

    }

    useEffect(() => {
        setOpenAddModal(false)
        getProducts(1, 10, searchText)

    }, [])

    useEffect(()=>{
        setOpenAddModal(false)
    },[error])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [products, pagination])

    useEffect(() => {
        getProducts(1, 10, searchText)
    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {
        setSearchText('')
        handleViewProduct(id)
    }

    return (<div>
        <Header>product</Header>

        <Segment textAlign="right">
            <Button active={addProductButton} onClick={handleAddProduct}><Icon name="plus"></Icon> Add product</Button>
        </Segment>

        <Grid >
            <Grid.Column>

                <Input onChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                })} icon="search" value={searchText}></Input>


                <p >
                    {searchText && `Search Results of  ${searchText}`}
                </p>
                <Table celled>
                    <TableHeader Headers={['Name', 'Code','Category', 'Type ','Brand','Color','Size', 'Qty','Selling Price', , 'Action']}></TableHeader>


                    <TableBody>
                        {products.map(x => (<TableRow  key={'product-' + x._id} error={x.productQty <= 0}>
                            {/* <TableCell >{x._id}</TableCell> */}
                            <TableCell >{x.productName}</TableCell>
                            <TableCell >{x.productCode}</TableCell>
                            <TableCell >{x.productCategoryObj?x.productCategoryObj.categoryName:''} </TableCell>
                            <TableCell >{x.productTypeObj?x.productTypeObj.typeName:''} </TableCell>
                            <TableCell >{x.productBrandObj?x.productBrandObj.brandName:''} </TableCell>
                           <TableCell > {x.productColorObj?x.productColorObj.colorName:''}   </TableCell>
                            <TableCell > {x.productSizeObj?x.productSizeObj.sizeName:''}  </TableCell>
                            <TableCell >{x.productQty}</TableCell>
                            <TableCell >{x.productPrice}</TableCell>
                           <TableCell><Icon name="edit" onClick={() => { handleViewProduct(x._id) }}></Icon></TableCell></TableRow>))}
                    </TableBody>

                </Table>
                <PaginationCompact
                    activePage={activePage}
                    totalPages={totalPages}
                    ellipsisItem={ellipsisItem}
                    handlePaginationChange={handlePaginationChange}
                ></PaginationCompact>
            </Grid.Column>


            <Modal
                onClose={() => setOpenAddModal(false)}
                onOpen={() => setOpenAddModal(true)}
                open={openAddModal}

            >
                  <Modal.Header>
                       {createProduct ? 'Add Product': 'View & Edit Product'}
                  
                  </Modal.Header>
                <Modal.Content image>
                  
                    {createProduct ? <AddProduct handleAddProduct={handleAddProduct}></AddProduct> : Object.values(product).length ? <ProductDetails handleAddProduct={handleAddProduct} setOpenAddModal={setOpenAddModal}></ProductDetails> : <div></div>}
                </Modal.Content>

            </Modal>



        </Grid>

    </div>)

}

Product.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array,
    product: PropTypes.object,
    getProducts: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    products: state.products.products,
    product: state.products.product,
    pagination: state.products.pagination,
    error: state.products.error
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: (page, count, searchText) => dispatch({ type: GET_PRODUCT_LIST, payload: { page, count, searchText } }),
    getProduct: (id) => dispatch({ type: GET_PRODUCT_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);