
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';
import { dateFormat } from '../constant/global';
import TableHeader from '../layout/TableHeader';
import { GET_TRANSCATION_LIST } from '../redux/actions';

const DashboardOrder = ({ title, value, border,transcations, getTranscations }) => {

    let [borderclass, setBordercolor] = useState(`card  border-left-primary shadow h-100 py-2`);

    useEffect(() => {
        setBordercolor(`card  border-left-${border ? border : 'primary'} shadow h-100 py-2`)
    }, [border])

    useEffect(()=>{
        getTranscations(1,10,'')
    },[])

    return (<div className="col-xl-6 col-md-6 mb-4">
        <div className='card'>
        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Last Order</h6>
                    </div>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <Table celled>
                        <TableHeader Headers={['OrderId','Phone', 'Value','Date','Status']}></TableHeader>
                        <TableBody>
                        {transcations.map(x => (<TableRow key={'transcation-dashboard-' + x._id} negative={x.status?false:true} positive={x.status?true:false} >
                            <TableCell >{x.orderId}</TableCell>
                            <TableCell >{x.customer?x.customer.mobile:''}</TableCell>
                            <TableCell >{x.totalVal}</TableCell>
                            <TableCell >{dateFormat(x.createdAt)}</TableCell>
                            <TableCell >{x.status?"Done":"Cancel"}</TableCell>

                            <TableCell><Link to={`/order/print/${x._id}`}>View Invoice</Link></TableCell>
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
    error: state.products.error,
    transcations: state.transcation.transcations,
    transcation: state.transcation.transcation
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
  getTranscations: (page,count,searchText)=> dispatch({type: GET_TRANSCATION_LIST, payload: {page,count,searchText}})
})


export default  connect(mapStateToProps, mapDispatchToProps)(DashboardOrder); 