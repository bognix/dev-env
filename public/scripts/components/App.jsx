import React, { Component } from 'react';
import GlobalNotification from './shared/GlobalNotification.jsx';


class App extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { globalNotifications } = this.props;

        if (!loaded) return null;

        return (
            <div>
                {globalNotifications.map(
                    notification => <GlobalNotification
                        key={notification.id}
                        type={notification.type}
                        message={notification.message}
                    />
                )}
            </div>
        );
    }
}


export default App;
