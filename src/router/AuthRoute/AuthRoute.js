import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { history, ROUTES } from 'router';

export const AuthRoute = props => {
  useEffect(() => {
    if (props.myUserInfo) {
      history.push(ROUTES.Private.Posts);
    }
  }, []);

  if (props.myUserInfo) {
    return null;
  }

  return <Route {...props} />;
};
