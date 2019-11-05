import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'



describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        const loginbutton = await waitForElement(
            () => component.getByText('login')
        )
        expect(loginbutton).toBeDefined()

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(0)

    })

    test('if user is logged in, blogs are rendered', async () => {


            const user = {
                username: 'Ḱalle',
                token: '123451234',
                name: 'Kalle Kehveli'
            }

            localStorage.setItem('loggedUser', JSON.stringify(user))

            const component = render(
                <App />
            )
            component.rerender(<App />)


           // jos lista on näkyvissä
            const list = component.container.querySelectorAll('.list')
            expect(list.length).toBe(1)


    })
})

