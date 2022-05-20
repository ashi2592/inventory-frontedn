import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import { dateFormat } from "../../constant/global";
import './twoinchinvoice.css'

const TwoInchInvoiceTemplaate = React.forwardRef(({ transcation }, ref) => {

    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [logo, setLogo] = useState('')


    useEffect(() => {
        setAddress(localStorage.getItem('address'))
        setMobile(localStorage.getItem('mobile'))
        setLogo(localStorage.getItem('logo'))

    }, [])


    return (<div class="ticket" ref={ref}>
        <Image size="small" src={logo} alt="Logo" />
        <p class="centered">The Fashion Hub
            <br />{address}
            <br/> {mobile}
        </p>

        <p class="centered">OrderId: #{transcation.orderId}
        </p>

        <table>
            <thead>
                <tr>
                  
                    <th class="description">Description</th>
                    <th class="quantity">Q.</th>
                    <th class="price">INR</th>
                </tr>
            </thead>
            <tbody>
                {(transcation.products|| [] ).map(x=>(<tr key={`receipt-${x._id}`}>
                    <td class="description">      {x.productText}-{x.variantText}</td>
                    <td class="quantity">{x.productQty}</td>
                    <td class="price">{x.sellPrice}</td>
                </tr>))}
                
                <tr>
                   
                    <td class="description">Total</td>
                    <td class="quantity"></td>
                    <td class="price">{transcation.totalVal}</td>
                </tr>
                {transcation.discount !== 0 && (<tr>
                   
                   <td class="description">Discount</td>
                   <td class="quantity"></td>
                   <td class="price">{transcation.discount}</td>
               </tr>)}
               {transcation.paidAmount !== 0 && (<tr>
                   
                   <td class="description">Paid</td>
                   <td class="quantity"></td>
                   <td class="price">{transcation.paidAmount}</td>
               </tr>)}

               {transcation.returnAmount !== 0 && (<tr>
                   
                   <td class="description">Return</td>
                   <td class="quantity"></td>
                   <td class="price">{transcation.returnAmount}</td>
               </tr>)}

               {transcation.creditAmount !== 0 && (<tr>
                   
                   <td class="description">Left Balance</td>
                   <td class="quantity"></td>
                   <td class="price">{transcation.creditAmount}</td>
               </tr>)}

            </tbody>
        </table>

                
                    {(transcation.creditAmount > 0) && (<h4 class="centered">PARTAIL PAYMENT</h4>) }
                    {(transcation.status == true && transcation.creditAmount === 0) && (<h4 class="centered">PAID</h4>) }
                    {(transcation.status == false ) && (<h4 class="centered">CANCEL</h4>) }


               
        <p class="centered">Purchase Data:  {dateFormat(transcation.createdAt)}</p>

        <p class="centered">Thanks for your purchase!</p>

    </div>
    )
})



export default TwoInchInvoiceTemplaate

