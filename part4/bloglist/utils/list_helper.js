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

module.exports = { dummy, totalLikes, favoriteBlog }