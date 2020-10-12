import React from 'react';
import './App.css';
import Nav from './Nav';
import {SignUp, SignIn} from './layouts'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/signup" component={SignUp}/>
          <Route path="/signin" component={SignIn}/>
        </Switch>
      </div>
    </Router>
  );
}

const home = () =>{
  return (
    <h1> This is home page</h1>
  );
}

export default App;
