import { Provider } from 'react-redux';
import { Router as ReactRouter } from 'react-router-dom';
import { store } from 'store';
import { history, Router } from 'router';
import { Background } from 'components/Background';
import 'styles/reset.scss';
import 'styles/global.scss';

export const App = () => (
  <Provider store={store}>
    <ReactRouter history={history}>
      <Background>
        <Router />
      </Background>
    </ReactRouter>
  </Provider>
);
