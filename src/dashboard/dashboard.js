import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GET_CATEGORY_PRODUCT_COUNT, GET_DAY_WISE_TRANSCATION, GET_STATS_DASHBOARD, GET_TOP_SELLING } from '../redux/actions';
import Apexlinechart from './dashboard-barchart';
import DashboardCard from './dashboard-card';
import DashboardOrder from './dashboard-order';
import DashboardProducts from './dashboard-products';
import DashboardTopSelling from './dashboard-top';
import DashboardTransaction from './dashboard-transactions';




const DashboardTabular = ({getDashboardStats,getCategoryWiseProductCount,getTopSelling,dashboardStats,topSelling,productCounts}) => {

    useEffect(()=>{
        getDashboardStats()
        getTopSelling()
        getCategoryWiseProductCount()
    },[])

    return (
        <div className="container-fluid">
            <div className="row">
                <DashboardCard title={"Today Sale "} value={"INR 30000"}></DashboardCard>
                <DashboardCard title={"Total Sale (month)"} value={"INR 30000"} border={'danger'}></DashboardCard>
                <DashboardCard title={"Total Purchase(month)"} value={"INR 30000"} border={'info'}></DashboardCard>
                <DashboardCard title={"Total Return(month)"} value={"INR 30000"} border={'success'}></DashboardCard>

            </div>
            <div className='row'>

                <DashboardOrder></DashboardOrder>
                <DashboardTransaction ></DashboardTransaction>
                <DashboardTopSelling topSelling={topSelling}></DashboardTopSelling>
                <DashboardProducts productCounts={productCounts}></DashboardProducts>
                <Apexlinechart></Apexlinechart>
            </div>
        </div>)
}

const mapStateToProps = (state) => ({
    error: state.products.error,
    transcations: state.transcation.transcations,
    transcation: state.transcation.transcation,
    dashboardStats:  state.dashboard.dashboardStats,
    topSelling:  state.dashboard.topSelling,
    productCounts:  state.dashboard.productCounts,
 
    // state: state
})




const mapDispatchToProps = (dispatch) => ({
    getTopSelling: () => dispatch({type: GET_TOP_SELLING}),
    getCategoryWiseProductCount: () => dispatch({type: GET_CATEGORY_PRODUCT_COUNT}),
    getDashboardStats: () => dispatch({type: GET_STATS_DASHBOARD})
})


export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabular); 