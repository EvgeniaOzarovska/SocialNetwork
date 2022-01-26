import { combineReducers } from 'redux';
import { apiRequestsReducer } from './api-requests/api-request-reducer';
import { userReducer } from './user/user-reducer';
import { postReducer } from './post/post-reducer';

// Combine all application reducers into single
// reducer that will be exported to the store
export const rootReducer = combineReducers({
  apiRequests: apiRequestsReducer,
  user: userReducer,
  post: postReducer,
});
