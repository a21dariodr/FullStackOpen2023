import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let container

  beforeEach(() => {
    const deleteMockFunction = vi.fn()
    const updateMockFunction = vi.fn()
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    }

    container = render(
      <Blog blog={blog} updateBlog={updateMockFunction} deleteBlog={deleteMockFunction} />
    ).container
  })

  test('renders only the blog title and author by default', () => {
    const authorInfo = container.querySelector('#blogAuthor')
    const titleInfo = container.querySelector('#blogTitle')
    const urlInfo = container.querySelector('#blogUrl')
    const likesInfo = container.querySelector('#blogLikes')

    screen.debug(container)

    expect(authorInfo).toHaveTextContent('Michael Chan')
    expect(titleInfo).toHaveTextContent('React patterns')
    expect(urlInfo).toBeNull()
    expect(likesInfo).toBeNull()
  })
})