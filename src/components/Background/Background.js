import { useEffect } from 'react';
import { Image } from 'components/Image';
import { Spinner } from 'components/Spinner';
import styles from './Background.module.scss';

export const Background = props => {
  useEffect(() => {
    props.fetchMyUserInfo();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Image name="frame.png" className={styles.background} />

      {props.myUserInfo === undefined ? (
        <div className={styles.spinnerContainer}>
          <Spinner size="big" color="white" />
        </div>
      ) : (
        props.children
      )}
    </div>
  );
};
