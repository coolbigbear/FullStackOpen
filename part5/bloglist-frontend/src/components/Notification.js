import React from 'react'

const Notifcation = ({ message }) => {
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