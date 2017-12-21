import {
    UI_ADD_GLOBAL_NOTIFICATION,
    UI_REMOVE_GLOBAL_NOTIFICATION
} from '../const';

const initialState = {
    globalNotifications: [],
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case UI_ADD_GLOBAL_NOTIFICATION:
        return {
            ...state,
            globalNotifications: [
                ...state.globalNotifications,
                {
                    message: payload.message,
                    type: payload.type,
                    id: payload.id
                }
            ]
        };
    case UI_REMOVE_GLOBAL_NOTIFICATION:
        return {
            ...state,
            globalNotifications: state.globalNotifications.filter(notification => notification.id !== payload)
        };
    case '@@router/LOCATION_CHANGE':
        return {
            ...state,
            globalNotifications: initialState.globalNotifications
        };
    default:
        return state;
    }
};
