import { connect } from 'react-redux';

import { selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { PostActionTypes } from 'store/reducers/post/action-types';
import { fetchMyFeed } from 'store/reducers/post/actions';
import { selectAllPosts } from 'store/reducers/post/selectors';

import { Posts } from './Posts';

const mapStateToProps = state => ({
  loadingPostsInProgress: selectRequestStatus(state, PostActionTypes.FETCH_MY_FEED),
  posts: selectAllPosts(state),
});

const mapActionsToProps = { fetchMyFeed };

export const PostsWithRedux = connect(mapStateToProps, mapActionsToProps)(Posts);
