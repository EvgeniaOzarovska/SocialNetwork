import { useEffect } from 'react';
import { history, ROUTES } from 'router';
import { remoteImageURL } from 'helpers';
import { BottomNavigation } from 'components/BottomNavigation';
import { Page } from 'components/Page';
import { Spinner } from 'components/Spinner';
import { Icon } from 'components/Icon';

import styles from './Posts.module.scss';


export const Posts = props => {
  useEffect(() => {
    props.fetchMyFeed();
  }, []);

  const renderPosts = () => {
    if (props.loadingPostsInProgress) {
      return (
        <div className={styles.spinnerContainer}>
          <Spinner size="big" color="black" />
        </div>
      );
    }

    if (props.posts?.length) {
      return props.posts.map(post => (
        <div
          key={post._id}
          onClick={() => history.push(ROUTES.Private.Post.replace(':postId', post._id))}
          className={styles.post}
        >
          <div className={styles.user_information}>
            <img className={styles.pic} src={remoteImageURL(post.owner.avatar.url)} alt="avatar" />
            <p className={styles.nick}>{post.owner.nick || post.owner.login}</p>
          </div>

          <div className={styles.img_section}>
            {post.images?.length > 0 ? (
              <img
                className={styles.photo_post}
                src={remoteImageURL(post.images[0].url)}
                alt="post"
              />
            ) : null}
            <p className={styles.post_text}>{post.text}</p>
          </div>

          <div className={styles.icons}>
            <Icon bordered name='like.svg' />
            <Icon bordered name='comment.svg' />
          </div>
        </div>
      ));
    }

    return <div>Sorry, you or people you follow don't have any posts</div>;
  };

  return (
    <Page>
      <div className={styles.header}>
        <h2>Hipstagramm</h2>
      </div>

      <div className={styles.post_section}>{renderPosts()}</div>

      <BottomNavigation />
    </Page>
  );
};
