import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";


const OrderCustomerCard = ({ customer }) => {

    return (
        <Card>
            <Card.Content>
                <Card.Header> <Link to={`/customer/${customer && customer._id}`}> {customer ? customer.customerName : ""}</Link> </Card.Header>
                <Card.Meta> Selected Customer </Card.Meta>

                <Card.Description>
                        Mobile:  {customer ? customer.mobile : ""}

                </Card.Description>
            </Card.Content>
        </Card>
        )

}

export default OrderCustomerCard;