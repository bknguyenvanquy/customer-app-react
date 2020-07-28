import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/header/Header';
import CustomerDetail from './components/customers/customer-detail/CustomerDetail';
import CustomerOrder from './components/customers/customer-order/CustomerOrder';
import CreateUpdateCustomer from './components/customers/create-update-customer/CreateUpdateCustomer';
import Customers from './components/customers/Customers';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Settings from './components/settings/Settings';
import axios from 'axios';
import ListViewCustomers from './components/customers/customers-view/ListViewCustomers';
import CardViewCustomer from './components/customers/customers-view/CardViewCustomer';

axios.interceptors.request.use(function (config: any) {
  config.baseURL = ' http://localhost:3000/';
  // config.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  return config;
}, function (error: any) {
  return Promise.reject(error);
});

class App extends Component {

  guardFunc = (destComponent: any) => {
    if (localStorage.getItem('user')) {
      return destComponent;
    } 
    return <Redirect to="/login"></Redirect>
  }
  render() {
    return (
      <Router>
        <Header></Header>
        <br/>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" render={() => this.guardFunc(<Redirect to="/customers"></Redirect>)}></Route>
            <Route path="/customers/:id/details" render={(props) => <CustomerDetail {...props}></CustomerDetail>}></Route>
            <Route path="/customers/:id/orders" render={(props) => <CustomerOrder {...props}></CustomerOrder>}></Route>
            <Route path="/customers/:id/edit" render={(props) => <CreateUpdateCustomer {...props}></CreateUpdateCustomer>}></Route>
            <Route path="/customers/create" render={(props) => this.guardFunc(<CreateUpdateCustomer {...props}></CreateUpdateCustomer>)}></Route>
            <Route exact path="/customers" render={(props) => <Customers {...props}></Customers>}></Route>
            <Route exact path="/customers" render={(props) => <Customers {...props}></Customers>}></Route>
            <Route exact path="/login" render={(props) => <Login {...props}></Login>}></Route>
            <Route exact path="/logout" render={() => <Logout></Logout>}></Route>
            <Route exact path="/settings" render={(props) => <Settings {...props}></Settings>}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
