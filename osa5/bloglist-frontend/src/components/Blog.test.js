import React from 'react'
import { render } from '@testing-library/react'
import Blog from './Blog'




describe('<Blog />', () => {
    let component

    
        const blog = {
            title: 'Test title',
            author: 'auth',
            url: 'url',
            likes: 2,
            user: {
                username: "Kalle",
                name: "Kalle",
                id: 12341234
            },
            id: 11223344
        }

        component = render(
            <Blog blog={blog} un='Kalle'/>
               
            
        )
    



    test('renders content', () => {


        expect(component.container).toHaveTextContent(
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

    })

    test('renders content when pressed', () => {


        const show = component.container.querySelector('.showall')
        
        expect(show).toHaveTextContent('Test title')
        expect(show).toHaveTextContent('url') 


    })


 

}) 