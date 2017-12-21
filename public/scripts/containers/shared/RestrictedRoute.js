import RestrictedRoute from '../../components/shared/RestrictedRoute.jsx';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        userRole: state.user.role
    };
};

export default connect(mapStateToProps)(RestrictedRoute);
