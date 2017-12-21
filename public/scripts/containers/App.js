import App from '../components/App.jsx';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    const {ui} = state;

    return {
        globalNotifications: ui.globalNotifications,
    };
};

export default connect(mapStateToProps)(App);
