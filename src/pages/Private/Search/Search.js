import { Page } from 'components/Page';
import style from './Search.module.scss';
import { Button } from 'components/Button';
import styles from 'pages/Private/EditProfile/EditProfilePage.module.scss';
import { Spinner } from 'components/Spinner';
import { useEffect } from 'react';
import { remoteImageURL } from 'helpers';
import { Avatar } from 'components/Avatar';
import { BottomNavigation } from 'components/BottomNavigation';

// TODO: not completed yet!!! please finish this page.
export const Search = props => {
  useEffect(() => {
    props.fetchMyUserInfo();
    props.fetchAllUsers();
  }, []);

  if (props.fetchingAllUsersInProgress || props.fetchingMyUserInfoInProgress) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size="big" color="white" />
      </div>
    );
  }

  const toggleFollow = userId => {
    props.toggleFollow(userId);
    props.fetchMyUserInfo();
    props.fetchAllUsers();
  };

  const renderUsers = () => {
    if (!props.allUsers || !props.myUserInfo) return;
    const filteredUsers = props.allUsers.filter(user => user.login !== null);
    return filteredUsers.map((user, index) => {
      return (
        <div className={style.follow_block} key={index}>
          <div className={style.blocks}>
            <Avatar
              src={
                user.avatar?.url
                  ? remoteImageURL(user.avatar.url)
                  : '/assets/images/avatar_placeholder.png'
              }
            />
            <span>{user.nick || user.login}</span>

            {props.myUserInfo.following !== null ? (
              props.myUserInfo.following.filter(followingUser => followingUser._id === user._id)
                .length > 0 ? (
                <Button
                  colorSchema={'mini'}
                  onClick={() => {
                    toggleFollow(user._id);
                  }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  colorSchema={'mini'}
                  onClick={() => {
                    toggleFollow(user._id);
                  }}
                >
                  Follow
                </Button>
              )
            ) : (
              <Button
                colorSchema={'mini'}
                onClick={() => {
                  toggleFollow(user._id);
                }}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <Page>
      <div className={style.section}>
        <header className={style.header}>
          <h2>Hipstagramm</h2>
        </header>
        <div className={style.block_search}>
        <input className={style.searchInput} type="text" placeholder="Search" />
        <button className={style.btn}>Search</button>
      </div>
      </div>
      <div className={style.userListContainer}>{renderUsers()}</div>

      <BottomNavigation />
    </Page>
  );
};
