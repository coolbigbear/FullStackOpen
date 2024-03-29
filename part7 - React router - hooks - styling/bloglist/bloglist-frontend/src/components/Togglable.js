import React, { useState, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible} className='m-1'>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible} >
                {props.children}
                <Button className='m-1' onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable