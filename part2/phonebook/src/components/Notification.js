const Notifcation = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    if (messageType) {
        return (
            <div className="positiveMessage">
                {message}
            </div>
        )
    } else {
        return (
            <div className="negativeMessage">
                {message}
            </div>
        )
    }
}

export default Notifcation