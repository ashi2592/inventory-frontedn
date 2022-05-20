import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";

import { dateFormat } from "../../constant/global";

const InvoiceTemplaate = React.forwardRef(({transcation},ref) =>{

    const [address,setAddress] = useState('')
    const [mobile,setMobile] = useState('')
    const [logo,setLogo] = useState('')


    useEffect(()=>{
        setAddress(localStorage.getItem('address'))
        setMobile(localStorage.getItem('mobile'))
        setLogo(localStorage.getItem('logo'))

    },[])


  return ( <div className="invoice overflow-auto" ref={ref}>
  <div style={{ minWidth: "600px" }}>
      <header>
          <div className="row">
              <div className="col">
             {transcation.status == false &&  (<Image src="/cancelled.png"  size="tiny" alt="" />)} 
            
             {transcation.status == true &&  (<Image src="/paid.webp" size="tiny" alt="" />)} 
             

              </div>
              <div className="col company-details">
                  <div>
                  <img src={logo} width="200" alt="" />
                  </div>

                  <div>{address}</div>
                  <div>{mobile}</div>

              </div>
          </div>
      </header>
      <main>
          <div className="row contacts">
              <div className="col invoice-to">
                  <div className="text-gray-light">INVOICE TO:</div>
                  <h2 className="to">{transcation.customer?transcation.customer.mobile:""}</h2>

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
                          {prod.productText}-{prod.variantText}
                      </td>
                      <td className="unit">  {prod.sellPrice}</td>
                      <td className="qty">{prod.productQty}</td>
                      <td className="total">{prod.productQty * prod.sellPrice}</td>
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
                      <td>{transcation.totalVal}</td>
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
</div>)
})



export default InvoiceTemplaate

