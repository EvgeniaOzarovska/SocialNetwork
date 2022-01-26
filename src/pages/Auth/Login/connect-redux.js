import { connect } from 'react-redux';
import { selectRequestError, selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { UserActionTypes } from 'store/reducers/user/action-types';
import { loginUser } from 'store/reducers/user/actions';
import { LoginPage } from './LoginPage';

const mapStateToProps = state => ({
  loginInProgress: selectRequestStatus(state, UserActionTypes.LOGIN_USER),
  loginError: selectRequestError(state, UserActionTypes.LOGIN_USER),
});

const mapActionsToProps = { loginUser };

export const LoginPageWithRedux = connect(mapStateToProps, mapActionsToProps)(LoginPage);
