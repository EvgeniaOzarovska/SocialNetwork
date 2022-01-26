import { useEffect, useState } from 'react';
import { BACKEND_BASE_URL } from 'variables';
import { history } from 'router';
import { BottomNavigation } from 'components/BottomNavigation';
import { Icon } from 'components/Icon';
import { Image } from 'components/Image';
import { Spinner } from 'components/Spinner';

import style from './Post.module.scss';
import styles from 'pages/Private/Account/AccountPage.module.scss';

export const Post = props => {
  useEffect(async () => {
    props.fetchPostById(props.match.params.postId);
  }, []);
  const [comment, setComment] = useState('');

  const sendComment = async () => {
    if (comment.length <= 0) return;
    props.createNewPostComment(props.selectedPost._id, comment);
  };

  const renderComments = () => {
    if (props.selectedPost.comments === null) return '';
    const filteredComments = props.selectedPost.comments.filter(comment => comment.owner !== null);
    return filteredComments.map((comment, index) => {
      return (
        <div className={style.users_comments} key={index}>
          {comment.owner.avatar !== null ? (
            <img
              className={style.pic}
              src={`${BACKEND_BASE_URL}${comment.owner.avatar.url}`}
              alt="user avatar"
            />
          ) : (
            <Image className={style.pic} name="avatar_placeholder.png" />
          )}
          <span>{comment.owner.nick !== null ? comment.owner.nick : comment.owner.login}</span>
          <div>{comment.text !== null ? comment.text : ''}</div>
        </div>
      );
    });
  };

  return props.selectedPost && props.selectedPost._id === props.match.params.postId ? (
    <section className={style.container}>
      <header className={style.header}>
        <a
          href="#"
          onClick={event => {
            event.preventDefault();
            history.goBack();
          }}
        >
          <Icon bordered name="arrow_back.svg" />
        </a>
        <span className={style.back}>Go Back</span>
      </header>

      <div className={style.user_info}>
        {props.selectedPost.owner.avatar !== null ? (
          <img
            className={style.pic}
            src={`${BACKEND_BASE_URL}${props.selectedPost.owner.avatar.url}`}
            alt="avatar"
          />
        ) : (
          <Image className={style.pic} name="avatar_placeholder.png" />
        )}
        <p className={style.nick}>
          {props.selectedPost.owner.nick !== null
            ? props.selectedPost.owner.nick
            : props.selectedPost.owner.login}
        </p>
      </div>
      <div className={style.img_section}>
        {props.selectedPost.images !== null ? (
          <img
            className={style.photo_post}
            src={`${BACKEND_BASE_URL}${props.selectedPost.images[0].url}`}
            alt="post"
          />
        ) : (
          <Image className={style.pic} name="image_placeholder.png" />
        )}
        <p className={style.post_text}>
          {props.selectedPost.text !== null ? props.selectedPost.text : ''}
        </p>
      </div>
      <div className={style.icons}>
        <Icon bordered name='like.svg' />
        <Icon bordered name='comment.svg'/>
      </div>
      <div className={style.title_block}>
        <span>Comments...</span>
      </div>
      <div className={style.comments_block}>
        {renderComments()}
        <div className={style.add_block}>
          <input
            className={style.add_comment}
            type="text"
            onChange={event => setComment(event.target.value)}
          />
          <button className={style.add_btn} type={'submit'} onClick={sendComment}>
            Add comment
          </button>
        </div>
      </div>
      <BottomNavigation />
    </section>
  ) : (
    <Spinner color="white" type="grow" className={styles.spinner}>
      Loading...
    </Spinner>
  );
};
