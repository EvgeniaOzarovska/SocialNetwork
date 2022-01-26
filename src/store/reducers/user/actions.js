import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Axios } from 'helpers';
import { store } from 'store';
import { uploadImage } from 'store/reducers/api-requests/actions';
import { history, ROUTES } from 'router';
import { AUTH_TOKEN_KEY, BACKEND_BASE_URL } from 'variables';
import { requestWrapper } from 'helpers/requestWrapper';
import { UserActionTypes } from './action-types';

export const registerUser = (login, password) => {
  return async dispatch => {
    // Mark registration request as in progress
    dispatch({ type: UserActionTypes.REGISTER_USER.START });

    try {
      // Call backend API to register a user
      await requestWrapper(
        Axios.post('/graphql', {
          query: `mutation CreateNewUser($userLogin: String!, $userPassword: String!){
            createUser(login: $userLogin, password: $userPassword) { _id login }
          }`,
          variables: { userLogin: login, userPassword: password },
        }),
      );

      // Mark registration request as successful
      dispatch({ type: UserActionTypes.REGISTER_USER.SUCCESS });

      // Redirect to Login page
      history.push(ROUTES.Auth.Login);
    } catch (error) {
      // Mark registration request as failed
      dispatch({ type: UserActionTypes.REGISTER_USER.FAIL, error });
    }
  };
};

export const loginUser = (login, password) => {
  return async dispatch => {
    // Mark login request as in progress
    dispatch({ type: UserActionTypes.LOGIN_USER.START });

    try {
      // Call backend API to log in a user
      const response = await requestWrapper(
        Axios.post('/graphql', {
          query: `query loginUser($login: String!, $password: String!) {
            login(login: $login, password: $password)
          }`,
          variables: { login, password },
        }),
      );

      const authToken = response.data.data.login;
      if (!authToken) {
        // Mark login request as failed
        dispatch({ type: UserActionTypes.LOGIN_USER.FAIL, error: {} });
        return;
      }

      // Save access token to browser local storage
      localStorage.setItem(AUTH_TOKEN_KEY, authToken);

      // Fetch my user info
      await dispatch(fetchMyUserInfo());

      // Mark login request as successful
      dispatch({ type: UserActionTypes.LOGIN_USER.SUCCESS });

      // Redirect to Home page
      history.push(ROUTES.Private.Posts);
    } catch (error) {
      // Mark login request as failed
      dispatch({ type: UserActionTypes.LOGIN_USER.FAIL, error });
    }
  };
};

export const logoutUser = () => {
  return dispatch => {
    // Clear browser local storage
    localStorage.clear();

    // Dispatch logout action to reset redux
    dispatch({ type: UserActionTypes.LOGOUT_USER });

    // Redirect to Login page
    history.push(ROUTES.Auth.Login);
  };
};

export const updateUserInfo = user => {
  return async dispatch => {
    dispatch({ type: UserActionTypes.UPDATE_USER_INFO.START });

    try {
      await requestWrapper(
        Axios.post('/graphql', {
          query: `mutation updateUser($user: UserInput!) {
            UserUpsert(user: $user) {
            _id createdAt login nick avatar { _id url }
            followers { _id nick login avatar { _id url }}
            following { _id nick login avatar { _id url }}
            }
          }`,
          variables: { user },
        }),
      );

      await dispatch(fetchMyUserInfo());

      dispatch({ type: UserActionTypes.UPDATE_USER_INFO.SUCCESS });
    } catch (error) {
      dispatch({ type: UserActionTypes.UPDATE_USER_INFO.FAIL, error });
    }
  };
};

export const toggleFollow = targetUserId => {
  return async dispatch => {
    dispatch({ type: UserActionTypes.TOGGLE_FOLLOW.START });
    try {
      const myUserInfo = store.getState().user.myUserInfo;

      const targetUser = myUserInfo.following.find(user => user._id === targetUserId);

      let newFollowing = myUserInfo.following.map(user => {
        return { _id: user._id };
      });

      if (targetUser) {
        newFollowing = newFollowing.filter(user => user._id !== targetUserId);
        dispatch({ type: UserActionTypes.TOGGLE_FOLLOW.SUCCESS, payload: targetUserId });
      } else {
        newFollowing.push({ _id: targetUserId });
        dispatch({ type: UserActionTypes.TOGGLE_FOLLOW.SUCCESS });
      }

      await requestWrapper(
        Axios.post('/graphql', {
          query: `mutation updateUser($user: UserInput!) {
            UserUpsert(user: $user) {
            _id createdAt login nick avatar { _id url }
            followers { _id nick login avatar { _id url }}
            following { _id nick login avatar { _id url }}
            }
          }`,
          variables: {
            user: { _id: myUserInfo._id, following: newFollowing },
          },
        }),
      );
    } catch (error) {
      dispatch({ type: UserActionTypes.TOGGLE_FOLLOW.FAIL, error });
    }
  };
};

export const fetchTargetUserInfo = userId => {
  return async dispatch => {
    // Mark fetching target user info as in progress
    dispatch({ type: UserActionTypes.FETCH_TARGET_USER_INFO.START });

    try {
      // Fetch target user info by their ID
      const response = await requestWrapper(
        Axios.post('/graphql', {
          query: `query GetUserById($_id: String) {
            UserFindOne(query: $_id) {
              _id createdAt login nick avatar { _id url }
              followers { _id createdAt login nick avatar { _id url }}
              following { _id createdAt login nick avatar { _id url }}
            }
          }`,
          variables: { _id: JSON.stringify([{ _id: userId }]) },
        }),
      );

      // Mark fetching target user info as successful
      dispatch({
        type: UserActionTypes.FETCH_TARGET_USER_INFO.SUCCESS,
        payload: response.data.data.UserFindOne,
      });
    } catch (error) {
      // Mark fetching target user info as failed
      dispatch({ type: UserActionTypes.FETCH_TARGET_USER_INFO.FAIL, error });
    }
  };
};

export const fetchAllUsers = () => {
  return async dispatch => {
    dispatch({ type: UserActionTypes.FETCH_ALL_USERS.START });
    try {
      const response = await requestWrapper(
        Axios.post('/graphql', {
          query: `query GetAllUsers($params: String){
           UserFind(query:$params){
              _id createdAt login nick avatar { _id url }
              followers { _id createdAt login nick avatar { _id url }}
              following { _id createdAt login nick avatar { _id url }}
              }
           }`,
          variables: { params: JSON.stringify([{}, { sort: [{ _id: -1 }] }]) },
        }),
      );
      dispatch({
        type: UserActionTypes.FETCH_ALL_USERS.SUCCESS,
        payload: response.data.data.UserFind,
      });
    } catch (error) {
      dispatch({ type: UserActionTypes.FETCH_ALL_USERS.FAIL, error });
    }
  };
};

export const fetchMyUserInfo = () => {
  return async dispatch => {
    // Mark fetching my user info as in progress
    dispatch({ type: UserActionTypes.FETCH_MY_USER_INFO.START });

    try {
      // Get my access token from browser local storage
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      // Try to decode it to get my user ID
      const decoded_token = jwt_decode(token);

      // Get my user ID from decoded access token
      const userId = decoded_token.sub.id;

      // Get my user info by my ID
      const response = await requestWrapper(
        Axios.post('/graphql', {
          query: `query GetUserById($_id: String) {
            UserFindOne(query: $_id) {
              _id createdAt login nick avatar { _id url }
              followers { _id createdAt login nick avatar { _id url }}
              following { _id createdAt login nick avatar { _id url }}
            }
          }`,
          variables: { _id: JSON.stringify([{ _id: userId }]) },
        }),
      );

      // Mark fetching my user info as successful
      dispatch({
        type: UserActionTypes.FETCH_MY_USER_INFO.SUCCESS,
        payload: response.data.data.UserFindOne,
      });
    } catch (error) {
      // Clear browser local storage to remove invalid or expired access token if it is there
      localStorage.clear();

      // Mark fetching my user info as failed
      dispatch({ type: UserActionTypes.FETCH_MY_USER_INFO.FAIL, error });
    }
  };
};

export const changeUserPassword = (login, password, newPassword) => {
  return async dispatch => {
    // Mark change user password request as in progress
    dispatch({ type: UserActionTypes.CHANGE_USER_PASSWORD.START });

    try {
      await requestWrapper(
        axios.post(
          `${BACKEND_BASE_URL}graphql`,
          {
            query: `mutation changePassword($login: String!, $password: String!, $newPassword: String!) {
              changePassword(login: $login, password: $password, newPassword: $newPassword) {
                _id login
              }
            }`,
            variables: { login, password, newPassword },
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Accept: 'application/json',
            },
          },
        ),
      );

      // Mark change user password request as successful
      dispatch({ type: UserActionTypes.CHANGE_USER_PASSWORD.SUCCESS });
    } catch (error) {
      // Mark change user password request as failed
      dispatch({ type: UserActionTypes.CHANGE_USER_PASSWORD.FAIL, error });
    }
  };
};

export const updateProfilePhoto = profilePhoto => {
  return async dispatch => {
    // Mark update profile photo request as in progress
    dispatch({ type: UserActionTypes.UPDATE_PROFILE_PHOTO.START });

    try {
      // Upload image to server
      const uploadPhotoResponse = await uploadImage(profilePhoto);

      // Get my user ID from the store
      const myUserID = store.getState().user.myUserInfo._id;

      // Update my user info on the server
      await dispatch(
        updateUserInfo({
          _id: myUserID,
          avatar: { _id: uploadPhotoResponse.data._id },
        }),
      );

      // Mark update profile photo request as successful
      dispatch({ type: UserActionTypes.UPDATE_PROFILE_PHOTO.SUCCESS });
    } catch (error) {
      // Mark update profile photo request as failed
      dispatch({ type: UserActionTypes.UPDATE_PROFILE_PHOTO.FAIL, error });
    }
  };
};
