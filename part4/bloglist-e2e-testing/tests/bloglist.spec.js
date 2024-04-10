const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./bloglist-helper') 
const { log } = require('console')

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

  describe('A logged in user', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mperes2', 'testpass')
    })

    test('can create a new blog', async ({ page }) => {
      await createBlog(page, 'Test blog 1', 'Anonymous', 'http://fakeurl.test1.ru')
      await expect(page.locator('.blogTitle').getByText('Test blog 1')).toBeVisible()
    })

    describe('When many notes exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test blog 1', 'Anonymous', 'http://fakeurl.test1.ru')
        await createBlog(page, 'Test blog 2', 'OtherAnonymous', 'http://fakeurl2.test1.ru')
        await createBlog(page, 'Test blog 3', 'AnotherAnonymous', 'http://fakeurl3.test1.ru')
      })

      test('can like a blog', async ({ page }) => {
        const secondBlogDiv = page.locator('#blogs').getByText('Test blog 2').locator('..')
        await secondBlogDiv.getByRole('button', { name: 'Show details' }).click()
        const secondBlogLikeButton = secondBlogDiv.getByRole('button', { name: 'Like' })
        await secondBlogLikeButton.click()
        await secondBlogLikeButton.click()
        await expect(secondBlogDiv.locator('.blogLikes')).toContainText(/2$/)
      })

      test('can delete a blog that has created', async ({ page }) => {
        const thirdBlogDiv = page.locator('#blogs').getByText('Test blog 3').locator('..')
        await thirdBlogDiv.getByRole('button', { name: 'Show details' }).click()
        page.on('dialog', async dialog => {
          expect(dialog.message()).toEqual('Blog "Test blog 3" by AnotherAnonymous is about to be deleted!')
          await dialog.accept()
        })
        await thirdBlogDiv.getByRole('button', { name: 'Remove' }).click()
        await expect(page.locator('#blogs').getByText('Test blog 3')).not.toBeVisible()
      })

      test('the blogs are ordered by number of likes', async ({ page }) => {
        const secondBlogDiv = page.locator('#blogs').getByText('Test blog 2').locator('..')
        await secondBlogDiv.getByRole('button', { name: 'Show details' }).click()
        const secondBlogLikeButton = secondBlogDiv.getByRole('button', { name: 'Like' })
        await secondBlogLikeButton.click()
        await secondBlogLikeButton.click()
        await secondBlogLikeButton.click()

        const thirdBlogDiv = page.locator('#blogs').getByText('Test blog 3').locator('..')
        await thirdBlogDiv.getByRole('button', { name: 'Show details' }).click()
        const thirdBlogLikeButton = thirdBlogDiv.getByRole('button', { name: 'Like' })
        await thirdBlogLikeButton.click()
        await thirdBlogLikeButton.click()

        const blogsDivs = await page.locator('.blog').all()
        await expect(blogsDivs[0].locator('.blogTitle')).toContainText('Test blog 2')
        await expect(blogsDivs[1].locator('.blogTitle')).toContainText('Test blog 3')
        await expect(blogsDivs[2].locator('.blogTitle')).toContainText('Test blog 1')
      })

      describe('And there are more than one user', () => {
        beforeEach(async ({ page, request }) => {
          await request.post('/api/users', {
            data: {
              name: 'Pedro Pombo',
              username: 'pepo4',
              password: 'testpass2'
            }
          })
          await page.getByRole('button', { name: 'Logout' }).click()
        })

        test('only the user that creates a note can delete it', async ({ page }) => {
          await login(page, 'pepo4', 'testpass2')
          const thirdBlogDiv = page.locator('#blogs').getByText('Test blog 3').locator('..')
          await thirdBlogDiv.getByRole('button', { name: 'Show details' }).click()
          await expect(thirdBlogDiv.getByRole('button', { name: 'Remove' })).not.toBeVisible()
        })
      })
    })
  })
})