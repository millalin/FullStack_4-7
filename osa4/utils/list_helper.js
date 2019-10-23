const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}


const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {

    const reducer = (max, blog) => {
        if (blog.likes > max) {
            max = blog.likes
        }
        return max
    }
    const blogWithMostLikes = blogs.reduce(reducer, 0)
    return blogs.length === 0
        ? []
        : blogs.filter(blog => blog.likes === blogWithMostLikes)
}

const mostBlogs = blogs => {

    const authors = blogs.map(blog => blog.author)
    const author = lodash.countBy(authors) //nyt kirjoittajat ja määrät
    
    let max = 0
    for (i in author) {
        if (author[i] > max) {
            max = author[i]
            maxAuthor = i
        }
    }

    return blogs.length === 0
        ? []
        : { author: maxAuthor, blogs: max }
}

const mostLikes = blogs => {
    const authorsAndLikes = blogs.reduce((x, { author, likes }) => {
        x[author] = x[author] || 0
        x[author] += likes
        return x
    }, {})

    console.log('tykk', authorsAndLikes)

    const auth =
        Object.keys(authorsAndLikes).sort((a, b) =>
            authorsAndLikes[b] - authorsAndLikes[a])[0]

    return blogs.length === 0
        ? []
        : { author: auth, likes: authorsAndLikes[auth] }

}

  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

