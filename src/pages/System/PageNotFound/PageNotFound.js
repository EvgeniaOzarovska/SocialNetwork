import { history, ROUTES } from 'router';
import { Image } from 'components/Image';
import styles from './PageNotFound.module.scss';

export const PageNotFound = () => (
  <div className={styles.background} onClick={() => history.push(ROUTES.Private.Posts)}>
    <Image name="page_not_found.png" />
  </div>
);
