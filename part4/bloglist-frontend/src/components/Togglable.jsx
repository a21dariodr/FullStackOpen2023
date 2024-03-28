import { useState, useImperativeHandle, forwardRef } from "react"

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
    const [ visible, setVisible ] = useState(false)

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    const toggleVisibility = () => setVisible(!visible)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    return (
        <div>
            <div style={showWhenVisible}>
                {children}
            </div>
            <div style={hideWhenVisible}>
                <button onClick={() => toggleVisibility()}>{buttonLabel}</button>
            </div>
        </div>
    )
})

export default Togglable