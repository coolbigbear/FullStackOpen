import React from "react";

const Filter = ({newFilter, handleFilterChange}) => {

    return (
        <div>
            Filter: <input
                value={newFilter}
                onChange={handleFilterChange} />
        </div>
    )

}

export default Filter