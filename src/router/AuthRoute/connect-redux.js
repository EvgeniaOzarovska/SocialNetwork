import { connect } from 'react-redux';
import { selectMyUserInfo } from 'store/reducers/user/selectors';
import { AuthRoute } from './AuthRoute';

const mapStateToProps = state => ({
  myUserInfo: selectMyUserInfo(state),
});

export const AuthRouteWithRedux = connect(mapStateToProps)(AuthRoute);
