const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) return undefined
    
    const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)
    return blogsSortedByLikes[0]
}

const mostBlogs = blogs => {
    if (blogs.length === 0) return undefined

    const sortedAuthorsByBlogsCount = _.chain(blogs)
        .countBy('author')
        .map((value, key) => ({ author: key, blogs: value }))
        .orderBy('blogs', 'desc')
        .value()
    
    return sortedAuthorsByBlogsCount[0]
}

const mostLikes = blogs => {
    if (blogs.length === 0) return undefined

    const sortedAuthorsByLikesCount = _.chain(blogs)
        .reduce((authorsByLikesCount, value) => {
            authorsByLikesCount[value.author] = authorsByLikesCount[value.author] 
                ? authorsByLikesCount[value.author] + value.likes
                : value.likes
            return authorsByLikesCount
        }, {})
        .map((value, key) => ({ author: key, likes: value }))
        .orderBy('likes', 'desc')
        .value()

    return sortedAuthorsByLikesCount[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}