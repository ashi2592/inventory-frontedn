import React, { useEffect, useState } from 'react';
import { Card, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import TableHeader from '../layout/TableHeader';

const DashboardTopSelling = ({topSelling}) =>{

    useEffect(()=>{
        console.log(topSelling)
    },[topSelling])

    return ( <Card color='blue' fluid>
        <Card.Content>
            <Card.Header>
                Top Selling Product
            </Card.Header>
            <Card.Description>
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
            </Card.Description>
        </Card.Content>
    </Card>)
}



export default DashboardTopSelling;