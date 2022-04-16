
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import TableHeader from '../layout/TableHeader';
import { GET_DAY_WISE_TRANSCATION, GET_TRANSCATION_LIST } from '../redux/actions';

const DashboardTransaction = ({ title, value, border,daywiseSell, getDaywiseSell }) => {

    let [borderclass, setBordercolor] = useState(`card  border-left-primary shadow h-100 py-2`);

    useEffect(() => {
        setBordercolor(`card  border-left-${border ? border : 'primary'} shadow h-100 py-2`)
    }, [border])

    useEffect(()=>{
        getDaywiseSell()
    },[])

    return (<div className="col-xl-6 col-md-6 mb-4">
        <div className='card'>
        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Day Wise Sell Report</h6>
                    </div>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <Table celled>
                        <TableHeader Headers={['Date', 'Qty','Amount']}></TableHeader>
                        <TableBody>
                        {daywiseSell.map(x => (<TableRow key={'transcation-dashboard-' + x._id}  >
                            <TableCell >{x._id}</TableCell>
                            <TableCell >{x.averageQuantity}</TableCell>
                            <TableCell >{x.totalSaleAmount}</TableCell>
                           
                           </TableRow>))}
                    </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
    )
}


const mapStateToProps = (state) => ({
    error: state.dashboard.error,
    daywiseSell:  state.dashboard.daywiseSell,
})

const mapDispatchToProps = (dispatch) => ({
    getDaywiseSell: () => dispatch({type: GET_DAY_WISE_TRANSCATION}),
})


export default  connect(mapStateToProps, mapDispatchToProps)(DashboardTransaction); 