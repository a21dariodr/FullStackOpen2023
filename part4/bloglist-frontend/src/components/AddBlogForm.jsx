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
          <input data-testid='newBlogTitle' type='text' value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} name='newBlogTitle' id='blogTitle'/>
        </div>
        <div>
          <span>Author </span>
          <input data-testid='newBlogAuthor' type='text' value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} name='newBlogAuthor' id='blogAuthor'/>
        </div>
        <div>
          <span>URL </span>
          <input data-testid='newBlogUrl' type='text' value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} name='newBlogUrl' id='blogUrl'/>
        </div>
        <br/>
        <div>
          <button type='submit'>Save blog</button>&nbsp;
          <button type='button' onClick={() => togglableRef.current.toggleVisibility()}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddBlogForm