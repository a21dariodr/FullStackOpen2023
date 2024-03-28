import { useState } from 'react'

const AddBlogForm = ({ createBlog, togglableRef }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    createBlog({
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
          <input type='text' value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} name='newBlogTitle'/>
        </div>
        <div>
          <span>Author </span>
          <input type='text' value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} name='newBlogAuthor'/>
        </div>
        <div>
          <span>URL </span>
          <input type='text' value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} name='newBlogUrl'/>
        </div>
        <br/>
        <div>
          <button type='submit'>Save note</button>&nbsp;
          <button type='button' onClick={() => togglableRef.current.toggleVisibility()}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddBlogForm