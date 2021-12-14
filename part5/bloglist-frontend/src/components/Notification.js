const Notifcation = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    return (
        <div>
            {message}
        </div>
    )
}

export default Notifcation