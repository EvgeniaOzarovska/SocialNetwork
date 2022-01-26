import { selectAllUsers, selectMyUserInfo } from 'store/reducers/user/selectors';
import { selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { UserActionTypes } from 'store/reducers/user/action-types';
import { fetchAllUsers, fetchMyUserInfo, toggleFollow } from 'store/reducers/user/actions';
import { Search } from 'pages/Private/Search/Search';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  allUsers: selectAllUsers(state),
  myUserInfo: selectMyUserInfo(state),
  fetchingAllUsersInProgress: selectRequestStatus(state, UserActionTypes.FETCH_ALL_USERS),
  fetchingMyUserInfoInProgress: selectRequestStatus(state, UserActionTypes.FETCH_MY_USER_INFO),
});

const mapActionsToProps = {
  fetchAllUsers,
  toggleFollow,
  fetchMyUserInfo,
};

export const SearchWithRedux = connect(mapStateToProps, mapActionsToProps)(Search);
