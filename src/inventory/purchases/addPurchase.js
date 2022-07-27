import _, { parseInt } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { purchaseProductSchema } from "../../constant/validationSchema";
import { ADD_PURCHASE, ALERT_NOTIFY } from "../../redux/actions";
import AddPurchaseProductpage from './addPurchaseProduct';
import AddPurchaseSupplierpage from './addSupplierProduct';

const AddPuchasepage = ({
    alertMessage,
    addPurchase
}) => {
    const history = useHistory()
    const [purchases, setPurchases] = useState({ delivery: 0 })
    const [products, setProducts] = useState([])
    const [inputs, setInputs] = useState({ productId: "", variantId: "", qty: 1, purchasePrice: "", tax: 5, mrp: "", sellPrice: "", productText: "", variantText: "" });
    const [prices, setPrices] = useState({ taxAmount: "", totalAmount: "", singleItem: "" });
    const [openAddModel, setOpenAddModal] = useState(false);
    const [openSupplierModel, setOpenSupplierModel] = useState(false);
    const [steps, setSteps] = useState(1)

    const handleDeleteItem = (index) => {
        let pro = products.filter((x, i) => i !== index);
        setProducts(pro)
    }


    useEffect(() => {
        setInputs({ productId: "", variantId: "", qty: "", purchasePrice: "", tax: "", mrp: "", sellPrice: "", })
        calculateInvoice()
        setOpenAddModal(false)
    }, [products])


    const calculateInvoice = () => {
        let totalAmount = 0;
        let taxAmount = 0;
        let totalQty = 0;
        products.map(x => {
            totalAmount += parseInt(x.totalAmount);
            taxAmount += parseInt(x.taxAmount);
            totalQty += parseInt(x.qty);
        })
        let purchase = {
            totalAmount,
            taxAmount,
            totalQty,
            products
        }

        setPurchases(purchase)

    }

    const handleSupplierChange = (name, value, textContent) => {
        let newsearch = { ...purchases, [name]: value };
        if (name === 'supplier') {
            newsearch = { ...newsearch, 'supplierText': textContent }
        }
        setPurchases(newsearch)
    }

    const handleSubmit = () => {

        purchaseProductSchema.validate(purchases).then(res => {
            addPurchase(purchases)
            history.push('/purchase')
        }).catch(err => {
            console.log(err)
        })


    }


    return (
        <Container fluid>
            <Header>Add Purchase Invoice</Header>

            {products.length > 0 && (<Grid columns={2} stackable>
                <GridRow >
                    <GridColumn>

                    </GridColumn>

                    <GridColumn textAlign="right">

                        {steps == 1 && (<Button size="small" color="blue" onClick={() => setOpenAddModal(true)}> <Icon name="plus"></Icon> Add Products</Button>
                        )}
                        {(steps == 1 && products.length > 0) && (<Button size="small" color="green" onClick={() => setSteps(2)}>  Next <Icon name="arrow right"></Icon></Button>
                        )}

                        {steps == 2 && (<Button size="small" color="blue" onClick={() => setSteps(1)}> <Icon name="arrow left"></Icon> Back</Button>)}
                        {steps == 2 && (<Button size="small" color="red" onClick={() => setOpenSupplierModel(true)}> <Icon name="plus"></Icon> Add Supplier and Delivery</Button>)}

                        {steps == 2 && (<Button size="small" color="green" onClick={() => handleSubmit()}> <Icon name="save"></Icon> Save</Button>)}

                    </GridColumn>

                </GridRow>
            </Grid>)}

            <AddPurchaseProductpage
                products={products}
                inputs={inputs}
                prices={prices}
                openAddModel={openAddModel}
                setProducts={setProducts}
                setInputs={setInputs}
                setPrices={setPrices}
                setOpenAddModal={setOpenAddModal}
            ></AddPurchaseProductpage>

            <AddPurchaseSupplierpage
                purchases={purchases}
                setPurchases={setPurchases}
                handleSupplierChange={handleSupplierChange}
                openSupplierModel={openSupplierModel}
                setOpenSupplierModel={setOpenSupplierModel}
            ></AddPurchaseSupplierpage>

            { products.length == 0 && (<Button color="blue" textAlign="center" onClick={() => setOpenAddModal(true)}> <Icon name="plus"></Icon>Add Product</Button>)}

            {products.length > 0 && (<Card fluid>
                <Card.Content>
                    <Card.Header></Card.Header>
                    <Grid columns={5} stackable stretched>
                        <GridColumn>
                            Total Qty : <strong>{purchases.totalQty}</strong>
                        </GridColumn>
                        <GridColumn>
                            Total Amount : <strong>{purchases.totalAmount - purchases.taxAmount} </strong>
                        </GridColumn>
                        <GridColumn>
                            Tax : <strong>{purchases.taxAmount}</strong>
                        </GridColumn>

                        <GridColumn>
                            Delivery: <strong>{purchases.delivery || 0}</strong>
                        </GridColumn>
                        <GridColumn>
                            Final Amount : <strong>{parseInt(purchases.totalAmount) + parseInt(purchases.delivery || 0)}</strong>
                        </GridColumn>
                    </Grid>

                    <Divider></Divider>
                    <Card.Description>
                        <Table celled striped selectable>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Product</TableHeaderCell>
                                    <TableHeaderCell>Variants</TableHeaderCell>
                                    <TableHeaderCell>Mrp</TableHeaderCell>
                                    <TableHeaderCell>Purchase Price</TableHeaderCell>
                                    <TableHeaderCell>Tax</TableHeaderCell>
                                    <TableHeaderCell>Qty</TableHeaderCell>
                                    <TableHeaderCell>Sell Price</TableHeaderCell>
                                    <TableHeaderCell>Total Value</TableHeaderCell>
                                    <TableHeaderCell>Action</TableHeaderCell>
                                </TableRow>

                            </TableHeader>
                            <TableBody>
                                {products.map((product, index) => (
                                    <TableRow>
                                        <TableCell>
                                            {product.productText}

                                        </TableCell>
                                        <TableCell>
                                            {product.variantText}
                                        </TableCell>
                                        <TableCell>{product.mrp}</TableCell>
                                        <TableCell>{product.purchasePrice}</TableCell>
                                        <TableCell>{product.taxAmount}</TableCell>
                                        <TableCell>{product.qty}</TableCell>
                                        <TableCell>{product.sellPrice}</TableCell>
                                        <TableCell>{product.totalAmount}</TableCell>
                                        <TableCell><Icon name="trash" onClick={() => handleDeleteItem(index)}></Icon></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card.Description>
                </Card.Content>

            </Card>)}




        </Container>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),
    addPurchase: (data) => dispatch({ type: ADD_PURCHASE, payload: data })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPuchasepage)