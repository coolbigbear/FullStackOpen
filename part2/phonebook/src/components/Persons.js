import React from "react";
import Contact from "./Contact";

const Persons = ({personsToShow}) => {

    return (
        <ul>
            {personsToShow.map(contact =>
                <Contact key={contact.name} contact={contact} />
            )}
        </ul>
    )

}

export default Persons