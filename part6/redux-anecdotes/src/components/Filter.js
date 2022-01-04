import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        event.preventDefault()
        const content = event.target.value
        props.filterChange(content)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    filterChange,
}

export default connect(null, mapDispatchToProps)(Filter)