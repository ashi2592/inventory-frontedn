
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import TableHeader from '../layout/TableHeader';

const DashboardProducts = ({ productCounts,border }) => {

    let [borderclass, setBordercolor] = useState(`card  border-left-primary shadow h-100 py-2`);

    useEffect(() => {
        setBordercolor(`card  border-left-${border ? border : 'primary'} shadow h-100 py-2`)
    }, [border])

    return (<div className="col-xl-4 col-md-3 mb-4">
        <div className='card'>
        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Product Counts</h6>
                    </div>

            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <Table celled>
                        <TableHeader Headers={['Category','Qty']}></TableHeader>
                        <TableBody>
                        {productCounts.map(x => (<TableRow key={'transcation-dashboard-' + x.categoryName}  >
                         
                            <TableCell >{x.categoryName}</TableCell>
                            <TableCell >{x.count}</TableCell>
                           
                           </TableRow>))}
                    </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
    )
}



export default DashboardProducts;