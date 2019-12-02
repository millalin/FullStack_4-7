import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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





    test('renders content', () => {
        component = render(
            <Blog blog={blog} un='Kalle' />


        )

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
        component = render(
            <Blog blog={blog} un='Kalle' />


        )
        const press = component.getByText('Test title')
        fireEvent.click(press)

        expect(component.container).toHaveTextContent('Test title')
        expect(component.container).toHaveTextContent('url')
        expect(component.container).toHaveTextContent(
            '2'
        )
    })




}) 