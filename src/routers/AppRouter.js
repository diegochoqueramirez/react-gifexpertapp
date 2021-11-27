import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { login } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadNotes } from '../actions/notes';

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [logged, setLogged] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setLogged(true);
        dispatch(startLoadNotes(user.uid));
      } else {
        setLogged(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setLogged]);

  if (checking) {
    return <h1>Wait...</h1>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute logged={logged} path='/auth' component={AuthRouter} />
          <PrivateRoute
            logged={logged}
            exact
            path='/'
            component={JournalScreen}
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
