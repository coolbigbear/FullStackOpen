import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, username }) => {

    const [fullyShown, setFullyShown] = useState(false)

    const toggleFullyShown = () => {
        setFullyShown(!fullyShown)
    }

    const packageObjectLikeBlog = () => {
        likeBlog({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        })
    }

    const packageObjectDeleteBlog = () => {
        if (window.confirm(`Do you want to delete ${blog.title}?`)) {
            deleteBlog({
                id: blog.id
            })
        }
    }

    if (fullyShown) {
        return (
            <div className="blog">
                <p>{blog.title}</p>
                <p>{blog.author}</p>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button onClick={packageObjectLikeBlog}>like</button></p>
                <p>{blog.user.username}</p>
                { blog.user.username === username &&
          <button onClick={packageObjectDeleteBlog}>Delete</button>
                }
                <button onClick={toggleFullyShown}>Show less</button>
            </div>
        )
    }

    return (
        <div className="blog">
            <div>
                {blog.title} {blog.author}
                <button id='showMoreButton' onClick={toggleFullyShown}>Show more</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

export default Blog