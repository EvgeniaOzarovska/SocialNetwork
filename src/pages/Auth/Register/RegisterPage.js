import { useState } from 'react';
import { Link } from 'react-router-dom';
import merge from 'classnames';
import { ROUTES } from 'router';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { LogoText } from 'components/LogoText';
import { Spinner } from 'components/Spinner';
import styles from './RegisterPage.module.scss';

export const RegisterPage = props => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeated, setPasswordRepeated] = useState('');

  const onRegistrationFormSubmit = event => {
    event.preventDefault();
    props.registerUser(username, password);
  };

  return (
    <div className={merge(styles.container, 'fancy-gradient')}>
      <LogoText />

      <h2>Registration Form</h2>
      <p className={styles.welcome_message}>Sign up to see photos and videos from your friends</p>

      <form className={styles.form} onSubmit={onRegistrationFormSubmit}>
        <Input
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value.replace(/ +/g, ''))}
          disabled={props.registerInProgress}
        />

        <div className={styles.input_with_icon}>
          <Input
            type={showPasswords ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            disabled={props.registerInProgress}
          />
          <span onClick={() => setShowPasswords(!showPasswords)}>
            <Icon name={showPasswords ? 'icon_visibility_off.svg' : 'icon_visibility_on.svg'} />
          </span>
        </div>

        <Input
          type={showPasswords ? 'text' : 'password'}
          placeholder="Repeat the password"
          value={passwordRepeated}
          onChange={event => setPasswordRepeated(event.target.value)}
          disabled={props.registerInProgress}
        />

        <Button
          type="submit"
          colorSchema="solid"
          disabled={
            !(username && password && password === passwordRepeated) || props.registerInProgress
          }
        >
          {props.registerInProgress ? <Spinner size="small" /> : 'Sign Up'}
        </Button>
      </form>

      <section>
        <p>Already have an account?</p>
        <Link to={ROUTES.Auth.Login}>Log In</Link>
      </section>
    </div>
  );
};
