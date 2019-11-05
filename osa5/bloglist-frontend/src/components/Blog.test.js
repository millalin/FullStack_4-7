import React from 'react'
//import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'Test title',
    author: 'auth',
    url: 'url',
    likes: 2,
    user: {
        username: "Kalle",
        name: "Kalle"
    }
}


describe('<Blog />', () => {
    let component

    beforeEach(() => {
        const blog = {
            title: 'Test title',
            author: 'auth',
            url: 'url',
            likes: 2,
            user: {
                username: "Kalle",
                name: "Kalle"
            }
        }

        component = render(
            <Blog blog={blog} un='Kalle'/>
               
            
        )
    })



    test('renders content', () => {


       /* expect(component.container).toHaveTextContent(
            'Test title'
        )

        expect(component.container).toHaveTextContent(
            'auth'
        )

        expect(component.container).not.toHaveTextContent(
            'url'
        )

        expect(component.container).not.toHaveTextContent(
            '2'
        )
*/
    })

    test('renders content when pressed', () => {

        /*const component = render (
            <Blog blog={blog} username="Kalle"/>
        )

        const show = component.container.querySelector('.showall')
        console.log('mitä', show)
        expect(show).toHaveTextContent('Test title')
        expect(show).toHaveTextContent('url') */


    })


 

}) 