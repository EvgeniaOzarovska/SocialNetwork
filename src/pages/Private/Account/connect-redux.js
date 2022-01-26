import { connect } from 'react-redux';
import { selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { logoutUser } from 'store/reducers/user/actions';
import { selectMyUserInfo } from 'store/reducers/user/selectors';
import { PostActionTypes } from 'store/reducers/post/action-types';
import { fetchMyPosts } from 'store/reducers/post/actions';
import { selectAllPosts } from 'store/reducers/post/selectors';
import { AccountPage } from './AccountPage';

const mapStateToProps = state => ({
  fetchingMyPostsInProgress: selectRequestStatus(state, PostActionTypes.FETCH_MY_POSTS),
  myUserInfo: selectMyUserInfo(state),
  myPosts: selectAllPosts(state),
});

const mapActionsToProps = { fetchMyPosts, logoutUser };

export const AccountPageWithRedux = connect(mapStateToProps, mapActionsToProps)(AccountPage);
