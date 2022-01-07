import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const blogFormRef = useRef()


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const logOut = async () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        window.location.reload(false)
        setErrorMessage('Successfully logged out')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setErrorMessage('Successfully logged in')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const createBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                blogService.getAll()
                    .then(blogs => {
                        setBlogs(blogs)
                        setErrorMessage(`Create ${returnedBlog.title}`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            })
    }

    const likeBlog = (blogObject) => {
        blogService
            .update(blogObject)
            .then(returnedBlog => {
                blogService.getAll()
                    .then(blogs => {
                        setBlogs(blogs)
                        setErrorMessage(`liked ${returnedBlog.title}`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            })
    }

    const deleteBlog = (blogObject) => {
        blogService
            .del(blogObject)
            .then(returnedBlog => {
                blogService.getAll()
                    .then(blogs => {
                        setBlogs(blogs)
                        setErrorMessage(`Deleted ${returnedBlog.title}`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            })
    }



    if (user === null) {
        return (
            <div>
                <Notification message={errorMessage} />
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
            username
                        <input
                            id="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
            password
                        <input
                            id='password'
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id='loginButton' type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <Notification message={errorMessage}/>
            <p>{user.name} is logged in</p>
            <button onClick={logOut}>
        Log out
            </button>
            <h2>blogs</h2>
            <Togglable buttonLabel='create new' ref={blogFormRef}>
                <BlogForm
                    createBlog={createBlog}
                />
            </Togglable>
            {blogs
                .sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))
                .map(blog =>
                    <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} username={user.username}/>
                )}
        </div>
    )
}

export default App