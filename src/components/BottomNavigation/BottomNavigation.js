import { Link } from 'react-router-dom';
import { ROUTES } from 'router';
import { Icon } from 'components/Icon';
import styles from './BottomNavigation.module.scss';

export const BottomNavigation = () => (
  <footer className={styles.footer}>
    <Link to={ROUTES.Private.Posts}>
      <Icon bordered name="list_alt.svg" />
    </Link>
    <Link to={ROUTES.Private.CreatePost}>
      <Icon bordered name="add_to_photos.svg" />
    </Link>
    <Link to={ROUTES.Private.SearchPosts}>
      <Icon bordered name="search.svg" />
    </Link>
    <Link to={ROUTES.Private.Account}>
      <Icon bordered name="home.svg" />
    </Link>
  </footer>
);
