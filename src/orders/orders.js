import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Icon, Segment, Table, Button, TableCell, TableRow, Tab, TableBody } from "semantic-ui-react";
import DropdownSearchSelection from "../layout/Dropdown";
import DropdownExampleSearchQuery from "../layout/Dropdown-query";

import TableHeader from "../layout/TableHeader"
import { ADD_CUSTOMER, ADD_TRANSCATION, GET_CUSTOMER_DETAILS, GET_CUSTOMER_LIST, GET_OTHER_LIST, GET_PRODUCT_AVAILIBLITY, GET_PRODUCT_LIST, GET_SIZE_LIST, SEARCH_PRODUCT, UPDATE_TRANSCATION_STATUS } from "../redux/actions";


const Orders = ({ products, getProducts, searchProduct, searchList, getCustomers, customers, customer, getCustomer, addCustomer, sizes, getSizes, getProductAvailiblity, addTranscation,others,getOthers }) => {

    const [transcationData, setTranscation] = useState({})
    const [selectedProducts, setSelectedProducts] = useState({})
    const [productObjs, setProductsObj] = useState([])
    const [cart, setCart] = useState([])
    const [totalVal, setTotalVal] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [totalMrp, setTotalMrp] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const customerObj = _.map(customers, (data) => ({ key: data._id, value: `${data.mobile} - ${data.customerName}` }))
    const [steps, setSteps] = useState(1);
    const [orderRecords, setOrderRecords] = useState([])

    const [sizesArr, setSizeArr] = useState([])

    const handleCustomerChange = (name, id) => {
        getCustomer(id);
    }

    const handleAddCustomer = (mobile) => {
        addCustomer({ mobile: mobile })
    }


    useEffect(() => {
        let qty = 0;
        let mrp = 0;
        let price = 0;
        let value = 0;

        cart.map(x => {
            qty += x.productQty;
            mrp += x.productMrp;
            price += x.productPrice;
            value += x.productVal;
        })

        setTotalVal(value)
        setTotalQty(qty)
        setTotalPrice(price)
        setTotalMrp(mrp)

    }, [cart])


    useEffect(() => {
        const productObj = _.map(searchProduct, (data) => {
            let sizeIndex = sizes.findIndex(x => x._id == data.productSize);
            let sizeName = sizes[sizeIndex].sizeName;
            return { key: data._id, value: data._id, text: data.productCode + ' - ' + data.productName + '-' + sizeName }
        }

        );
        setProductsObj(productObj)
    }, [searchProduct, sizes])





    useEffect(() => {
        getSizes(1, 100, '')
        getProducts(1, 100, '')
        getCustomers(1, 100, '')
        getOthers(1,100,'')

    }, [])


    useEffect(() => {
        if (Object.keys(selectedProducts).length) {
            handleAddToCart()
        }
    }, [selectedProducts])


    const handleSelectedProduct = (value) => {
        // console.log(name,value)
        const data = products.filter(x => (x._id == value))
        setSelectedProducts(data[0])

        // setTimeout(handleAddToCart,1000)

    }



    const handleAddToCart = () => {

        const isExisting = cart.findIndex(x => x.productId === selectedProducts._id)
        if (isExisting >= 0) {
            let cartvalue = cart.map(x => {
                if (x.productId === selectedProducts._id) {
                    x.productQty = x.productQty + 1;
                    x.value = selectedProducts.productPrice * x.productQty;
                }
                return x
            });
            setCart(cartvalue)

        } else {
            let cartvalue = [...cart, {
                productId: selectedProducts._id,
                productName: selectedProducts.productName,
                productCode: selectedProducts.productCode,
                productMrp: selectedProducts.productMrp,
                productPrice: selectedProducts.productPrice,
                productQty: 1,
                productVal: selectedProducts.productPrice,
                productCode: selectedProducts.productCode,
                productBrand: selectedProducts.productBrand,
                productCategory: selectedProducts.productCategory,
                productColor: selectedProducts.productColor,
                productSize: selectedProducts.productSize,
                productType: selectedProducts.productType,
               

            }];
            setSelectedProducts({})
            setCart(cartvalue)
        }


    }


    const handleSearchChange = (searchQuery) => {
        debounceFn(searchQuery)

    }

    const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);

    function handleDebounceFn(searchQuery) {
        searchList(searchQuery)
        // setSearchText(searchQuery)
    }

    const handleDelete = (id) => {
        let cartvalue = cart.filter(x => x.productId !== id);
        setCart(cartvalue)
    }



    const handleAddMore = (id) => {
        let cartvalue = cart.map(x => {
            if (x.productId === id) {
                x.productQty = x.productQty + 1;
                x.productVal = x.productPrice * x.productQty;
            }
            return x
        });
        setCart(cartvalue)
    }

    const handleRemoveMore = (id) => {
        let cartvalue = cart.map(x => {
            if (x.productId === id) {
                x.productQty = x.productQty - 1;
                x.productVal = x.productPrice * x.productQty;
            }
            return x
        });
        setCart(cartvalue)
    }


    useEffect(() => {
        // alert(JSON.stringify(transcationData))
    }, [transcationData])


    const handleCartSteps = () => {
        let stepsvalue = steps;
        setSteps(stepsvalue + 1)

    }

    const handleCartBack = () => {
        let stepsvalue = steps;
        setSteps(stepsvalue - 1)
    }


    useEffect(() => {
        switch (steps) {

            case 1:
                setOrderRecords(['Product', 'Qty', 'Price', 'Total', 'Action']);
                break;

            case 2:
                const cartId = cart.map(x => x.productId)
                getProductAvailiblity(cartId.join(','))
                break;

            case 3:
                if (Object.keys(customer).length > 0) {
                    handleConfirmPurchse()
                } else {
                    alert('Please Select Customer')
                }

                break;
        }
    }, [steps])

    const handleConfirmPurchse = () => {
        // setNextToCart(!nextTocart)

        const store =  others.filter(x=> x.keyName === 'Store');
        const season =  others.filter(x=> x.keyName === 'season');

        
        // console.log()

        let fcustumer = {
            _id: customer._id,
            customerName: customer.customerName,
            mobile: customer.mobile
        }

        let transcation = {
            customer:fcustumer,
            products: cart,
            totalVal: totalVal,
            totalQty: totalQty,
            totalMrp: totalMrp,
            totalPrice: totalPrice,
            store: store[0]._id,
            season: season[0]._id
        }
        setTranscation(transcation)
        

    }

    useEffect(()=>{
        addTranscation(transcationData)
    },[transcationData])

    return (<div>
        <Segment>
            Orders
        </Segment>
        <Table celled>
            <Table.Body>
                {steps === 2 && (<Table.Row>
                    <Table.Cell>
                        Select a Customer
                    </Table.Cell>
                    <Table.Cell>
                        <DropdownSearchSelection placeholder={'customer'} ArrayofObj={customerObj} handleDropDownChanges={handleCustomerChange} dropdownName={'customer'} value={customer._id} allowAdditions={true} handleAdditionChanges={handleAddCustomer}></DropdownSearchSelection>
                    </Table.Cell>
                </Table.Row>)}

                {
                    ((steps == 2 && steps == 3) && Object.keys(customer).length > 0) && (
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Customer Name
                                    </TableCell>
                                    <TableCell>
                                        {customer.customerName}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        Customer Mobile
                                    </TableCell>
                                    <TableCell>
                                        {customer.mobile}
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>)
                }
                {steps === 1 && (<Table.Row>
                    <Table.Cell>
                        Select  Product
                    </Table.Cell>
                    <Table.Cell>
                        <DropdownExampleSearchQuery placeholder={'product'} ArrayofObj={productObjs} handleDropDownChanges={handleSelectedProduct} dropdownName={'product'} value={selectedProducts._id} handleSearchChange={handleSearchChange}></DropdownExampleSearchQuery>
                    </Table.Cell>

                </Table.Row>)}

                <Table.Row>


                    <Table.Cell textAlign="right">
                        {(steps > 1 && steps != 3) && <Button onClick={handleCartBack}> <Icon name="angle double left"></Icon> Back to cart</Button>}
                        {(steps == 1 && cart.length > 0) && <Button onClick={handleCartSteps}> Add a Customer  <Icon name="angle double right"></Icon></Button>}
                        {(steps == 2 && Object.keys(customer).length > 0) && <Button onClick={handleCartSteps}> Back to review <Icon name="angle double right"></Icon></Button>}
                        {((steps == 3) && cart.length) && <Button onClick={handleCartSteps}> Confirm</Button>}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>




        </Table>


        <Table celled>

            {cart.length > 0 && <TableHeader Headers={orderRecords}></TableHeader>}


            <Table.Body>
                {cart.map((x, i) => (<TableRow key={'cart-' + i + x.productId}>
                    <TableCell >{x.productName} -({x.productCode})</TableCell>
                    <TableCell >{x.productQty} x</TableCell>
                    <TableCell >{x.productPrice}</TableCell>
                    <TableCell>{x.productVal}</TableCell>
                    <TableCell>
                        {(steps < 3) && <Button color="green" onClick={() => handleAddMore(x.productId)}>+1 More</Button>}
                        {(steps < 3 && x.qty > 1) && <Button color="orange" onClick={() => handleRemoveMore(x.productId)}>-1 More</Button>}
                        {(steps < 3) && <Button color="red" onClick={() => handleDelete(x.productId)}>Delete</Button>}
                    </TableCell>
                </TableRow>))}

                {cart.length > 0 && (<TableRow>
                    <TableCell ></TableCell>
                    <TableCell>
                        Total Qty:  {totalQty}
                    </TableCell>
                    <TableCell>
                        Total Price : {totalPrice}
                    </TableCell>
                    <TableCell>
                        Total Value: {totalVal}
                    </TableCell>
                </TableRow>)}



            </Table.Body>
        </Table>
    </div>)
}

const mapStateToProps = (state) => ({
    products: state.products.products,
    searchProduct: state.products.searchProduct,
    customers: state.customers.customers,
    customer: state.customers.customer,
    sizes: state.sizes.sizes,
    productAvailability: state.products.productAvailability,
    others: state.others.others
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: ({ page, count, searchText }) => dispatch({ type: GET_PRODUCT_LIST, payload: { page, count, searchText } }),
    getSizes: ({ page, count, searchText }) => dispatch({ type: GET_SIZE_LIST, payload: { page, count, searchText } }),
    searchList: (searchText) => dispatch({ type: SEARCH_PRODUCT, payload: { searchText } }),
    getCustomers: ({ page, count, searchText }) => dispatch({ type: GET_CUSTOMER_LIST, payload: { page, count, searchText } }),
    getCustomer: (id) => dispatch({ type: GET_CUSTOMER_DETAILS, payload: { id } }),
    addCustomer: (data) => dispatch({ type: ADD_CUSTOMER, payload: data }),
    getProductAvailiblity: (id) => dispatch({ type: GET_PRODUCT_AVAILIBLITY, payload: { id } }),
    addTranscation: (data) => dispatch({ type: ADD_TRANSCATION, payload: data }),
    updateTranscationStatus: (id, status) => dispatch({ type: UPDATE_TRANSCATION_STATUS, payload: { id, data: { status } } }),
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } }),
   
})
export default connect(mapStateToProps, mapDispatchToProps)(Orders);