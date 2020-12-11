import React from 'react';
import './App.css';
import { SignUp, SignIn } from './layouts/Auth';
import {
  CustListItems,
  CustDashboard,
  Cart,
  CustReviews,
} from './layouts/Customer';
import {
  ManagListItems,
  ManagDashboard,
  EmployeeList,
  CustomerList,
} from './layouts/Manager';
import {
  ChefListItems,
  ChefDashboard,
  Orders,
  Recipes,
} from './layouts/Chef';
import {
  DelivListItems,
  DelivDashboard,
  Deliveries,
} from './layouts/Delivery';
import { DashboardLayout, Home, Menus } from './layouts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Alerts from './components/Alerts';

import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import MenuItemsState from './context/menuItems/menuItemsState';
import ManagerState from './context/manager/managerState';
import ChefState from './context/chef/chefState';
import DeliveryState from './context/delivery/deliveryState';
import CustomerState from './context/customer/customerState';

export default function App() {
  return (
    <MenuItemsState>
      <ManagerState>
        <AuthState>
          <CustomerState>
            <DeliveryState>
              <ChefState>
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
              </ChefState>
            </DeliveryState>
          </CustomerState>
        </AuthState>
      </ManagerState>
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
      <Route path='/customer/dashboard' exact component={CustDashboard} />
      <Route path='/customer/reviews' exact component={CustReviews} />
      <Route path='/customer/cart' exact component={Cart} />
    </Switch>
  );

  return <DashboardLayout listItems={CustListItems} routes={routes} />;
}

function ManagerLayout() {
  const routes = (
    <Switch>
      <Redirect exact from='/manager' to='/manager/dashboard' />
      <Route path='/manager/dashboard' exact component={ManagDashboard} />
      <Route path='/manager/employees' exact component={EmployeeList} />
      <Route path='/manager/customers' exact component={CustomerList} />
    </Switch>
  );

  return <DashboardLayout listItems={ManagListItems} routes={routes} />;
}

function ChefLayout() {
  const routes = (
    <Switch>
      <Redirect exact from='/chef' to='/chef/dashboard' />
      <Route path='/chef/dashboard' exact component={ChefDashboard} />
      <Route path='/chef/recipes' exact component={Recipes} />
      <Route path='/chef/orders' exact component={Orders} />
    </Switch>
  );

  return <DashboardLayout listItems={ChefListItems} routes={routes} />;
}

function DeliveryLayout() {
  const routes = (
    <Switch>
      <Redirect exact from='/delivery' to='/delivery/dashboard' />
      <Route path='/delivery/dashboard' exact component={DelivDashboard} />
      <Route path='/delivery/deliveries' exact component={Deliveries} />
    </Switch>
  );

  return <DashboardLayout listItems={DelivListItems} routes={routes} />;
}
