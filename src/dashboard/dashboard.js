import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Container} from 'semantic-ui-react';
import { ALERT_NOTIFY, GET_CATEGORY_PRODUCT_COUNT, GET_DAY_WISE_TRANSCATION, GET_MONTH_WISE_TRANSCATION, GET_STATS_DASHBOARD, GET_TOP_SELLING } from '../redux/actions';
import DashboardCard from './dashboard-card';
import DashboardOrder from './dashboard-order';
import DashboardProducts from './dashboard-products';
import DashboardTopSelling from './dashboard-top';
import DashboardTransaction from './dashboard-transactions';




const DashboardTabular = ({ getDashboardStats, getCategoryWiseProductCount, getTopSelling, 
    dashboardStats, topSelling, productCounts, alertMessage,
    getDaywiseSell,
    getMonthWiseSell,
    daywiseSell,
    monthwiseSell

 }) => {

    const [isMobile, setIsMobile] = useState(true);
    const [mql, setMql] = useState(true);


    useEffect(() => {
        const mql = global.matchMedia(`(min-width: 768px)`);
        mql.addListener(() => _mediaQueryChanged(mql));
    })

    const _mediaQueryChanged = (mql) => {
        setIsMobile(!mql.matches);
    }

  const [secondRow, setSecondRow] = useState(1)
  const [thirdRow, setThirdRow] = useState(1)



    useEffect(() => {
        getDashboardStats()
        getTopSelling()
        getCategoryWiseProductCount();
        getDaywiseSell()
        getMonthWiseSell()

        // alertMessage('success', "I am dashboard")
    }, [])

    useEffect(()=>{
        console.log(daywiseSell)
    },[daywiseSell])
   

    useEffect(()=>{
      console.log(isMobile)
      if(isMobile)
      {
        // setIfirstItmeNo(1)
        setSecondRow(1)
        setThirdRow(1)

      }else{
        // setIfirstItmeNo(4)
        setSecondRow(2)
        setThirdRow(2)

      }
    },[isMobile])

    return ( <Container fluid>
        {/* <Card.Group itemsPerRow={firstRowItmNo}>
            <DashboardCard title={"Today Sale "} value={"INR 30000"} color={'orange'} amount={ daywiseSell[0] && daywiseSell[0]["totalSaleAmount"]}></DashboardCard>
            <DashboardCard title={"Total Sale (month)"} value={"INR 30000"} color={'red'} amount={ monthwiseSell[0] && monthwiseSell[0]["averageProfit"]}></DashboardCard>
            <DashboardCard title={"Total Amount"} value={"INR 30000"} color={'green'} amount={daywiseSell[0] && daywiseSell[0]["totalSaleAmount"]}></DashboardCard>
            <DashboardCard title={"Total Amount(month)"} value={"INR 30000"} color={'blue'} amount={monthwiseSell[0] && monthwiseSell[0]["averageProfit"]}></DashboardCard>
        </Card.Group> */}

        <Card.Group itemsPerRow={secondRow}>

            <DashboardOrder></DashboardOrder>
            <DashboardTransaction ></DashboardTransaction>

        </Card.Group>

        <Card.Group itemsPerRow={thirdRow}>

            <DashboardTopSelling topSelling={topSelling}></DashboardTopSelling>
            <DashboardProducts productCounts={productCounts}></DashboardProducts>

        </Card.Group>
    </Container>

    )
}

const mapStateToProps = (state) => ({
    error: state.products.error,
    transcations: state.transcation.transcations,
    transcation: state.transcation.transcation,
    dashboardStats: state.dashboard.dashboardStats,
    topSelling: state.dashboard.topSelling,
    productCounts: state.dashboard.productCounts,
    daywiseSell: state.dashboard.daywiseSell,
    monthwiseSell: state.dashboard.monthwiseSell,

    // state: state
})




const mapDispatchToProps = (dispatch) => ({
    getTopSelling: () => dispatch({ type: GET_TOP_SELLING }),
    getCategoryWiseProductCount: () => dispatch({ type: GET_CATEGORY_PRODUCT_COUNT }),
    getDashboardStats: () => dispatch({ type: GET_STATS_DASHBOARD }),
    getDaywiseSell: () => dispatch({ type: GET_DAY_WISE_TRANSCATION }),
    getMonthWiseSell: () => dispatch({ type: GET_MONTH_WISE_TRANSCATION }),
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),
})


export default connect(mapStateToProps, mapDispatchToProps)(DashboardTabular); 