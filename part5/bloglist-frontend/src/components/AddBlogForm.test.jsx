import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('AddBlogForm component', () => {
  let container
  const createMockFunction = vi.fn()

  beforeEach(() => {
    container = render(
      <AddBlogForm createBlog={createMockFunction} />
    ).container
  })

  test('calls the handler with the right contents when a new blog is created', async () => {
    const titleInput = container.querySelector('#blogTitle')
    const authorInput = container.querySelector('#blogAuthor')
    const urlInput = container.querySelector('#blogUrl')

    const saveBlogButton = screen.getByText('Save blog')
    const user = userEvent.setup()

    await user.type(titleInput, 'React patterns')
    await user.type(authorInput, 'Michael Chan')
    await user.type(urlInput, 'https://reactpatterns.com/')

    await user.click(saveBlogButton)

    expect(createMockFunction.mock.calls).toHaveLength(1)
    expect(createMockFunction.mock.calls[0][0]).toStrictEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/'
    })
  })
})