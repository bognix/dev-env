import React, {Component} from 'react';

const withRouteOnEnter = callback => BaseComponent => {
    const routeOnEnterCallback = (props) => {
        if (callback && typeof callback === 'function') {
            callback(props);
        }
    };

    class routeOnEnterComponent extends Component {
        componentWillMount() {
            routeOnEnterCallback(this.props);
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.location.key !== this.props.location.key) {
                routeOnEnterCallback(nextProps);
            }
        }

        render() {
            return <BaseComponent {...this.props} />;
        }
    }

    return routeOnEnterComponent;
};

export default withRouteOnEnter;
