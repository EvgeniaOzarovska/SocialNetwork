import merge from 'classnames';
import styles from './Button.module.scss';

export const Button = ({ colorSchema = 'outlined', className, children, ...props }) => (
  <button type="button" {...props} className={merge(styles.button, className, styles[colorSchema])}>
    {children}
  </button>
);
