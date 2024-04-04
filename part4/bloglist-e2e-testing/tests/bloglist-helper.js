const login = async (page, username, pass) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(pass)
  await page.getByTestId('submitButton').click()
}

export { login }