import React from 'react';

const Restricted = ({allowed, userRole, children}) => {
    if (allowed.indexOf(userRole) > -1) {
        return (
            <div>
                {children}
            </div>
        );
    }

    return null;
};

export default Restricted;
