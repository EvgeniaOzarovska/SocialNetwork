import { connect } from 'react-redux';
import { createNewPost } from 'store/reducers/post/actions';
import { CreatePost } from 'pages/Private/CreatePost/CreatePost';
import { selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { PostActionTypes } from 'store/reducers/post/action-types';

const mapStateToProps = state => ({
  createNewPostInProgress: selectRequestStatus(state, PostActionTypes.CREATE_NEW_POST),
});

const mapActionsToProps = { createNewPost };

export const CreatePostWithRedux = connect(mapStateToProps, mapActionsToProps)(CreatePost);
