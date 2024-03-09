const dummy = blogs => 1

const totalLikes = blogs => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

module.exports = { dummy, totalLikes }