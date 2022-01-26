import { Axios } from 'helpers';
import { store } from 'store';
import { history, ROUTES } from 'router';
import { requestWrapper } from 'helpers';
import { uploadImages } from 'store/reducers/api-requests/actions';
import * as UserActions from 'store/reducers/user/actions';
import { PostActionTypes } from './action-types';

export const fetchAllPosts = (skip = 0, limit = 99) => {
  return async dispatch => {
    // Mark fetching all posts as in progress
    dispatch({ type: PostActionTypes.FETCH_ALL_POSTS.START });

    try {
      // Fetch all posts
      const response = await requestWrapper(
        Axios.post('/graphql', {
          query: `query PostFind($params: String!) {
            PostFind(query: $params) {
            _id createdAt title text images { _id url } comments { _id text createdAt
            answers { _id text createdAt answers { _id } answerTo { _id }
            post { _id } likesCount owner { _id nick login avatar { _id url }}}
            answerTo { _id text createdAt answers { _id } answerTo { _id }
            post { _id } likesCount owner { _id nick login avatar { _id url }}}
            post { _id } likesCount owner { _id nick login avatar { _id url }}}}}`,
          variables: {
            params: JSON.stringify([{}, { sort: [{ _id: -1 }], skip: [skip], limit: [limit] }]),
          },
        }),
      );

      // Mark fetching all posts as successful
      dispatch({
        type: PostActionTypes.FETCH_ALL_POSTS.SUCCESS,
        payload: response.data.data.PostFind,
      });
    } catch (error) {
      // Mark fetching all posts as failed
      dispatch({ type: PostActionTypes.FETCH_ALL_POSTS.FAIL, error });
    }
  };
};

export const fetchPostById = postId => {
  return async dispatch => {
    // Mark fetching post by its ID as in progress
    dispatch({ type: PostActionTypes.FETCH_POST_BY_ID.START });

    try {
      // Fetch post by its ID
      const response = await requestWrapper(
        Axios.post('/graphql', {
          query: `query PostFindOne($params: String!) {
            PostFind(query: $params) {
            _id createdAt title text images { _id url } owner {_id nick login avatar { _id url }}
            comments { _id text createdAt answers { _id text createdAt answers { _id }
            answerTo { _id } post { _id } likesCount owner { _id nick login avatar { _id url }}}
            answerTo { _id text createdAt answers { _id } answerTo { _id }
            post { _id } likesCount owner { _id nick login avatar { _id url }}}
            post { _id } likesCount owner { _id nick login avatar { _id url }}}}}`,
          variables: {
            params: JSON.stringify([{ _id: postId }]),
          },
        }),
      );

      // Mark fetching post by its ID as successful
      dispatch({
        type: PostActionTypes.FETCH_POST_BY_ID.SUCCESS,
        payload: response.data.data.PostFind[0],
      });
    } catch (error) {
      // Mark fetching post by its ID as failed
      dispatch({ type: PostActionTypes.FETCH_POST_BY_ID.FAIL, error });
    }
  };
};

export const createNewPostComment = (postId, text) => {
  return async dispatch => {
    dispatch({ type: PostActionTypes.CREATE_NEW_POST_COMMENT.START });

    try {
      await Axios.post('/graphql', {
        query: `mutation CreateComment($comment:CommentInput) { CommentUpsert(comment:$comment) { _id }}`,
        variables: {
          comment: { text, post: { _id: postId } },
        },
      });

      dispatch({ type: PostActionTypes.CREATE_NEW_POST_COMMENT.SUCCESS });
    } catch (error) {
      dispatch({ type: PostActionTypes.CREATE_NEW_POST_COMMENT.FAIL, error });
      console.log(error);
    }
  };
};

export const createNewPost = (images, text) => {
  return async dispatch => {
    dispatch({ type: PostActionTypes.CREATE_NEW_POST.START });

    try {
      const result = await uploadImages(images);
      const imagesIds = result.map(imageResponse => {
        return { _id: imageResponse.data._id };
      });

      await Axios.post('/graphql', {
        query: `mutation CreatePost($post:PostInput) { PostUpsert(post:$post) { _id }}`,
        variables: {
          post: { text: text, images: imagesIds },
        },
      });

      dispatch({ type: PostActionTypes.CREATE_NEW_POST.SUCCESS });
      history.push(ROUTES.Private.Posts);
    } catch (error) {
      dispatch({ type: PostActionTypes.CREATE_NEW_POST.FAIL, error });
      console.log(error);
    }
  };
};

export const fetchMyPosts = () => {
  return async dispatch => {
    // Mark fetching only my posts as in progress
    dispatch({ type: PostActionTypes.FETCH_MY_POSTS.START });

    try {
      // Fetch my user info to have up-to-date data
      await dispatch(UserActions.fetchMyUserInfo());

      // Get my user ID from the store
      const myUserId = store.getState().user.myUserInfo._id;

      // Fetch posts of target IDs
      await dispatch(fetchPostsByOwnerIds([myUserId]));

      // Mark fetching only my posts as successful
      dispatch({ type: PostActionTypes.FETCH_MY_POSTS.SUCCESS });
    } catch (error) {
      // Mark fetching only my posts as failed
      dispatch({ type: PostActionTypes.FETCH_MY_POSTS.FAIL, error });
    }
  };
};

export const fetchMyFeed = () => {
  return async dispatch => {
    // Mark fetching my feed as in progress
    dispatch({ type: PostActionTypes.FETCH_MY_FEED.START });

    try {
      // Fetch my user info to refresh list of people I follow
      await dispatch(UserActions.fetchMyUserInfo());

      // Get list of IDs of people I follow
      const myUserInfo = store.getState().user.myUserInfo;
      const targetIDs = myUserInfo.following ? myUserInfo.following.map(user => user._id) : [];

      // Add my ID to the list of people IDs so my posts will also appear
      targetIDs.push(myUserInfo._id);

      // Fetch posts of target IDs
      await dispatch(fetchPostsByOwnerIds(targetIDs));

      // Mark fetching my feed as successful
      dispatch({ type: PostActionTypes.FETCH_MY_FEED.SUCCESS });
    } catch (error) {
      // Mark fetching my feed as failed
      dispatch({ type: PostActionTypes.FETCH_MY_FEED.FAIL, error });
    }
  };
};

export const fetchPostsByOwnerIds = (ownerIDs, skip = 0, limit = 99) => {
  return async dispatch => {
    // Mark fetching posts by owner IDs as in progress
    dispatch({ type: PostActionTypes.FETCH_POSTS_BY_OWNER_IDS.START });

    try {
      // Fetch posts by provided owner IDs
      const response = await requestWrapper(
        Axios.post('/graphql', {
          query: `query PostFind($params: String!) {
            PostFind(query: $params) {
            _id createdAt title text images { _id url } owner {_id nick login avatar { _id url }}
            comments { _id text createdAt answers { _id text createdAt answers { _id }
            answerTo { _id } post { _id } likesCount owner { _id nick login avatar { _id url }}}
            answerTo { _id text createdAt answers { _id } answerTo { _id }
            post { _id } likesCount owner { _id nick login avatar { _id url }}}
            post { _id } likesCount owner { _id nick login avatar { _id url }}}}}`,
          variables: {
            params: JSON.stringify([
              { ___owner: { $in: ownerIDs } },
              { sort: [{ _id: -1 }], skip: [skip], limit: [limit] },
            ]),
          },
        }),
      );

      // Mark fetching posts by owner IDs as successful
      dispatch({
        type: PostActionTypes.FETCH_POSTS_BY_OWNER_IDS.SUCCESS,
        payload: response.data.data.PostFind,
      });
    } catch (error) {
      // Mark fetching posts by owner IDs as failed
      dispatch({ type: PostActionTypes.FETCH_POSTS_BY_OWNER_IDS.FAIL, error });
    }
  };
};
