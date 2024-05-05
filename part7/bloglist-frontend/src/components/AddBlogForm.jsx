import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

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
      dispatch(setNotification(`New blog "${newBlog.title}" by ${newBlog.author} added`, 6000))
    },
    onError: () => {
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
        <h2>Create blog</h2>
        <div>
          <span>Title </span>
          <input data-testid="newBlogTitle" type="text" value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} name="newBlogTitle" id="blogTitle" />
        </div>
        <div>
          <span>Author </span>
          <input data-testid="newBlogAuthor" type="text" value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} name="newBlogAuthor" id="blogAuthor" />
        </div>
        <div>
          <span>URL </span>
          <input data-testid="newBlogUrl" type="text" value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} name="newBlogUrl" id="blogUrl" />
        </div>
        <br />
        <div>
          <button type="submit">Save blog</button>&nbsp;
          <button type="button" onClick={() => togglableRef.current.toggleVisibility()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBlogForm
