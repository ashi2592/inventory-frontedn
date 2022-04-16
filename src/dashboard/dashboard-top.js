import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import TableHeader from '../layout/TableHeader';

const DashboardTopSelling = ({topSelling}) =>{

    useEffect(()=>{
        console.log(topSelling)
    },[topSelling])

    return ( <div className="col-xl-4 col-md-3 mb-4">
    <div className='card'>
    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Top Selling Products</h6>
                </div>

        <div className="card-body">
            <div className="row no-gutters align-items-center">
                <Table celled>
                    <TableHeader Headers={['Product', 'Category','Size','Color','Brand']}></TableHeader>
                    <TableBody>
                        {
                                topSelling.map(top=>(<TableRow key={top.productName}>
                                    <TableCell>{top.productName}</TableCell>
                                    <TableCell>{top.productCategoryName}</TableCell>
                                    <TableCell>{top.productSizeName}</TableCell>
                                    <TableCell>{top.productColorName}</TableCell>
                                    <TableCell>{top.productBrandName}</TableCell>

                                </TableRow>))
                            
                        }
                       
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
</div>)
}



export default DashboardTopSelling;