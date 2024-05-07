import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Box, Button, TextField, Typography } from '@mui/material'

const AddBlogForm = ({ togglableRef }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      togglableRef.current.toggleVisibility()
      console.log('New blog added')
      dispatch(setNotification(`New blog "${newBlog.title}" by ${newBlog.author} added`, 6000))
    },
    onError: () => {
      console.log('Error when adding new blog')
      dispatch(setNotification('Error when adding new blog', 6000))
    }
  })

  const handleCreateBlog = event => {
    event.preventDefault()

    newBlogMutation.mutate({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <Typography variant="h5" p={2}>Create blog</Typography>
        <Box p={1}>
          <TextField label="Title" InputLabelProps={{ shrink: true }} size="small" data-testid="newBlogTitle" type="text" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} name="newBlogTitle" id="blogTitle" />
        </Box>
        <Box p={1}>
          <TextField label="Author" InputLabelProps={{ shrink: true }} size="small" data-testid="newBlogAuthor" type="text" value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} name="newBlogAuthor" id="blogAuthor" />
        </Box>
        <Box p={1}>
          <TextField label="URL" InputLabelProps={{ shrink: true }} size="small" data-testid="newBlogUrl" type="text" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} name="newBlogUrl" id="blogUrl" />
        </Box>
        <div>
          <Button variant="contained" color="primary" type="submit">Save blog</Button>&nbsp;
          <Button variant="contained" color="secondary" type="button" onClick={() => togglableRef.current.toggleVisibility()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddBlogForm
