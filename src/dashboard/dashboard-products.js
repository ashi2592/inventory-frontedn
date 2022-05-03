
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import TableHeader from '../layout/TableHeader';

const DashboardProducts = ({ productCounts, border }) => {

    let [borderclass, setBordercolor] = useState(`card  border-left-primary shadow h-100 py-2`);

    useEffect(() => {
        setBordercolor(`card  border-left-${border ? border : 'primary'} shadow h-100 py-2`)
    }, [border])

    return (<Card color='purple'>
        <Card.Content>
            <Card.Header>Product Counts</Card.Header>
            <Card.Description>
                <Table celled>
                    <TableHeader Headers={['Category', 'Qty']}></TableHeader>
                    <TableBody>
                        {productCounts.map(x => (<TableRow key={'transcation-dashboard-' + x.categoryName}  >

                            <TableCell >{x.categoryName}</TableCell>
                            <TableCell >{x.count}</TableCell>

                        </TableRow>))}
                    </TableBody>
                </Table>
            </Card.Description>
        </Card.Content>
    </Card>


    )
}



export default DashboardProducts;