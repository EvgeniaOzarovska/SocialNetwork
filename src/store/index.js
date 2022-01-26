import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers';

// Compose all middlewares depending on the environment
const rootMiddleware =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
    : applyMiddleware(thunk);

export const store = createStore(rootReducer, rootMiddleware);
