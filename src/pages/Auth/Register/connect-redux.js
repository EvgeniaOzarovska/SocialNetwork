import { connect } from 'react-redux';
import { selectRequestStatus } from 'store/reducers/api-requests/selectors';
import { UserActionTypes } from 'store/reducers/user/action-types';
import { registerUser } from 'store/reducers/user/actions';
import { RegisterPage } from './RegisterPage';

const mapStateToProps = state => ({
  registerInProgress: selectRequestStatus(state, UserActionTypes.REGISTER_USER),
});

const mapActionsToProps = { registerUser };

export const RegisterPageWithRedux = connect(mapStateToProps, mapActionsToProps)(RegisterPage);
