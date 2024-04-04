const login = async (page, username, pass) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(pass)
  await page.getByTestId('submitButton').click()
}

const createBlog = async (page, newBlogTitle, newBlogAuthor, newBlogUrl) => {
  await page.getByRole('button', { name: 'Add blog' }).click()
  await page.getByTestId('newBlogTitle').fill(newBlogTitle)
  await page.getByTestId('newBlogAuthor').fill(newBlogAuthor)
  await page.getByTestId('newBlogUrl').fill(newBlogUrl)
  await page.getByRole('button', { name: 'Save blog' }).click()
  await page.getByText(newBlogTitle).waitFor()
}

export { login, createBlog }