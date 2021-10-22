import React from "react";
import Contact from "./Contact";

const Persons = ({personsToShow, handleDelete}) => {

    return (
        <ul>
            {personsToShow.map(contact =>
                <Contact key={contact.id} contact={contact} handleDelete={handleDelete}/>
            )}
        </ul>
    )

}

export default Persons