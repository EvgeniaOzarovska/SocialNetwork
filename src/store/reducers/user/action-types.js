export const UserActionTypes = {
  REGISTER_USER: {
    START: 'user|registerUser:start',
    SUCCESS: 'user|registerUser:success',
    FAIL: 'user|registerUser:fail',
  },
  LOGIN_USER: {
    START: 'user|loginUser:start',
    SUCCESS: 'user|loginUser:success',
    FAIL: 'user|loginUser:fail',
  },
  LOGOUT_USER: 'user|logoutUser',
  UPDATE_USER_INFO: {
    START: 'user|updateUserInfo:start',
    SUCCESS: 'user|updateUserInfo:success',
    FAIL: 'user|updateUserInfo:fail',
  },
  FETCH_MY_USER_INFO: {
    START: 'user|fetchMyUserInfo:start',
    SUCCESS: 'user|fetchMyUserInfo:success',
    FAIL: 'user|fetchMyUserInfo:fail',
  },
  FETCH_ALL_USERS: {
    START: 'user|fetchAllUsers:start',
    SUCCESS: 'user|fetchAllUsers:success',
    FAIL: 'user|fetchAllUsers:fail',
  },
  FETCH_TARGET_USER_INFO: {
    START: 'user|fetchTargetUserInfo:start',
    SUCCESS: 'user|fetchTargetUserInfo:success',
    FAIL: 'user|fetchTargetUserInfo:fail',
  },
  CHANGE_USER_PASSWORD: {
    START: 'user|changeUserPassword:start',
    SUCCESS: 'user|changeUserPassword:success',
    FAIL: 'user|changeUserPassword:fail',
  },
  TOGGLE_FOLLOW: {
    START: 'user|toggleFollow:start',
    SUCCESS: 'user|toggleFollow:success',
    FAIL: 'user|toggleFollow:fail',
  },
  UPDATE_PROFILE_PHOTO: {
    START: 'user|updateProfilePhoto:start',
    SUCCESS: 'user|updateProfilePhoto:success',
    FAIL: 'user|updateProfilePhoto:fail',
  },
};
