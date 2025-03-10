import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home';
import Signin from './containers/Signin';
import { useDispatch } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.actions';
import Signup from './containers/Signup';
import Default from './containers/Default';
import ProfilePage from './containers/Profile';
import VenuePage from './containers/Venue';
import { PaymentStatus } from './containers/PaymentStatus';

function App() {

  const dispatch = useDispatch();
  const auth = useDispatch(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/default" component={Default} />
        <PrivateRoute path="/profile/:id" component={ProfilePage} />
        <Route path="/venue/:id" component={VenuePage} />
        <Route path="/payment-status" component={PaymentStatus} />
      </Switch>
    </div>
  );
}

export default App;
