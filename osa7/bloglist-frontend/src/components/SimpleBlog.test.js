import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup, getByText } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

//testi joka varmistaa että komponentti renderöi titlen, authorin ja liket

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'auth',
    likes: 2
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Test title'
  )

  expect(component.container).toHaveTextContent(
    'auth'
  )

  expect(component.container).toHaveTextContent(
    '2'
  )


})


test('clicking button calls event handler two times', async () => {
    const blog = {
        title: 'Test title',
        author: 'auth',
        likes: 2
      }

    const mockHandler = jest.fn()

    const {getByText} = render(
        <SimpleBlog blog = {blog} onClick={mockHandler} />
    )
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })