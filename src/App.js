import React, { Component } from 'react';
import './App.css';
import Customers from './Customers';
import ItemDetails from './inventory/Items/ItemsDetails';
import Login from './auth/login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SidebarLayout from './layout/Layout';
import Category from './inventory/Category/Category';
import Brand from './inventory/brand/index';
import Setting from './settings/setting';
import Supplier from './inventory/Supplier';
import Product from './inventory/Products'
import BarcodeScannerComponentExmple from './features/barcodereader';
import BarCodeExample from './orders/barcode';

import Orders from './orders/orders';
import BarcodeScanner from './barcode/BarcodeScanner';


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
            <Route exact path='/customer' component={Customers} />
            <Route exact path='/Itemdetails' component={ItemDetails} />
            <Route exact path='/category' component={Category} />
            <Route exact path='/brand' component={Brand} />
            <Route exact path='/setting' component={Setting} />
            <Route exact path='/supplier' component={Supplier} />
            <Route exact path='/product' component={Product} />
            <Route exact path='/reader' component={BarCodeExample} />
            <Route exact path='/barcode' component={BarcodeScanner} />

            <Route exact path='/order' component={Orders} />
          </SidebarLayout>


        </div>
      </Router>
    );
  }
}

export default App;
