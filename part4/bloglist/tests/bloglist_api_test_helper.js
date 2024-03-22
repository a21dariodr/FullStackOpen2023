const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const malformedBlogs = [
    {
        title: "Test without likes count",
        author: "Dario",
        url: "http://test.com/",
    },
    {
        author: "Dario",
        url: "http://testWithoutTitle.com/",
        likes: 20
    },
    {
        title: "Test without url",
        author: "Dario",
        likes: 2,
    }
]

const initializeDb = async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogsObjects = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogsObjects.map(blogObject => blogObject.save()))
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
    const ephemeralBlog = new Blog(initialBlogs[0])
    await ephemeralBlog.save()
    await ephemeralBlog.deleteOne()

    return ephemeralBlog._id.toString()
}

module.exports = { initialBlogs, malformedBlogs, initializeDb, blogsInDb, nonExistingId }