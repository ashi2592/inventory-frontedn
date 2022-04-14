import React, { Component } from 'react';
import './App.css';
import ItemDetails from './inventory/Items/ItemsDetails';
import Login from './auth/login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SidebarLayout from './layout/Layout';
import Setting from './settings/setting';
import Product from './inventory/Products'
import BarCodeExample from './orders/barcode';

import Orders from './orders/orders';
import TabExampleLoading from './catalogs/Catalogs';
import DashboardAdmin from './dashboard/dashboard';
import ProductDetails from './inventory/Products/ProductDetailsview';
import addProduct from './inventory/Products/addProduct';

class App extends Component {
  render() {
    console.log("Host URL" + process.env.PUBLIC_URL);
    return (


      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/login" />
            )} />
            <Route exact path='/login' component={Login} />
          </Switch>
          <SidebarLayout>
            {/* <Route exact path='/customer' component={Customers} /> */}
            <Route exact path='/Itemdetails' component={ItemDetails} />
            <Route exact path='/setting' component={Setting} />
            <Route exact path='/product' component={Product} />
            <Route exact path='/product/:id' component={ProductDetails} />
            <Route exact path='/add-product' component={addProduct} />
            <Route exact path='/reader' component={BarCodeExample} />
             <Route exact path='/order' component={Orders} />
            <Route exact path='/catalog' component={TabExampleLoading} />
            <Route exact path='/dashboard' component={DashboardAdmin} />

          </SidebarLayout>


        </div>
      </Router>
    );
  }
}

export default App;
