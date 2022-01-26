import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { remoteImageURL } from 'helpers';
import { ROUTES } from 'router';
import { Avatar } from 'components/Avatar';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { Page } from 'components/Page';
import { Spinner } from 'components/Spinner';
import styles from './EditProfilePage.module.scss';

export const EditProfilePage = props => {
  useEffect(() => {
    props.fetchMyUserInfo();
  }, []);

  const imageFileInput = useRef(null);
  const [nick, setNick] = useState(props.myUserInfo.nick || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');

  useEffect(() => {
    // After the password was change - reset all the fields
    if (props.changingUserPasswordInProgress === false) {
      setCurrentPassword('');
      setNewPassword('');
      setNewConfirmPassword('');
      setShowPasswords(false);
      setNewPasswordError('');
    }
  }, [props.changingUserPasswordInProgress]);

  if (
    props.fetchingMyUserInfoInProgress ||
    props.updatingProfilePhotoInProgress ||
    props.updatingUserInfoInProgress ||
    props.changingUserPasswordInProgress
  ) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size="big" color="white" />
      </div>
    );
  }

  return (
    <Page className={styles.container}>
      <header className={styles.header}>
        <Link to={ROUTES.Private.Account}>
          <Icon bordered name="arrow_back.svg" />
        </Link>
        <span>Edit Profile</span>
      </header>

      <div className={styles.avaSection}>
        <Avatar
          src={
            props.myUserInfo.avatar?.url
              ? remoteImageURL(props.myUserInfo.avatar.url)
              : '/assets/images/avatar_placeholder.png'
          }
        />

        <div className={styles.changeAva} onClick={() => imageFileInput.current?.click()}>
          Change profile photo
        </div>
        <input
          type="file"
          accept="image/*"
          ref={imageFileInput}
          onChange={event => props.updateProfilePhoto(event.target.files[0])}
          className={styles.imageInput}
        />
      </div>

      <form
        onSubmit={event => {
          event.preventDefault();
          props.updateUserInfo({ _id: props.myUserInfo._id, nick });
        }}
      >
        <Input
          placeholder="Nick"
          value={nick}
          onChange={event => setNick(event.target.value.replace(/ +/g, ''))}
        />
        <Button
          type="submit"
          colorSchema="outlined"
          disabled={!(nick && nick !== props.myUserInfo.nick)}
        >
          Edit Profile
        </Button>
      </form>

      <form
        className={styles.formChangePassword}
        onSubmit={event => {
          event.preventDefault();

          if (newPassword !== newConfirmPassword) {
            setNewPasswordError('Passwords do not match!');
          } else {
            setNewPasswordError('');
            props.changeUserPassword(props.myUserInfo.login, currentPassword, newPassword);
          }
        }}
      >
        <Input
          type="password"
          placeholder="Your Password"
          value={currentPassword}
          onChange={event => setCurrentPassword(event.target.value)}
        />
        <div className={styles.input_icon}>
          <Input
            type={showPasswords ? 'text' : 'password'}
            placeholder="Password"
            onChange={event => setNewPassword(event.target.value)}
          />

          <span onClick={() => setShowPasswords(!showPasswords)}>
            <Icon name={showPasswords ? 'icon_visibility_off.svg' : 'icon_visibility_on.svg'} />
          </span>
        </div>
        <Input
          type={showPasswords ? 'text' : 'password'}
          placeholder="Confirm New Password"
          onChange={event => setNewConfirmPassword(event.target.value)}
        />

        <div className={styles.newPasswordError}>{newPasswordError}</div>

        <Button
          type="submit"
          colorSchema="outlined"
          disabled={!(currentPassword && newPassword && newConfirmPassword)}
        >
          Change Password
        </Button>
      </form>
    </Page>
  );
};
