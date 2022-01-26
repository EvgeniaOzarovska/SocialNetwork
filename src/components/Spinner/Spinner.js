import merge from 'classnames';
import styles from './Spinner.module.scss';

export const Spinner = ({ color = 'white', size = 'medium', ...props }) => (
  <div {...props} className={merge(styles.spinner, styles[color], styles[size], props.className)} />
);
