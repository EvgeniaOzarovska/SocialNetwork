import { connect } from 'react-redux';
import { selectMyUserInfo } from 'store/reducers/user/selectors';
import { PrivateRoute } from './PrivateRoute';

const mapStateToProps = state => ({
  myUserInfo: selectMyUserInfo(state),
});

export const PrivateRouteWithRedux = connect(mapStateToProps)(PrivateRoute);
