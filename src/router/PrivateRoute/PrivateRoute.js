import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { history, ROUTES } from 'router';

export const PrivateRoute = props => {
  useEffect(() => {
    if (!props.myUserInfo) {
      history.push(ROUTES.Auth.Login);
    }
  }, []);

  if (!props.myUserInfo) {
    return null;
  }

  return <Route {...props} />;
};
