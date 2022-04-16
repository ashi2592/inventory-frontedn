
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Segment, Table, TableBody, TableCell, TableRow, Modal } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";

import PropTypes from 'prop-types';
import AddProduct from "./addProduct";
// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_CATEGORY_LIST, GET_PRODUCT_DETAILS, GET_PRODUCT_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import ProductBarcode from "./Product-barcode";
import { useHistory } from "react-router-dom";
import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SearchAndSelectBrand from "../../components/SearchAndSelectBrand";
import SearchAndSelectSupplier from "../../components/SearchAndSelectSupplier";
import SearchAndSelectSize from "../../components/SearchAndSelectSize";
import SearchAndSelectProductType from "../../components/SearchAndSelectProductType";
import SearchAndSelectColor from "../../components/SearchAndSelectColor";
import SearchAndSelectOthers from "../../components/SearchAndSelectOthers";


const Product = ({ getProducts, getProduct, products, product, pagination, error, }) => {

    const history = useHistory()
    const [createProduct, setCreateProduct] = useState(false)
    const [addProductButton, setAddProductButton] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openBarcodeModal, setOpenBarcodeModal] = useState(false);
    const [categoriesOptions, setCategoriesOptions] = useState([])
    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')
    const [searchInputs, setSearchInputs] = useState({ brand: '', category: '', size: '', type: '', color: '' })

    const handleAddProduct = function (value = true) {
        // setCreateProduct(value)
        // setAddProductButton(value)
        // setOpenAddModal(true)

        history.push(`/add-product`)
    }

    const handleViewProduct = (id) => {
        history.push(`/product/${id}`)

    }


    const handleBarcodeProduct = (id) => {
        getProduct(id)
        setOpenBarcodeModal(true)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getProducts(activePage, 10, searchText)

    }

    useEffect(() => {
        setOpenAddModal(false)
        getProducts(1, 10, searchText, searchInputs)
    }, [])

    useEffect(() => {
        setOpenAddModal(false)
    }, [error])

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



    const handleSearchDropDownChanges = (name, value) => {

        let newsearch = { ...searchInputs, [name]: value }
        setSearchInputs(newsearch)

    }

    useEffect(() => {
        getProducts(1, 10, searchText, searchInputs)
    }, [searchInputs])

    return (<div>


        <Segment >
            <Header>Product</Header>

            <Button active={true} onClick={handleAddProduct}><Icon name="plus"></Icon> Add product</Button>
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
                    <TableHeader Headers={['Name', 'Code', 'Category', 'Type ', 'Brand', 'Color', 'Size', 'Qty', 'Selling Price', , 'Action']}></TableHeader>
                    <Table.Header>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <SearchAndSelectCateory
                                    handleDropDownChanges={handleSearchDropDownChanges}
                                    placeholder={'Category'}
                                    dropdownName={'category'}
                                    value={searchInputs.category}
                                    clearable={true}

                                ></SearchAndSelectCateory>
                            </TableCell>
                            <TableCell>

                                <SearchAndSelectProductType
                                    handleDropDownChanges={handleSearchDropDownChanges}
                                    placeholder={'Search Type'}
                                    dropdownName={'type'}
                                    value={searchInputs.type}
                                    clearable={true}


                                ></SearchAndSelectProductType>

                            </TableCell>
                            <TableCell>
                                <SearchAndSelectBrand
                                    handleDropDownChanges={handleSearchDropDownChanges}
                                    placeholder={'Search Brand'}
                                    dropdownName={'brand'}
                                    value={searchInputs.brand}
                                    clearable={true}


                                ></SearchAndSelectBrand>
                            </TableCell>
                            <TableCell>
                            <SearchAndSelectColor
                                    handleDropDownChanges={handleSearchDropDownChanges}
                                    placeholder={'Search Color'}
                                    dropdownName={'color'}
                                    value={searchInputs.color}
                                    clearable={true}


                                ></SearchAndSelectColor>

                            </TableCell>
                            <TableCell>
                            <SearchAndSelectSize
                                    handleDropDownChanges={handleSearchDropDownChanges}
                                    placeholder={'Search Size'}
                                    dropdownName={'size'}
                                    value={searchInputs.size}
                                    clearable={true}


                                ></SearchAndSelectSize>

                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </Table.Header>

                    <TableBody>
                        {products.map(x => (<TableRow key={'product-' + x._id} error={x.productQty <= 0}>

                            <TableCell >{x.productName}</TableCell>
                            <TableCell >{x.productCode}</TableCell>
                            <TableCell >{x.productCategoryObj ? x.productCategoryObj.categoryName : ''} </TableCell>
                            <TableCell >{x.productTypeObj ? x.productTypeObj.typeName : ''} </TableCell>
                            <TableCell >{x.productBrandObj ? x.productBrandObj.brandName : ''} </TableCell>
                            <TableCell > {x.productColorObj ? x.productColorObj.colorName : ''}   </TableCell>
                            <TableCell > {x.productSizeObj ? x.productSizeObj.sizeName : ''}  </TableCell>
                            <TableCell >{x.productQty}</TableCell>
                            <TableCell >{x.productPrice}</TableCell>
                            <TableCell>
                                <Icon name="edit" onClick={() => { handleViewProduct(x._id) }}></Icon>
                                <Icon name="barcode" onClick={() => { handleBarcodeProduct(x._id) }}></Icon>

                            </TableCell></TableRow>))}
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
                    {createProduct ? 'Add Product' : 'View & Edit Product'}

                </Modal.Header>
                <Modal.Content image>

                    <AddProduct handleAddProduct={handleAddProduct}></AddProduct>
                </Modal.Content>

            </Modal>


            <Modal
                onClose={() => setOpenBarcodeModal(false)}
                onOpen={() => setOpenBarcodeModal(true)}
                open={openBarcodeModal}

            >
                <Modal.Header>
                    {product.productName}
                </Modal.Header>
                <Modal.Content>
                    <ProductBarcode isAutofocusEnable={true}></ProductBarcode>
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
    getProducts: (page, count, searchText, searchInputs) => dispatch({ type: GET_PRODUCT_LIST, payload: { page, count, searchText, searchInputs } }),
    getProduct: (id) => dispatch({ type: GET_PRODUCT_DETAILS, payload: { id } }),

})

export default connect(mapStateToProps, mapDispatchToProps)(Product);