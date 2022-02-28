import React from "react";

const Contact = ({contact, handleDelete}) => {


    return (
        <div>
            {contact.name} - {contact.number}
            <button key={contact.id} onClick={() => handleDelete(contact)}>Delete</button>
        </div>
    )

}

export default Contact