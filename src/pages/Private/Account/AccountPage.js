import { useEffect } from 'react';
import numeral from 'numeral';
import { history, ROUTES } from 'router';
import { remoteImageURL } from 'helpers';
import { Avatar } from 'components/Avatar';
import { Button } from 'components/Button';
import { BottomNavigation } from 'components/BottomNavigation';
import { Page } from 'components/Page';
import { Spinner } from 'components/Spinner';
import styles from './AccountPage.module.scss';
import { Icon } from 'components/Icon';

export const AccountPage = props => {
  useEffect(() => {
    props.fetchMyPosts();
  }, []);

  if (props.fetchingMyPostsInProgress) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner color="white" size="big" />
      </div>
    );
  }

  return (
    <Page>
      <div className={styles.logoutButtonContainer}>
        <div className={styles.logoutButton} onClick={props.logoutUser}>
          <Icon bordered name='logout.svg' />
        </div>
      </div>

      <section className={styles.userInformation}>
        <div className={styles.header}>
          <Avatar
            src={
              props.myUserInfo.avatar?.url
                ? remoteImageURL(props.myUserInfo.avatar.url)
                : '/assets/images/avatar_placeholder.png'
            }
          />

          <div className={styles.followersBlock}>
            <div>
              <div>
                {numeral(props.myPosts?.length || 0)
                  .format('0a')
                  .toUpperCase()}
              </div>
              <div>Posts</div>
            </div>
            <div>
              <div>
                {numeral(props.myUserInfo.followers?.length || 0)
                  .format('0a')
                  .toUpperCase()}
              </div>
              <div>Followers</div>
            </div>
            <div>
              <div>
                {numeral(props.myUserInfo.following?.length || 0)
                  .format('0a')
                  .toUpperCase()}
              </div>
              <div>Following</div>
            </div>
          </div>
        </div>

        <span className={styles.userName}>
          {props.myUserInfo.nick || props.myUserInfo.login || ''}
        </span>

        <Button colorSchema="outlined" onClick={() => history.push(ROUTES.Private.EditProfile)}>
          Edit Profile
        </Button>
      </section>

      <hr />

      {props.myPosts?.length === 0 && <div>Sorry, you don't have any posts</div>}

      <section className={styles.myPosts}>
        {props.myPosts &&
          props.myPosts.map(post => (
            <div
              key={post._id}
              className={styles.post}
              onClick={() => history.push(ROUTES.Private.Post.replace(':postId', post._id))}
            >
              <img alt="post" src={remoteImageURL(post.images[0]?.url)} className={styles.img} />
            </div>
          ))}
      </section>

      <BottomNavigation />
    </Page>
  );
};
