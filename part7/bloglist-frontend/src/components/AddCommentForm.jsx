import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const CommentBlogForm = ({ blogId }) => {
  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()

  const commentBlogMutation = useMutation({
    mutationFn: blogService.commentBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      console.log('New blog comment added')
    },
    onError: (error) => {
      console.log('Error when adding new comment to blog', error)
    }
  })

  const handleCommentBlog = event => {
    event.preventDefault()
    commentBlogMutation.mutate({ blogId, comment })
    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleCommentBlog}>
        <div>
          <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          <button type="submit">Add comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentBlogForm