import merge from 'classnames';
import styles from './Avatar.module.scss';

export const Avatar = props => {
  return <img alt="avatar" {...props} className={merge(styles.avatar, props.className)} />;
};
