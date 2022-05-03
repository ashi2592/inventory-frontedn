import _, { uniqueId } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon, Table, Button, TableCell, TableRow, Input, Container, Header, Grid, GridRow, GridColumn } from "semantic-ui-react";
import DropdownSearchSelection from "../layout/Dropdown";
import TableHeader from "../layout/TableHeader"
import { ADD_CUSTOMER, ADD_TRANSCATION, BARCODE_PRODUCT, GET_CUSTOMER_DETAILS, GET_CUSTOMER_LIST, GET_OTHER_LIST, GET_PRODUCT_AVAILIBLITY, GET_PRODUCT_LIST, GET_SIZE_LIST, SEARCH_PRODUCT, UPDATE_TRANSCATION_STATUS } from "../redux/actions";
import OrderCustomerCard from "../components/customer-card";
import { getProductName } from "../constant/global";


const Orders = ({ getCustomers, customers, customer, getCustomer, addCustomer,
    getProductAvailiblity, addTranscation, others, getOthers, barcodeProduct, barcodeData, updateTranscationStatus, transcation,
    isMobile }) => {
    const linkTarget = {
        pathname: `/order?state=${uniqueId()}`,
        key: uniqueId(), // we could use Math.random, but that's not guaranteed unique.
        state: {
            applied: true
        }
    };

    // const params = useParams()

    useEffect(() => {
        console.log("is mobile", isMobile)
    }, [isMobile])

    const history = useHistory()
    const [transcationData, setTranscation] = useState({})
    const [cart, setCart] = useState([])
    const [totalQty, setTotalQty] = useState(0);
    const [totalMrp, setTotalMrp] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const customerObj = _.map(customers, (data) => ({ key: data._id, value: `${data.mobile} - ${data.customerName}` }))
    const [steps, setSteps] = useState(1);
    const [orderRecords, setOrderRecords] = useState([])
    const [barcode, setBarcode] = useState('');
    const [scanedbarcode, setScanBarcodd] = useState('');
    const [discount, SetDiscount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState({})
    const [totalVal, setTotalVal] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [creditAmount, setCreditAmount] = useState(0);
    const [returnAmount, setReturnAmount] = useState(0);
    const [isCreditAvailable, setCreditAvailable] = useState(true);


    const handleCustomerChange = (name, id) => {
        getCustomer(id);
    }

    const handleAddCustomer = (mobile) => {
        addCustomer({ mobile: mobile })
    }


    /**
     * Barcode Scanner
     */
    const barcodeDebounce = useCallback(_.debounce(handleDebounBarcodeceFn, 1000), []);

    const handleBarcodeChnages = (e, { value }) => {
        setBarcode(value);
    }

    useEffect(() => {
        barcodeDebounce(barcode);
    }, [barcode])


    function handleDebounBarcodeceFn(value) {
        if (value) {
            setScanBarcodd(value)
        }
    }


    useEffect(() => {
        if (scanedbarcode) {
            barcodeProduct({ barcode: scanedbarcode });

        }
    }, [scanedbarcode])


    useEffect(() => {
        if (Object.keys(barcodeData).length) {
            setSelectedProducts(barcodeData)
        }

    }, [barcodeData])


    useEffect(() => {
        console.log(isMobile)
    }, [isMobile])




    useEffect(() => {
        getCustomers(1, 1000, '')
        getOthers(1, 100, '')
    }, [])


    useEffect(() => {
        if (Object.keys(selectedProducts).length) {
            handleAddToCart(scanedbarcode)
            setTimeout(() => {
                setBarcode('');
                setScanBarcodd('')
            }, [300])

        }
    }, [selectedProducts])


    const handleAddToCart = (scanedbarcode) => {

        const isExisting = cart.findIndex(x => x.productId === selectedProducts._id)
        if (isExisting >= 0) {
            let cartvalue = cart.map(x => {
                if (x.productId === selectedProducts._id) {
                    x.productQty = x.productQty + 1;
                    x.productPrice = selectedProducts.productPrice * x.productQty;
                    x.codes = x.codes + ',' + scanedbarcode;

                }
                return x
            });
            setCart(cartvalue)

        } else {
            let cartvalue = [...cart, {
                productId: selectedProducts._id,
                productName: getProductName(selectedProducts),
                productCode: selectedProducts.productCode,
                productMrp: selectedProducts.productMrp,
                productPrice: selectedProducts.productPrice,
                productQty: 1,
                productCode: selectedProducts.productCode,
                productBrand: selectedProducts.productBrand,
                productCategory: selectedProducts.productCategory,
                productColor: selectedProducts.productColor,
                productSize: selectedProducts.productSize,
                productType: selectedProducts.productType,
                productPurchasePrice: selectedProducts.productPurchasePrice,
                productVal: 0,
                codes: scanedbarcode,

            }];
            setSelectedProducts({})
            setCart(cartvalue)
        }


    }



    /**
     * 
     * barcode enf
     */


    useEffect(() => {
        let qty = 0;
        let mrp = 0;
        let price = 0;
        let purchase = 0

        cart.map(x => {
            qty += x.productQty;
            mrp += x.productMrp;
            price += x.productPrice;
            purchase += x.productPurchasePrice;
        })
        setTotalQty(qty)
        setTotalPrice(price)
        setTotalMrp(mrp)
        setTotalVal(price)
        setTotalPurchase(purchase)
        // console.log(cart)

    }, [cart])




    const handleDelete = (id) => {
        let cartvalue = cart.filter(x => x.productId !== id);
        setCart(cartvalue)
    }



    // const handleAddMore = (id) => {
    //     let cartvalue = cart.map(x => {
    //         if (x.productId === id) {
    //             x.productQty = x.productQty + 1;
    //             x.productPrice = x.productPrice * x.productQty;
    //         }
    //         return x
    //     });
    //     setCart(cartvalue)
    // }

    // const handleRemoveMore = (id) => {
    //     let cartvalue = cart.map(x => {
    //         if (x.productId === id) {
    //             x.productQty = x.productQty - 1;
    //             x.productPrice = x.productPrice * x.productQty;
    //         }
    //         return x
    //     });
    //     setCart(cartvalue)
    // }



    const handleDiscount = (value, totalPrice) => {
        SetDiscount(value)
        parseInt(totalPrice) - parseInt(value)
        if (!isNaN(parseInt(value))) {
            setTotalVal(parseInt(totalPrice) - parseInt(value))
        } else {
            setTotalVal(parseInt(totalPrice))
        }
    }

    const handleAmountPaid = (value, totalVal) => {
        setPaidAmount(value)
        // parseInt(totalVal) - parseInt(value)
        if (!isNaN(parseInt(value))) {

            let balanceAmount = parseInt(totalVal) - parseInt(value)
            if (balanceAmount > 0) {
                setCreditAmount(balanceAmount)
            } else {
                setCreditAmount(0)
                setReturnAmount(Math.abs(balanceAmount))
            }

        } else {
            setReturnAmount(0)
            setCreditAmount(0)
        }
    }







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
                setOrderRecords(['Product', 'Qty', 'MRP', 'Price', 'Action']);
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
            case 4:

                updateTranscationStatus(transcation._id, true,paidAmount,returnAmount,creditAmount)

                setTimeout(() => {

                    history.push(`/order/print/${transcation._id}`);
                    // navigate("../success", { replace: true });
                }, 1000)
                break;
        }
    }, [steps])




    const handleConfirmPurchse = () => {
        // setNextToCart(!nextTocart)
        const store = others.filter(x => x.keyName === 'store');
        const season = others.filter(x => x.keyName === 'season');


        // console.log()

        let fcustumer = {
            _id: customer._id,
            customerName: customer.customerName,
            mobile: customer.mobile
        }

        let transcation = {
            customer: fcustumer,
            products: cart,
            totalQty: totalQty,
            totalMrp: totalMrp,
            totalPrice: totalPrice,
            totalProfit: (totalVal - totalPurchase),
            store: store[0]._id,
            season: season[0]._id,
            totalVal: totalVal,
            discount: discount,
            orderId: 'O' + _.uniqueId() + _.uniqueId(),
            paidAmount,
            creditAmount,
            returnAmount

        }

        setTranscation(transcation)


    }


    useEffect(() => {
        if (Object.keys(transcationData).length) {
            addTranscation(transcationData)
        }
    }, [transcationData])

    const handleAddOrder = (id) => {
        history.push(`/order/`)
    }

    
    return (
        <Container fluid>
            <Header>Orders</Header>
            {/* <Button color="green" onClick={() => handleAddOrder()} > <Icon name="plus"></Icon> Add New Order</Button> */}
                     
            <Grid celled>
                <GridRow>
                    <GridColumn width={4} mobile={6}>
                        {steps === 1 && "  Select  Product"}
                        {steps === 2 && "Select a Customer"}</GridColumn>
                    <GridColumn width={8} mobile={12}>
                        {steps === 2 && (<DropdownSearchSelection placeholder={'customer'} ArrayofObj={customerObj} handleDropDownChanges={handleCustomerChange} dropdownName={'customer'} value={customer._id} allowAdditions={true} handleAdditionChanges={handleAddCustomer}></DropdownSearchSelection>)}

                        {steps === 1 && (
                            <Input

                                autoFocus="autoFocus"
                                placeholder='Search barcode'
                                name={'barcode'}
                                onChange={handleBarcodeChnages}
                                value={barcode}

                            />
                        )}
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn width={4} mobile={9}>
                        {((steps === 2 || steps === 3) && Object.keys(customer).length > 0) && (<OrderCustomerCard customer={customer}></OrderCustomerCard>)}
                    </GridColumn>
                    <GridColumn width={8} mobile={8}>
                        {(steps > 1 && steps != 3) && <Button onClick={handleCartBack} color="orange"> <Icon name="angle double left"></Icon> Back to cart</Button>}
                        {(steps === 1 && cart.length > 0) && <Button onClick={handleCartSteps} color="blue"> Add a Customer  <Icon name="angle double right"></Icon></Button>}
                        {(steps === 2 && Object.keys(customer).length > 0) && <Button onClick={handleCartSteps} color="green"> Next to review <Icon name="angle double right"></Icon></Button>}
                        {((steps === 3) && cart.length) && (
                            <Button onClick={handleCartSteps} color="green"> Confirm</Button>)}

                        {/* {(steps == 4) && (<Link to={linkTarget} > Continue to New Order </Link>)} */}

                    </GridColumn>
                </GridRow>
            </Grid>

            <Table >

                {cart.length > 0 && <TableHeader Headers={orderRecords}></TableHeader>}


                <Table.Body>
                    {cart.map((x, i) => (<TableRow key={'cart-' + i + x.productId}>
                        <TableCell >{x.productName} -({x.productCode})-{x.productPurchasePrice}</TableCell>
                        <TableCell >{x.productQty} x</TableCell>
                        <TableCell >{x.productMrp}</TableCell>
                        <TableCell>{x.productPrice}</TableCell>
                        <TableCell>
                            {(steps < 3) && <Button color="red" onClick={() => handleDelete(x.productId)}>Delete</Button>}
                        </TableCell>
                    </TableRow>))}

                    {cart.length > 0 && (<TableRow>
                        <TableCell></TableCell>
                        <TableCell collapsig={2}>
                            Total Qty:  {totalQty}
                        </TableCell>
                        <TableCell>
                            Total MRP : {totalMrp}
                        </TableCell>
                        <TableCell>
                            Total Price: {totalPrice}
                        </TableCell>
                    </TableRow>)}
                    {/* && steps == 3 */}
                    {(cart.length > 0 && steps >= 2) && (<TableRow>
                        <TableCell ></TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>
                        </TableCell>

                        <TableCell>
                            Discount
                        </TableCell>
                        <TableCell>
                            {steps === 2 && (<Input
                                value={discount}
                                placeholder='Discount'
                                name={'Discount'}
                                onChange={(e, { value }) => { handleDiscount(value, totalPrice) }}

                            />)}

                            {steps > 2 && (discount ? discount : 0)}
                        </TableCell>
                    </TableRow>)}

                    {(cart.length > 0) && (<TableRow>
                        <TableCell ></TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>

                        <TableCell>
                            Final Amount
                        </TableCell>
                        <TableCell>
                            {totalVal}
                        </TableCell>
                    </TableRow>)}

                    {(isCreditAvailable && steps === 3) && (
                        (<TableRow>
                            <TableCell ></TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                            </TableCell>

                            <TableCell>
                                Paid Amount
                            </TableCell>
                            <TableCell>
                                {steps === 3 && (<Input
                                    value={paidAmount}
                                    placeholder='Paid Amount'
                                    name={'paidAmount'}
                                    onChange={(e, { value }) => { handleAmountPaid(value, totalVal) }}

                                />)}

                                {/* {paidAmount?paidAmount:0} */}
                            </TableCell>
                        </TableRow>)
                    )}

                    {(isCreditAvailable && steps === 3) && (
                        (<TableRow warning={true}>
                            <TableCell ></TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                            </TableCell>

                            <TableCell >
                                Credit Amount
                            </TableCell>
                            <TableCell>

                                {creditAmount ? creditAmount : 0}
                            </TableCell>
                        </TableRow>)
                    )}

                    {(isCreditAvailable && steps === 3) && (
                        (<TableRow>
                            <TableCell ></TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                            </TableCell>

                            <TableCell>
                                Return Amount
                            </TableCell>
                            <TableCell>

                                {returnAmount ? returnAmount : 0}
                            </TableCell>
                        </TableRow>)
                    )}


                </Table.Body>
            </Table>



        </Container>


    )
}

const mapStateToProps = (state) => ({
    products: state.products.products,
    searchProduct: state.products.searchProduct,
    customers: state.customers.customers,
    customer: state.customers.customer,
    sizes: state.sizes.sizes,
    productAvailability: state.products.productAvailability,
    others: state.others.others,
    barcodeData: state.products.barcodeData,
    transcations: state.transcation.transcations,
    transcation: state.transcation.transcation
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: ({ page, count, searchText }) => dispatch({ type: GET_PRODUCT_LIST, payload: { page, count, searchText } }),
    barcodeProduct: ({ barcode }) => dispatch({ type: BARCODE_PRODUCT, payload: { barcode } }),
    getSizes: ({ page, count, searchText }) => dispatch({ type: GET_SIZE_LIST, payload: { page, count, searchText } }),
    searchList: (searchText) => dispatch({ type: SEARCH_PRODUCT, payload: { searchText } }),
    getCustomers: ({ page, count, searchText }) => dispatch({ type: GET_CUSTOMER_LIST, payload: { page, count, searchText } }),
    getCustomer: (id) => dispatch({ type: GET_CUSTOMER_DETAILS, payload: { id } }),
    addCustomer: (data) => dispatch({ type: ADD_CUSTOMER, payload: data }),
    getProductAvailiblity: (id) => dispatch({ type: GET_PRODUCT_AVAILIBLITY, payload: { id } }),
    addTranscation: (data) => dispatch({ type: ADD_TRANSCATION, payload: data }),
    updateTranscationStatus: (id, status,paidAmount,returnAmount,creditAmount) => dispatch({ type: UPDATE_TRANSCATION_STATUS, payload: { id, data: { status,paidAmount,returnAmount,creditAmount } } }),
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } }),

})
export default connect(mapStateToProps, mapDispatchToProps)(Orders);