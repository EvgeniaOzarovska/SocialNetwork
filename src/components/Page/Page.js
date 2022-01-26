import merge from 'classnames';
import styles from './Page.module.scss';

export const Page = props => (
  <div {...props} className={merge(styles.container, props.className)}>
    {props.children}
  </div>
);
