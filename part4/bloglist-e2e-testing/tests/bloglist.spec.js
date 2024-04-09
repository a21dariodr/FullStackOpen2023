const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./bloglist-helper') 

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Maria Peres',
        username: 'mperes2',
        password: 'testpass'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByTestId('submitButton')).toBeVisible()
  })

  describe('Login', () => {
    test('is posible with correct username and password', async ({ page }) => {
      await login(page, 'mperes2', 'testpass')
      await expect(page.getByTestId('submitButton')).not.toBeVisible()
      await expect(page.getByText('Maria Peres is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'mperes2', 'wrongpass')
      await expect(page.getByTestId('submitButton')).toBeVisible()

      const notification = page.locator('.notification')
      await expect(notification).toContainText('Invalid username or password')
      await expect(notification).toHaveCSS('border-radius', '6px')
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('a logged in user', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mperes2', 'testpass')
    })

    test('can create a new blog', async ({ page }) => {
      await createBlog(page, 'Test blog 1', 'Anonymous', 'http://fakeurl.test1.ru')
      await expect(page.locator('.blogTitle')).toContainText('Test blog 1')
    })
  })
})