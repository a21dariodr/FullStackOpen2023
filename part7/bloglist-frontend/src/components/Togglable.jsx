import { useState, useImperativeHandle, forwardRef } from 'react'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  const toggleVisibility = () => setVisible(!visible)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
    <Box p={1} paddingBottom={2}>
      <div style={showWhenVisible}>{children}</div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={() => toggleVisibility()}>{buttonLabel}</Button>
      </div>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
