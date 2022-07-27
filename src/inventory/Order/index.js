import _, { uniqueId } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon, Table, Button, TableCell, TableRow, Input, Container, Header, Grid, GridRow, GridColumn } from "semantic-ui-react";
import DropdownSearchSelection from "../../layout/Dropdown";
import TableHeader from "../../layout/TableHeader"
import { ADD_CUSTOMER, ADD_TRANSCATION, BARCODE_PRODUCT, GET_BARCODE_DETAILS, GET_CUSTOMER_DETAILS, GET_CUSTOMER_LIST, GET_OTHER_LIST, GET_PRODUCT_AVAILIBLITY, GET_PRODUCT_LIST, GET_SIZE_LIST, SEARCH_PRODUCT, UPDATE_TRANSCATION_STATUS } from "../../redux/actions";
import OrderCustomerCard from "../../components/customer-card";


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

    const history = useHistory()
    const [transcationData, setTranscation] = useState({})
    const [cart, setCart] = useState([])
    const customerObj = _.map(customers, (data) => ({ key: data._id, value: `${data.mobile} - ${data.customerName}` }))
    const [steps, setSteps] = useState(1);
    const [orderRecords, setOrderRecords] = useState({
        totalQty: 0,
        totalMrp: 0,
        totalPrice: 0,
        discount: 0,
        totalVal: 0,
        paidAmount: 0,
        creditAmount: 0,
        returnAmount: 0,
        totalPurchase:0
    })

    const [orderId,setOrderId] =useState('')
    const [barcode, setBarcode] = useState('');
    const [scanedbarcode, setScanBarcodd] = useState('');
    const [selectedProducts, setSelectedProducts] = useState({});
    const [isCreditAvailable, setIsCreditAvailable] = useState(true);

    useEffect(()=>{
        setOrderId('O' + _.uniqueId() + _.uniqueId())
        getCustomers(1,100,'')
        setCart([])
    },[])

    
    // const params = useParams()

    useEffect(() => {
        console.log("is mobile", isMobile)
    }, [isMobile])

    const handleCustomerChange = (name, id) => {
        if(id !== undefined){
            getCustomer(id);

        }
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
        if (Object.keys(selectedProducts).length) {
            handleAddToCart(scanedbarcode)
            setTimeout(() => {
                setBarcode('');
                setScanBarcodd('')
            }, [300])

        }
    }, [selectedProducts])


    const handleAddToCart = (scanedbarcode) => {
        const isExisting = cart.findIndex(x => x.purchaseProductId === selectedProducts.purchaseProductId)
        if(scanedbarcode)
        {
            if (isExisting >= 0) {
                let cartvalue = cart.map(x => {
                    if (x.purchaseProductId === selectedProducts.purchaseProductId) {
                        x.productQty = x.productQty + 1;
                        x.sellPrice = (x.sellPrice * parseInt(x.productQty));
                    }
                    return x
                });
                setCart(cartvalue)
            } else {
    
                let preparecart = {
                    productId: selectedProducts.productId,
                    variantId: selectedProducts.variantId,
                    barcode: selectedProducts.barcode,
                    productQty: 1,
                    productName:selectedProducts.product && selectedProducts.product.productName?selectedProducts.product.productName:"",
                    sellPrice: selectedProducts.product && selectedProducts.product.productPrice ? selectedProducts.product.productPrice : 0,
                }
                let cartvalue = [...cart, preparecart];
                setCart(cartvalue)
                setSelectedProducts({})
            }
        }
      
    }


    useEffect(() => {
        let data = {
            totalQty: 0,
            totalMrp: 0,
            totalPrice: 0,
            totalVal: 0,

        };
        cart.forEach(x => {
            let mrp = parseInt(x.mrp);
            let sellPrice = parseInt(x.sellPrice);
            let purchase = parseInt(x.singleItem);

            data = {
                totalQty: data.totalQty ?data.totalQty + x.productQty : x.productQty,
                totalPrice: data.totalPrice  ? data.totalPrice  + sellPrice : sellPrice,
               
            };

            data.totalVal = (data.totalQty* data.totalPrice)
        })
        setOrderRecords({ ...orderRecords, ...data })

    }, [cart])

    const handleDiscount = (value, totalPrice) => {
        if(!isNaN(parseInt(value)))
        {
            setOrderRecords({...orderRecords,'discount':parseInt(value),totalVal: (orderRecords.totalVal-parseInt(value))})
        }
    }

    const handleAmountPaid = (value, totalVal) => {

        if (!isNaN(parseInt(value))) {
            let balanceAmount = parseInt(orderRecords.totalVal) - parseInt(value)
            if (balanceAmount > 0) {
                setOrderRecords({...orderRecords,'creditAmount':balanceAmount,paidAmount:parseInt(value)})
            } else {
                setOrderRecords({...orderRecords,'creditAmount':0,returnAmount:Math.abs(balanceAmount),paidAmount:parseInt(value)})
            }
        } else{
            setOrderRecords({...orderRecords,'creditAmount':0,returnAmount:0,paidAmount:0,})
        }
    }

    const handleDelete = (id) => {
        let cartvalue = cart.filter(x => x.productId !== id);
        setCart(cartvalue)
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
            case 3:
                if (Object.keys(customer).length > 0) {
                    handleConfirmPurchse()
                } else {
                    alert('Please Select Customer')
                }

                break;
            case 4:

                updateTranscationStatus(transcation._id, true, orderRecords.paidAmount, orderRecords.returnAmount, orderRecords.creditAmount)
                setTimeout(() => {
                    history.push(`/order/print/${transcation._id}`);
                    // navigate("../success", { replace: true });
                }, 1000)
                break;
        }
    }, [steps])




    const handleConfirmPurchse = () => {

        let fcustumer = {
            _id: customer._id,
            customerName: customer.customerName,
            mobile: customer.mobile
        }

        let transcation = {
            customer: fcustumer,
            products: cart,
            totalQty: orderRecords.totalQty,
            totalMrp: orderRecords.totalMrp,
            totalPrice:  orderRecords.totalPrice,
            totalProfit: (orderRecords.totalVal - orderRecords.totalPurchase),
            totalVal: orderRecords.totalVal,
            discount: orderRecords.discount,
            orderId: orderId,
            paidAmount :orderRecords.paidAmount,
            creditAmount :orderRecords.creditAmount,
            returnAmount:orderRecords.returnAmount,

        }

        setTranscation(transcation)


    }


    useEffect(() => {
        if (Object.keys(transcationData).length) {
            addTranscation(transcationData)
        }
        console.log(transcationData)
    }, [transcationData])

    const handleAddOrder = (id) => {
        history.push(`/order/`)
    }


    return (
        <Container fluid>
            <Header>Orders</Header>

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

                    </GridColumn>
                </GridRow>
            </Grid>

            <Table >
                {cart.length > 0 && <TableHeader Headers={['Product', 'Qty',  'Price', 'Action']}></TableHeader>}
                <Table.Body>
                    {cart.map((x, i) => (<TableRow key={'cart-' + i + x.productId}>
                        <TableCell >{x.productName}</TableCell>
                        <TableCell >{x.productQty} x</TableCell>
                        <TableCell>{x.sellPrice}</TableCell>
                        <TableCell>
                            {(steps < 3) && <Button color="red" onClick={() => handleDelete(x.productId)}>Delete</Button>}
                        </TableCell>
                    </TableRow>))}

                    {cart.length > 0 && (<TableRow>
                        <TableCell></TableCell>
                        <TableCell collapsig={2}>
                            Total Qty:  {orderRecords.totalQty}
                        </TableCell>
            
                        <TableCell>
                            Total Price: {orderRecords.totalPrice}
                        </TableCell>
                    </TableRow>)}
                    {/* && steps == 3 */}
                    {(cart.length > 0 && steps >= 2) && (<TableRow>
                        <TableCell ></TableCell>
                       
                       

                        <TableCell>
                            Discount
                        </TableCell>
                        <TableCell>
                            {steps === 2 && (<Input
                                value={orderRecords.discount}
                                placeholder='Discount'
                                name={'Discount'}
                                onChange={(e, { value }) => { handleDiscount(value) }}

                            />)}

                            {steps > 2 && orderRecords.discount}
                        </TableCell>
                    </TableRow>)}

                    {(cart.length > 0) && (<TableRow>
                      
                       
                        <TableCell>

                        </TableCell>

                        <TableCell>
                            Final Amount
                        </TableCell>
                        <TableCell>
                            {orderRecords.totalVal}
                        </TableCell>
                    </TableRow>)}

                    {(isCreditAvailable && steps === 3) && (
                        (<TableRow>
                      
                           
                            <TableCell>
                            </TableCell>

                            <TableCell>
                                Paid Amount
                            </TableCell>
                            <TableCell>
                                {steps === 3 && (<Input
                                    value={orderRecords.paidAmount}
                                    placeholder='Paid Amount'
                                    name={'paidAmount'}
                                    onChange={(e, { value }) => { handleAmountPaid(value) }}

                                />)}

                                {/* {paidAmount?paidAmount:0} */}
                            </TableCell>
                        </TableRow>)
                    )}

                    {(isCreditAvailable && steps === 3) && (
                        (<TableRow warning={true}>
                            
                            <TableCell>
                            </TableCell>

                            <TableCell >
                                Credit Amount
                            </TableCell>
                            <TableCell>

                                {orderRecords.creditAmount}
                            </TableCell>
                        </TableRow>)
                    )}

                    {(isCreditAvailable && steps === 3) && (
                        (<TableRow>
                            <TableCell ></TableCell>
                            <TableCell>
                                Return Amount
                            </TableCell>
                            <TableCell>
                                {orderRecords.returnAmount}

                            </TableCell>
                        </TableRow>)
                    )}


                </Table.Body>
            </Table>



        </Container>


    )
}

const mapStateToProps = (state) => ({
    barcodeData: state.barcodes.barcode,
    transcations: state.transcation.transcations,
    transcation: state.transcation.transcation,
    customers: state.customers.customers,
    customer: state.customers.customer,
})

const mapDispatchToProps = (dispatch) => ({
    barcodeProduct: ({ barcode }) => dispatch({ type: GET_BARCODE_DETAILS, payload: { barcode } }),
    getCustomers: ({ page, count, searchText }) => dispatch({ type: GET_CUSTOMER_LIST, payload: { page, count, searchText } }),
    getCustomer: (id) => dispatch({ type: GET_CUSTOMER_DETAILS, payload: { id } }),
    addCustomer: (data) => dispatch({ type: ADD_CUSTOMER, payload: data }),
    addTranscation: (data) => dispatch({ type: ADD_TRANSCATION, payload: data }),
    updateTranscationStatus: (id, status, paidAmount, returnAmount, creditAmount) => dispatch({ type: UPDATE_TRANSCATION_STATUS, payload: { id, data: { status, paidAmount, returnAmount, creditAmount } } }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Orders);