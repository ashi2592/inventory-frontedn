
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import TableHeader from '../layout/TableHeader';

  
  
  

const DashboardTransaction = ({ title, value, border, daywiseSell }) => {
   


    return (
        <Card fluid color='green'>
            <Card.Content>
                <Card.Header>
                    Day Wise Sell Report
                </Card.Header>
                <Card.Description>
                {/* <Chart type='line' data={chartData} /> */}
                {/* <Line data={data} legend={legend} options={options} /> */}
                    <Table celled>
                        <TableHeader Headers={['Date', 'Qty', 'Amount']}></TableHeader>
                        <TableBody>
                            {daywiseSell.map(x => (<TableRow key={'transcation-dashboard-' + x._id}  >
                                <TableCell >{x._id}</TableCell>
                                <TableCell >{x.averageQuantity}</TableCell>
                                <TableCell >{x.totalSaleAmount}</TableCell>

                            </TableRow>))}
                        </TableBody>
                    </Table>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}


const mapStateToProps = (state) => ({
    error: state.dashboard.error,
    daywiseSell: state.dashboard.daywiseSell,
    monthwiseSell: state.dashboard.monthwiseSell,

})

const mapDispatchToProps = (dispatch) => ({
  

})


export default connect(mapStateToProps, mapDispatchToProps)(DashboardTransaction); 