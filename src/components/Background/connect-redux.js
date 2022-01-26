import { connect } from 'react-redux';
import { fetchMyUserInfo } from 'store/reducers/user/actions';
import { selectMyUserInfo } from 'store/reducers/user/selectors';
import { Background } from './Background';

const mapStateToProps = state => ({
  myUserInfo: selectMyUserInfo(state),
});

const mapActionsToProps = {
  fetchMyUserInfo: fetchMyUserInfo,
};

export const BackgroundWithRedux = connect(mapStateToProps, mapActionsToProps)(Background);
