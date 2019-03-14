import React, { Component } from 'react';

import {Elements, StripeProvider} from 'react-stripe-elements';
import PayInvoice from "./Component/PayInvoice";
import Home from './components/home/Home';
import Contact from './components/contact/contact';
import Signup from './components/authenicate/SignUp';
import SignIn from './components/authenicate/SignIn';
import { Route } from 'react-router-dom';

import Dummy from './components/dummy/Dummy';

// import AddInvoice from './components/AddInvoice';

/*

<StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <h1>Pay Invoice Example</h1>
          <Elements>
            <PayInvoice />
          </Elements>
        </div>
      </StripeProvider>

*/

class App extends Component {
  render() {
    return (
      <div className="App">
      <Dummy />
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={SignIn} />
      </div>
    );
  }
}

export default App;
