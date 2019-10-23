const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const empty = []

    const listWithMany = [
        {
            _id: '1',
            title: 'One',
            author: 'O.O',
            url: 'url1',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'Two',
            author: 'O.O',
            url: 'url2',
            likes: 3,
            __v: 0
        },
        {
            _id: '3',
            title: 'Three',
            author: 'O.O',
            url: 'url3',
            likes: 4,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(empty)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })


    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMany)
        expect(result).toBe(12)
    })
})



describe('favourite', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const empty = []

    const listWithMany = [
        {
            _id: '1',
            title: 'One',
            author: 'O.O',
            url: 'url1',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'Two',
            author: 'O.O',
            url: 'url2',
            likes: 6,
            __v: 0
        },
        {
            _id: '3',
            title: 'Three',
            author: 'O.O',
            url: 'url3',
            likes: 4,
            __v: 0
        }
    ]

    test('of empty list is empty', () => {
        const result = listHelper.favoriteBlog(empty)
        expect(result).toEqual(empty)
    })

    test('when list has only one blog that is favourite', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog)
    })


    test('list with many blogs finds right', () => {
        const result = listHelper.favoriteBlog(listWithMany)
        const blogMost = [{
            _id: '2',
            title: 'Two',
            author: 'O.O',
            url: 'url2',
            likes: 6,
            __v: 0
        }]
        expect(result).toEqual(blogMost)
    })
})


describe('author with most blogs', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const empty = []

    const listWithMany = [
        {
            _id: '1',
            title: 'One',
            author: 'Peter',
            url: 'url1',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'Two',
            author: 'O.O',
            url: 'url2',
            likes: 6,
            __v: 0
        },
        {
            _id: '3',
            title: 'Three',
            author: 'Peter',
            url: 'url3',
            likes: 4,
            __v: 0
        }
    ]


    test('when list has only one blog count 1', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        author = { author: 'Edsger W. Dijkstra', blogs: 1 }
        expect(result).toEqual(author)
    })


    test('list with many blogs finds right author ang glog count', () => {
        const result = listHelper.mostBlogs(listWithMany)
        const author = { author: "Peter", blogs: 2 }
        expect(result).toEqual(author)
    })

    test('of empty list is empty', () => {
        const result = listHelper.mostBlogs(empty)
        expect(result).toEqual(empty)
    })
})

describe('author with most likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const empty = []

    const listWithMany = [
        {
            _id: '1',
            title: 'One',
            author: 'Peter',
            url: 'url1',
            likes: 5,
            __v: 0
        },
        {
            _id: '2',
            title: 'Two',
            author: 'O.O',
            url: 'url2',
            likes: 6,
            __v: 0
        },
        {
            _id: '3',
            title: 'Three',
            author: 'Peter',
            url: 'url3',
            likes: 4,
            __v: 0
        }
    ]


    test('when list has only one blog author is right', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        author = { author: 'Edsger W. Dijkstra', likes: 5 }
        expect(result).toEqual(author)
    })


    test('list with many blogs finds right author and likes', () => {
        const result = listHelper.mostLikes(listWithMany)
        const author = { author: "Peter", likes: 9 }
        expect(result).toEqual(author)
    })

    test('of empty list is empty', () => {
        const result = listHelper.mostLikes(empty)
        expect(result).toEqual(empty)
    })
})