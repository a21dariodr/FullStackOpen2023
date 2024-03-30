import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  let container
  const deleteMockFunction = vi.fn()
  const updateMockFunction = vi.fn()

  beforeAll(() => {
    localStorage.setItem('loggedUser', JSON.stringify({
      name: 'Pepe',
      username: 'pepep'
    }))
  })

  beforeEach(() => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: {
        name: 'Pepe',
        username: 'pepep'
      }
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

  test('renders the blog url and likes after show details button is clicked', async () => {
    const user = userEvent.setup()
    const showDetailsButton = screen.getByText('Show details')

    await user.click(showDetailsButton)

    const urlInfo = container.querySelector('#blogUrl')
    const likesInfo = container.querySelector('#blogLikes')

    expect(urlInfo).toHaveTextContent('URL: https://reactpatterns.com/')
    expect(likesInfo).toHaveTextContent('Likes: 7')
  })

  test('calls twice the like button handler if the button is clicked twice', async () => {
    const user = userEvent.setup()
    const showDetailsButton = screen.getByText('Show details')

    await user.click(showDetailsButton)

    const likeButton = screen.getByText('Like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateMockFunction.mock.calls).toHaveLength(2)
  })

  afterAll(() => {
    localStorage.removeItem('loggedUser')
  })
})