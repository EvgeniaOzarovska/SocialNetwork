import merge from 'classnames';
import styles from './Input.module.scss';

export const Input = props => {
  return <input type="text" {...props} className={merge(styles.input, props.className)} />;
};
