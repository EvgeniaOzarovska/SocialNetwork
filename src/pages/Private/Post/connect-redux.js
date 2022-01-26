import { connect } from 'react-redux';

import { selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { UserActionTypes } from 'store/reducers/user/action-types';

import { Post } from 'pages/Private/Post/Post';
import { createNewPostComment, fetchPostById } from 'store/reducers/post/actions';
import { selectTargetPost } from 'store/reducers/post/selectors';

const mapStateToProps = state => ({
  selectedPost: selectTargetPost(state),
  updateUserData: selectRequestStatus(state, UserActionTypes.UPDATE_USER_INFO),
});

const mapActionsToProps = { fetchPostById, createNewPostComment };

export const PostWithRedux = connect(mapStateToProps, mapActionsToProps)(Post);
