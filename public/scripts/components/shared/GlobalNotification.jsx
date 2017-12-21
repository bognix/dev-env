import React from 'react';

const GlobalNotification = ({type, message, onDismiss}) => {
    return (
        <div className={`notification is-${type}`}>
            {message}
        </div>
    );
};

export default GlobalNotification;
