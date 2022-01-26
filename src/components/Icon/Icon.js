import merge from 'classnames';
import styles from './Icon.module.scss';

export const Icon = ({ name, bordered = false, ...props }) => (
  <img
    alt={name}
    {...props}
    src={`/assets/icons/${name}`}
    className={merge({ [styles.bordered]: bordered }, props.className)}
  />
);
