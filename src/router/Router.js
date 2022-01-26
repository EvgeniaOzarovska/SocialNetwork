import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from 'pages/Auth/Login';
import { RegisterPage } from 'pages/Auth/Register';
import { AccountPage } from 'pages/Private/Account';
import { EditProfilePage } from 'pages/Private/EditProfile';
import { Followers } from 'pages/Private/Followers';
import { Post } from 'pages/Private/Post';
import { Posts } from 'pages/Private/Posts';
import { Search } from 'pages/Private/Search';
import { CreatePost } from 'pages/Private/CreatePost';
import { PageNotFound } from 'pages/System/PageNotFound';
import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from './routes';

export const Router = () => (
  <Switch>
    {/** Auth pages */}
    <AuthRoute exact path={ROUTES.Auth.Login} component={LoginPage} />
    <AuthRoute exact path={ROUTES.Auth.Register} component={RegisterPage} />

    {/** Private pages */}
    <Redirect exact from="/" to={ROUTES.Private.Posts} />
    <PrivateRoute exact path={ROUTES.Private.Account} component={AccountPage} />
    <PrivateRoute exact path={ROUTES.Private.EditProfile} component={EditProfilePage} />
    <PrivateRoute exact path={ROUTES.Private.Post} component={Post} />
    <PrivateRoute exact path={ROUTES.Private.Posts} component={Posts} />
    <PrivateRoute exact path={ROUTES.Private.CreatePost} component={CreatePost} />
    <PrivateRoute exact path={ROUTES.Private.Followers} component={Followers} />
    <PrivateRoute exact path={ROUTES.Private.SearchPosts} component={Search} />

    {/** System pages */}
    <Route component={PageNotFound} />
  </Switch>
);
