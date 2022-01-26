import styles from './CreatePost.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router';
import { Icon } from 'components/Icon';
import { Page } from 'components/Page';
import { useRef, useState } from 'react';
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';


export const CreatePost = props => {
  const imageFileInput = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [previewedPhoto, setPreviewedPhoto] = useState(null);
  const [text, setText] = useState('');

  const createPost = () => {
    if (photo === null) return;
    const images = [];
    images.push(photo);
    props.createNewPost(images, text);
  };

  return (
    <Page>
      <header className={styles.header}>
        <Link to={ROUTES.Private.Posts}>
          <Icon bordered name="arrow_back.svg" />
        </Link>
        <span>Create Post</span>
      </header>

      {photo === null ? (
        <img className={styles.imagePost} src={'/assets/images/image_placeholder.png'} />
      ) : (
        <img className={styles.imagePost} src={previewedPhoto} />
      )}

      <Button
        type="submit"
        colorSchema="solid"
        onClick={event => {
          event.preventDefault();
          imageFileInput.current?.click();
        }}
      >
        Upload Photo
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={imageFileInput}
        onChange={event => {
          event.preventDefault();
          setPhoto(event.target.files[0]);
          const objectUrl = URL.createObjectURL(event.target.files[0]);
          setPreviewedPhoto(objectUrl);
        }}
        className={styles.imageInput}
      />
      <textarea className={styles.textarea} onChange={event => setText(event.target.value)} />
      <Button
        type="submit"
        colorSchema="solid"
        onClick={event => {
          event.preventDefault();
          createPost();
        }}
      >
        {props.createNewPostInProgress ? <Spinner size="small" /> : 'Create Post'}
      </Button>
    </Page>
  );
};
