
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { dateFormat } from "../constant/global";
import { GET_TRANSCATION_DETAILS } from "../redux/actions";
import "./order-print.css";

const OrderPrint = ({
    transcation,
    getTranscation
}) => {
    const {orderId} = useParams()
    useEffect(() => {
     
        getTranscation(orderId)
    }, [])

    useEffect(() => {
        console.log(transcation)

    }, [transcation])


    return (<div className="container">
        <div className="card">
            <div className="card-body">
                <div id="invoice">
                    <div className="toolbar hidden-print">
                        <div className="text-end">
                            <button type="button" className="btn btn-dark"><i className="fa fa-print"></i> Print</button>
                            <button type="button" className="btn btn-danger"><i className="fa fa-file-pdf-o"></i> Export as PDF</button>
                        </div>
                        <hr />
                    </div>
                    <div className="invoice overflow-auto">
                        <div style={{ minWidth: "600px" }}>
                            <header>
                                <div className="row">
                                    <div className="col">
                                   {transcation.status == false &&  (<img src="/cancelled.png" width="200" alt="" />)} 
                                  
                                   {transcation.status == true &&  (<img src="/paid.webp" width="200" alt="" />)} 
                                   

                                    </div>
                                    <div className="col company-details">
                                        <div>
                                        <img src="/logo-black.jpg" width="200" alt="" />
                                        </div>

                                        <div>Ghataro, Near Gramin Bank, 844119</div>
                                        <div>(123) 456-789</div>

                                    </div>
                                </div>
                            </header>
                            <main>
                                <div className="row contacts">
                                    <div className="col invoice-to">
                                        <div className="text-gray-light">INVOICE TO:</div>
                                        <h2 className="to">9097873118</h2>

                                    </div>
                                    <div className="col invoice-details">
                                        <h1 className="invoice-id">#OrderID {transcation.orderId}</h1>
                                        <div className="date">Date of Purchase: {dateFormat(transcation.createdAt)}</div>
                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className="text-left">Product name</th>
                                            <th className="text-right">Price</th>
                                            <th className="text-right">Qty</th>
                                            <th className="text-right">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(transcation.products || []).map((prod, index) => (<tr>
                                            <td className="no">{index + 1}</td>
                                            <td className="text-left">
                                                {prod.productName}
                                            </td>
                                            <td className="unit">  {prod.productPrice}</td>
                                            <td className="qty">{prod.productQty}</td>
                                            <td className="total">{prod.productQty * prod.productPrice}</td>
                                        </tr>))}


                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2"></td>
                                            <td colspan="2">TOTAL</td>
                                            <td>{transcation.totalPrice}</td>
                                        </tr>
                                        {(transcation.discount !== 0) && (  <tr>
                                            <td colspan="2"></td>
                                            <td colspan="2">Discount</td>
                                            <td>{transcation.discount}</td>
                                        </tr>)}
                                        <tr>
                                            <td colspan="2"></td>
                                            <td colspan="2">GRAND TOTAL</td>
                                            <td>{transcation.totalPrice}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                {/* <div className="thanks">Thank you!</div> */}
                                <div className="notices">
                                    {/* <div>NOTICE:</div> */}
                                    <div className="notice">Thank you for Shopping with us !</div>
                                </div>
                            </main>
                            {/* <footer>Invoice was created on a computer and is valid without the signature and seal.</footer> */}
                        </div>

                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}


const mapStateToProps = (state) => ({
    transcation: state.transcation.transcation
})

const mapDispatchToProps = (dispatch) => ({
    getTranscation: (id) => dispatch({ type: GET_TRANSCATION_DETAILS, payload: { id } })

})
export default connect(mapStateToProps, mapDispatchToProps)(OrderPrint);
