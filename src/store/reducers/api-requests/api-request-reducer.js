import { UserActionTypes } from 'store/reducers/user/action-types';

export const initialState = {
  inProgress: {},
  errors: {},
};

export const apiRequestsReducer = (state = initialState, action) => {
  // Reset state on user logout
  if (action.type === UserActionTypes.LOGOUT_USER) return initialState;

  // Separate request name from its status
  const [requestName, requestStatus] = action.type.split(':');

  // Do something depending on the request status
  switch (requestStatus) {
    case 'start': {
      // Copy all requests statuses from the state
      const inProgress = { ...state.inProgress };
      // Mark current request as in progress
      inProgress[requestName] = true;

      // Copy all errors from the state
      const errors = { ...state.errors };
      // Delete error for current request
      delete errors[requestName];

      // Return new state
      return { inProgress, errors };
    }

    case 'success': {
      // Copy all requests statuses from the state
      const inProgress = { ...state.inProgress };
      // Delete current request status = unmark it as in progress
      delete inProgress[requestName];

      // Copy all errors from the state
      const errors = { ...state.errors };
      // Delete error for current request
      delete errors[requestName];

      // Return new state
      return { inProgress, errors };
    }

    case 'fail': {
      // Copy all requests statuses from the state
      const inProgress = { ...state.inProgress };
      // Delete current request status = unmark it as in progress
      delete inProgress[requestName];

      // Copy all errors from the state
      const errors = { ...state.errors };
      // Add current request error to the list of all error
      errors[requestName] = action.error;

      // Return new state
      return { inProgress, errors };
    }

    default:
      return state;
  }
};
