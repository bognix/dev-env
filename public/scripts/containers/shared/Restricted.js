import {connect} from 'react-redux';
import Restricted from '../../components/shared/Restricted.jsx';

const mapStateToProps = (state, {children, ...ownProps}) => {
    return {
        userRole: state.user.role,
        ...ownProps
    };
};

export default connect(mapStateToProps)(Restricted);
