import { UserActionTypes } from './action-types';

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGOUT_USER:
      return { ...initialState, myUserInfo: null };

    case UserActionTypes.FETCH_MY_USER_INFO.SUCCESS:
      return { ...state, myUserInfo: action.payload };

    case UserActionTypes.FETCH_MY_USER_INFO.FAIL:
      return { ...state, myUserInfo: null };

    case UserActionTypes.FETCH_ALL_USERS.SUCCESS:
      return { ...state, allUsers: action.payload };

    case UserActionTypes.FETCH_ALL_USERS.FAIL:
      return { ...state, allUsers: null };

    case UserActionTypes.FETCH_TARGET_USER_INFO.SUCCESS:
      return { ...state, targetUserInfo: action.payload };

    case UserActionTypes.TOGGLE_FOLLOW.SUCCESS:
      if (action.payload) {
        return {
          ...state,
          myUserInfo: {
            ...state.myUserInfo,
            following: state.myUserInfo.following.filter(user => user._id !== action.payload),
          },
        };
      } else {
        return {
          ...state,
          myUserInfo: {
            ...state.myUserInfo,
            following: [...state.myUserInfo.following, state.targetUserInfo],
          },
        };
      }

    default:
      return state;
  }
};
