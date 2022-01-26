import { connect } from 'react-redux';
import { selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { UserActionTypes } from 'store/reducers/user/action-types';
import {
  changeUserPassword,
  fetchMyUserInfo,
  updateProfilePhoto,
  updateUserInfo,
} from 'store/reducers/user/actions';
import { selectMyUserInfo } from 'store/reducers/user/selectors';
import { EditProfilePage } from './EditProfilePage';

const mapStateToProps = state => ({
  myUserInfo: selectMyUserInfo(state),
  fetchingMyUserInfoInProgress: selectRequestStatus(state, UserActionTypes.FETCH_MY_USER_INFO),
  updatingProfilePhotoInProgress: selectRequestStatus(state, UserActionTypes.UPDATE_PROFILE_PHOTO),
  updatingUserInfoInProgress: selectRequestStatus(state, UserActionTypes.UPDATE_USER_INFO),
  changingUserPasswordInProgress: selectRequestStatus(state, UserActionTypes.CHANGE_USER_PASSWORD),
});

const mapActionsToProps = {
  updateUserInfo,
  fetchMyUserInfo,
  changeUserPassword,
  updateProfilePhoto,
};

export const EditProfilePageWithRedux = connect(
  mapStateToProps,
  mapActionsToProps,
)(EditProfilePage);
