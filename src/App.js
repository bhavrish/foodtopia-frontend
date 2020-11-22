import React from 'react';
import './App.css';
import {SignUp, SignIn} from './layouts/Auth';
import {Nav} from './components';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path="/manager" component={ManagerLayout}/>
          <Route path="/customer" component={CustomerLayout}/>
          <Route path="/auth" component={AuthLayout} />
          <Route path="/menus" component={menus} />
          <Route path="/" component={home} />
        </Switch>
      </div>
    </Router>
  );
}

function AuthLayout() {
  return (
      <Switch>
          <Redirect exact from="/auth" to="/auth/signin"/>
          <Route path="/auth/signup" exact component={SignUp} />
          <Route path="/auth/signin" exact component={SignIn} />
      </Switch>
  );
}

const home = () =>{
  return (
    <div>
      <Nav/>
      <h1> This is home page</h1>
    </div>
  );
}

const menus = () =>{
  return (
    <div>
      <h1> This is menus page </h1>
    </div>
  );
}

function CustomerLayout() {
  return(
      <Switch>
          <Redirect exact from="/Customer" to="/Customer/dashboard"/>
          <Route path="/Customer/profile" exact component={Profile}/>
          <Route path="/Customer/dashboard" exact component={Dashboard}/>
      </Switch>
  );
}

function ManagerLayout() {
  return(
      <Switch>
          <Redirect exact from="/manager" to="/manager/dashboard"/>
          <Route path="/manager/profile" exact component={Profile}/>
          <Route path="/manager/dashboard" exact component={Dashboard}/>
      </Switch>
  );
}

const Profile = () =>{
  return (
    <h1> This is user profile</h1>
  );
}
const Dashboard = () =>{
  return (
    <h1> This is dashboard</h1>
  );
}