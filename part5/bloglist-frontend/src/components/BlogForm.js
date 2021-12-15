import React, { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }


  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
                    Title: <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
                    Author: <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
                    URL: <input
            value={newURL}
            onChange={({ target }) => setNewURL(target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


export default BlogForm