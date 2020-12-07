import React, { useContext } from 'react';
import './App.css';
import { SignUp, SignIn } from './layouts/Auth';
import { CustListItems } from './layouts/Customer';
import { ManagListItems } from './layouts/Manager';
import { ChefListItems } from './layouts/Chef';
import { DelivListItems } from './layouts/Delivery';
import { DashboardLayout, Home, Menus } from './layouts';
import { Nav, Alerts } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AuthState from './context/auth/authState';
import AlertState from './context/alerts/alertState';
import MenuItemsState from './context/menuItems/menuItemsState';

export default function App() {
  return (
    <MenuItemsState>
      <AuthState>
        <AlertState>
          <Router>
            <div className='App'>
              <Alerts />
              <Switch>
                <Route path='/delivery' component={DeliveryLayout} />
                <Route path='/chef' component={ChefLayout} />
                <Route path='/manager' component={ManagerLayout} />
                <Route path='/customer' component={CustomerLayout} />
                <Route path='/auth' component={AuthLayout} />
                <Route path='/menus' component={Menus} />
                <Route path='/' component={Home} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </AuthState>
    </MenuItemsState>
  );
}

function AuthLayout() {
  return (
    <Switch>
      <Redirect exact from='/auth' to='/auth/signin' />
      <Route path='/auth/signup' exact component={SignUp} />
      <Route path='/auth/signin' exact component={SignIn} />
    </Switch>
  );
}

function CustomerLayout() {
  const routes = (
    <Switch>
      <Redirect exact from='/customer' to='/customer/dashboard' />
      <Route path='/customer/dashboard' exact component={Dashboard} />
      <Route path='/customer/cart' exact component={Cart} />
      <Route path='/customer/discussion' exact component={Cart} />
    </Switch>
  );

  return <DashboardLayout listItems={CustListItems} routes={routes} />;
}

function ManagerLayout() {
  const routes = (
    <Switch>
      <Redirect exact from='/manager' to='/manager/dashboard' />
      <Route path='/manager/dashboard' exact component={Dashboard} />
      <Route path='/manager/employees' exact component={Dashboard} />
      <Route path='/manager/customers' exact component={Dashboard} />
      <Route path='/manager/discussion' exact component={Dashboard} />
    </Switch>
  );

  return <DashboardLayout listItems={ManagListItems} routes={routes} />;
}

function ChefLayout() {
  const routes = (
    <Switch>
      <Redirect exact from='/chef' to='/chef/dashboard' />
      <Route path='/chef/dashboard' exact component={Dashboard} />
      <Route path='/chef/recipes' exact component={Dashboard} />
      <Route path='/chef/orders' exact component={Dashboard} />
      <Route path='/chef/discussion' exact component={Dashboard} />
    </Switch>
  );

  return <DashboardLayout listItems={ChefListItems} routes={routes} />;
}

function DeliveryLayout() {
  const routes = (
    <Switch>
      <Redirect exact from='/delivery' to='/delivery/dashboard' />
      <Route path='/delivery/dashboard' exact component={Dashboard} />
      <Route path='/delivery/deliveries' exact component={Dashboard} />
      <Route path='/delivery/discussion' exact component={Dashboard} />
    </Switch>
  );

  return <DashboardLayout listItems={DelivListItems} routes={routes} />;
}

const Dashboard = () => {
  return <h1> Home </h1>;
};

const Cart = () => {
  return <h1> Cart </h1>;
};
