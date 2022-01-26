import { Button } from 'components/Button';
import { BottomNavigation } from 'components/BottomNavigation';
import { Image } from 'components/Image';
import { Page } from 'components/Page';
import style from './Followers.module.scss';

export const Followers = () => {
  return (
    <Page className={style.container}>
      <header className={style.header}>
        <h2>Hipstagramm</h2>
      </header>

      <div className={style.follow_block}>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>

        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>

        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
        <div className={style.blocks}>
          <div>
            <Image className={style.pic} name="avatar_placeholder.png" />
            <span>NickName</span>
          </div>
          <Button colorSchema={'mini'}>Follow</Button>
        </div>
      </div>
      <BottomNavigation />
    </Page>
  );
};
