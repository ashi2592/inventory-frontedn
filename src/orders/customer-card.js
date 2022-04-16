import React, { useRef, useState } from "react";


const OrderCustomerCard = ({ customer }) => {

    return (
    <div className="row"><div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Customer</h6>
        </div>
        <div className="card-body">
            <div className="row">
                <div className="customernamelabel col-6">
                Customer Name
                </div>
                <div className="customername col-6">
                {customer.customerName}
                </div>

            </div>
            <div className="row">
                <div className="customernamelabel col-6">
                Customer Mobile
                </div>
                <div className="customername col-6">
                {customer.mobile}
                </div>

            </div>
        </div>
    </div>
    </div>)

}

export default OrderCustomerCard;