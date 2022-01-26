import { useState } from 'react';
import { Link } from 'react-router-dom';
import merge from 'classnames';
import { ROUTES } from 'router/routes';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { LogoText } from 'components/LogoText';
import { Spinner } from 'components/Spinner';
import styles from './LoginPage.module.scss';

export const LoginPage = props => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={merge(styles.container, 'fancy-gradient')}>
      <form
        className={styles.form}
        onSubmit={event => {
          event.preventDefault();
          props.loginUser(login, password);
        }}
      >
        <LogoText />

        <Input
          placeholder="Username"
          value={login}
          onChange={event => setLogin(event.target.value)}
          disabled={props.loginInProgress}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          disabled={props.loginInProgress}
        />

        {props.loginError && (
          <div className={styles.errorMessage}>Account details are not recognized!</div>
        )}

        <Button
          type="submit"
          colorSchema="solid"
          disabled={!(login && password) || props.loginInProgress}
        >
          {props.loginInProgress ? <Spinner size="small" /> : 'Log In'}
        </Button>
      </form>

      <section>
        <p>Don't have an account?</p>
        <Link to={ROUTES.Auth.Register}>Sign Up</Link>
      </section>
    </div>
  );
};
