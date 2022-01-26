import { UserActionTypes } from 'store/reducers/user/action-types';
import { PostActionTypes } from './action-types';

const initialState = {};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGOUT_USER:
      return initialState;

    case PostActionTypes.FETCH_POSTS_BY_OWNER_IDS.SUCCESS:
    case PostActionTypes.FETCH_ALL_POSTS.SUCCESS:
      return { ...state, allPosts: action.payload };

    case PostActionTypes.FETCH_POST_BY_ID.SUCCESS:
      return { ...state, targetPost: action.payload };

    default:
      return state;
  }
};
