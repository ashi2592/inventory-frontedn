import React from "react";
import { Link } from "react-router-dom";
import "./order-print.css";

const OrderThanks = () =>{
   return  ( <div className="notices">
{/* <div>NOTICE:</div> */}
<div className="notice">
    Thank you for Shopping with us !
    <p><Link to={'/order'}> New Order</Link></p>
</div>
</div>)}

export default OrderThanks;