import React, { useState } from 'react'
const Blog = ({ blog, likeBlog, deleteBlog, username }) => {

  const [fullyShown, setFullyShown] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
      <div style={blogStyle}>
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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleFullyShown}>Show more</button>
      </div>
    </div>
  )
}

export default Blog