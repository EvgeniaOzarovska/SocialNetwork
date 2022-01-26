export const PostActionTypes = {
  CREATE_NEW_POST: {
    START: 'post|createNewPost:start',
    SUCCESS: 'post|createNewPost:success',
    FAIL: 'post|createNewPost:fail',
  },
  FETCH_ALL_POSTS: {
    START: 'post|fetchAllPost:start',
    SUCCESS: 'post|fetchAllPost:success',
    FAIL: 'post|fetchAllPost:fail',
  },
  FETCH_POSTS_BY_OWNER_IDS: {
    START: 'post|fetchPostsByOwnerIds:start',
    SUCCESS: 'post|fetchPostsByOwnerIds:success',
    FAIL: 'post|fetchPostsByOwnerIds:fail',
  },
  FETCH_POST_BY_ID: {
    START: 'post|fetchPostById:start',
    SUCCESS: 'post|fetchPostById:success',
    FAIL: 'post|fetchPostById:fail',
  },
  CREATE_NEW_POST_COMMENT: {
    START: 'post|createNewPostComment:start',
    SUCCESS: 'post|createNewPostComment:success',
    FAIL: 'post|createNewPostComment:fail',
  },
  FETCH_MY_POSTS: {
    START: 'post|fetchMyPosts:start',
    SUCCESS: 'post|fetchMyPosts:success',
    FAIL: 'post|fetchMyPosts:fail',
  },
  FETCH_MY_FEED: {
    START: 'post|fetchMyFeed:start',
    SUCCESS: 'post|fetchMyFeed:success',
    FAIL: 'post|fetchMyFeed:fail',
  },
};
