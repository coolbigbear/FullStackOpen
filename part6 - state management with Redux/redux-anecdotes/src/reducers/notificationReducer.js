let timeoutID = null;

const notificationReducer = (state = null, action) => {
    console.log(action)
    console.log("Action: ",action)
    switch (action.type) {
        case ('SET_NOTIFICATION'):
            return action.notification
        default:
            return state
    }
}

export const setNotification = (notification, timeout) => {
    console.log("received: ", notification);
    return async dispatch => {
        clearTimeout(timeoutID)
        dispatch({
            type: 'SET_NOTIFICATION',
            notification,
        })
        timeoutID = setTimeout(() => dispatch({
            type: 'SET_NOTIFICATION',
            notification: null,
        }), timeout * 1000)
    }
}

export default notificationReducer